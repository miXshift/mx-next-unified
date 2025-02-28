import Highcharts from 'highcharts';

let initialized = false;

export async function initializeHighcharts(): Promise<boolean> {
  if (initialized) return true;
  if (typeof window === 'undefined') return false;

  try {
    console.log('Initializing Highcharts...');

    // Import core modules
    const coreModules = await Promise.all([
      import('highcharts/highcharts-more'),
      import('highcharts/modules/exporting'),
      import('highcharts/modules/export-data'),
      import('highcharts/modules/heatmap'),
    ]);

    // Initialize core modules
    coreModules.forEach(module => {
      if (module?.default) {
        try {
          module.default(Highcharts);
          console.log('Core module initialized:', module.default.name);
        } catch (e) {
          console.warn('Core module initialization warning:', e);
        }
      }
    });

    // Import and initialize waterfall module separately
    try {
      const { default: waterfallModule } = await import(
        'highcharts/modules/variwide'
      );
      waterfallModule(Highcharts);
      console.log('Waterfall module initialized');
    } catch (e) {
      console.warn('Waterfall module initialization warning:', e);
    }

    // Basic global options
    Highcharts.setOptions({
      credits: {
        enabled: false,
      },
    });

    initialized = true;
    console.log('Highcharts initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize Highcharts:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack trace:', error.stack);
    }
    return false;
  }
}
