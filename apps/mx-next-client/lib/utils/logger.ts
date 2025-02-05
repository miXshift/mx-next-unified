import chalk from 'chalk';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';
type LogCategory =
  | 'component'
  | 'page'
  | 'action'
  | 'middleware'
  | 'api'
  | 'auth'
  | 'db'
  | 'hook';

interface LogOptions {
  level?: LogLevel;
  category: LogCategory;
  component?: string;
  hookDetails?: {
    type:
      | 'mount'
      | 'update'
      | 'unmount'
      | 'render'
      | 'effect'
      | 'callback'
      | 'memo'
      | 'ref';
    dependencies?: string[];
    renderCount?: number;
    prevValue?: unknown;
    nextValue?: unknown;
  };
}

class Logger {
  private static instance: Logger;
  private isDevelopment: boolean;
  private renderCounts: Map<string, number> = new Map();

  private categoryColors: Record<LogCategory, chalk.ChalkFunction> = {
    component: chalk.cyan,
    page: chalk.magenta,
    action: chalk.yellow,
    middleware: chalk.blue,
    api: chalk.green,
    auth: chalk.red,
    db: chalk.gray,
    hook: chalk.hex('#FF69B4'), // Hot pink for hooks
  };

  private levelColors: Record<LogLevel, chalk.ChalkFunction> = {
    info: chalk.blue,
    warn: chalk.yellow,
    error: chalk.red,
    debug: chalk.gray,
  };

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(message: string, options: LogOptions): string {
    const timestamp = new Date().toISOString();
    const category = this.categoryColors[options.category](
      options.category.toUpperCase()
    );
    const level = this.levelColors[options.level || 'info'](
      (options.level || 'info').toUpperCase()
    );
    const component = options.component
      ? chalk.white(`[${options.component}]`)
      : '';

    let hookInfo = '';
    if (options.hookDetails) {
      const { type, dependencies, renderCount, prevValue, nextValue } =
        options.hookDetails;
      hookInfo = chalk.gray(
        ` (${type}${renderCount ? ` #${renderCount}` : ''}${
          dependencies ? ` deps: [${dependencies.join(', ')}]` : ''
        }${
          prevValue !== undefined && nextValue !== undefined
            ? ` ${JSON.stringify(prevValue)} → ${JSON.stringify(nextValue)}`
            : ''
        })`
      );
    }

    return `${chalk.gray(timestamp)} ${category} ${level}${component}${hookInfo}: ${message}`;
  }

  private log(message: string, options: LogOptions): void {
    if (!this.isDevelopment) return;

    const formattedMessage = this.formatMessage(message, options);

    switch (options.level) {
      case 'error':
        console.error(formattedMessage);
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      case 'debug':
        console.debug(formattedMessage);
        break;
      default:
        console.log(formattedMessage);
    }
  }

  private getRenderCount(hookId: string): number {
    const count = (this.renderCounts.get(hookId) || 0) + 1;
    this.renderCounts.set(hookId, count);
    return count;
  }

  public hook(
    message: string,
    hookName: string,
    details: LogOptions['hookDetails'],
    level: LogLevel = 'debug'
  ): void {
    const hookId = `${hookName}-${details?.type}`;
    if (details?.type === 'render') {
      details.renderCount = this.getRenderCount(hookId);
    }

    this.log(message, {
      level,
      category: 'hook',
      component: hookName,
      hookDetails: details,
    });
  }

  public component(
    message: string,
    componentName: string,
    level: LogLevel = 'info'
  ): void {
    this.log(message, {
      level,
      category: 'component',
      component: componentName,
    });
  }

  public page(
    message: string,
    pageName: string,
    level: LogLevel = 'info'
  ): void {
    this.log(message, { level, category: 'page', component: pageName });
  }

  public action(
    message: string,
    actionName: string,
    level: LogLevel = 'info'
  ): void {
    this.log(message, { level, category: 'action', component: actionName });
  }

  public middleware(
    message: string,
    middlewareName: string,
    level: LogLevel = 'info'
  ): void {
    this.log(message, {
      level,
      category: 'middleware',
      component: middlewareName,
    });
  }

  public api(
    message: string,
    endpoint: string,
    level: LogLevel = 'info'
  ): void {
    this.log(message, { level, category: 'api', component: endpoint });
  }

  public auth(
    message: string,
    context: string,
    level: LogLevel = 'info'
  ): void {
    this.log(message, { level, category: 'auth', component: context });
  }

  public db(message: string, context: string, level: LogLevel = 'info'): void {
    this.log(message, { level, category: 'db', component: context });
  }
}

export const logger = Logger.getInstance();
