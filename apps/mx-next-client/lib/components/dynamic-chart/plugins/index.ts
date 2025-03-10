import { ChartSchema, ChartTypePlugin, ProcessedChartData } from '../types';
import { formatTooltip } from '../formatters/tooltip';
import * as processors from '../processors';

// Plugin registry
const chartPlugins: Record<string, ChartTypePlugin> = {};

/**
 * Register a new chart type plugin
 * @param plugin The chart type plugin to register
 */
export function registerChartType(plugin: ChartTypePlugin): void {
  chartPlugins[plugin.type] = plugin;
  console.log(`Chart plugin registered: ${plugin.type}`);
}

/**
 * Get a chart type plugin by type
 * @param type The chart type to get
 * @returns The chart type plugin
 */
export function getChartTypePlugin(type: string): ChartTypePlugin | null {
  return chartPlugins[type] || null;
}

/**
 * Check if a chart type is registered
 * @param type The chart type to check
 * @returns Whether the chart type is registered
 */
export function hasChartTypePlugin(type: string): boolean {
  return !!chartPlugins[type];
}

/**
 * Process data for a chart type
 * @param type The chart type
 * @param data The data to process
 * @param schema The schema to use
 * @returns The processed chart data
 */
export function processDataForChartType(
  type: string,
  data: Record<string, any>[],
  schema: ChartSchema
): ProcessedChartData {
  // Check if there's a plugin registered for this chart type
  const plugin = getChartTypePlugin(type);
  if (plugin) {
    return plugin.processData(data, schema);
  }

  // Use the built-in processor for the chart type
  switch (type) {
    case 'pie':
      return processors.processPieChartData(data, schema);
    case 'heatmap':
      return processors.processHeatmapData(data, schema);
    case 'waterfall':
      return processors.processWaterfallData(data, schema);
    case 'mixed':
      return processors.processMixedData(data, schema);
    default:
      return processors.processDefaultChartData(data, schema);
  }
}

/**
 * Format tooltip for a chart type
 * @param type The chart type
 * @param tooltipContext The tooltip context
 * @param schema The schema to use
 * @returns The formatted tooltip HTML
 */
export function formatTooltipForChartType(
  type: string,
  tooltipContext: any,
  schema: ChartSchema
): string {
  // Check if there's a plugin registered for this chart type
  const plugin = getChartTypePlugin(type);
  if (plugin) {
    return plugin.formatTooltip(tooltipContext, schema);
  }

  // Otherwise, use the built-in formatter
  return formatTooltip(tooltipContext, type, schema);
}

/**
 * Get default options for a chart type
 * @param type The chart type
 * @returns The default options for the chart type
 */
export function getDefaultOptionsForChartType(type: string): Partial<any> {
  const plugin = getChartTypePlugin(type);
  if (plugin && plugin.defaultOptions) {
    return plugin.defaultOptions;
  }
  return {};
}

// Register built-in chart types
// This will be expanded in the actual implementation
// with proper processing functions for each chart type
