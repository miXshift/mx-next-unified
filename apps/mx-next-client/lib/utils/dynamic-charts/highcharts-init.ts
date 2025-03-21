import Highcharts from 'highcharts';

let initialized = false;

// Helper function to check if the module is properly initialized
function isModuleAvailable(moduleName: string): boolean {
  // For accessibility module, we check if specific properties exist
  if (moduleName === 'accessibility') {
    return (
      // @ts-ignore - Checking internal Highcharts properties
      typeof Highcharts.A11yChartUtilities !== 'undefined' ||
      // @ts-ignore - Alternative check for the accessibility module
      typeof Highcharts.AccessibilityComponent !== 'undefined'
    );
  }
  return true; // Default to true for other modules
}

// Don't use async/await for Highcharts initialization
// This ensures all modules are loaded synchronously before any chart is rendered
export function initializeHighcharts(): boolean {
  // Return immediately if already initialized or not in a browser
  if (initialized || typeof window === 'undefined') {
    return initialized;
  }

  try {
    console.log('Initializing Highcharts synchronously...');

    // Set basic options first with safe defaults (no module-dependent options)
    Highcharts.setOptions({
      credits: {
        enabled: false,
      },
    });

    // Import and initialize modules synchronously
    // This prevents any race conditions with async module loading
    try {
      // Load core modules, but SKIP the accessibility module
      require('highcharts/highcharts-more')(Highcharts);
      require('highcharts/modules/exporting')(Highcharts);
      require('highcharts/modules/export-data')(Highcharts);
      require('highcharts/modules/heatmap')(Highcharts);

      // DO NOT load the accessibility module which is causing issues
      // require('highcharts/modules/accessibility')(Highcharts);

      console.log(
        'All Highcharts modules loaded synchronously (accessibility disabled)'
      );
    } catch (e) {
      console.error('Error loading Highcharts modules:', e);
      // Continue execution even if some modules fail to load
    }

    initialized = true;
    console.log('Highcharts initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize Highcharts:', error);
    return false;
  }
}
