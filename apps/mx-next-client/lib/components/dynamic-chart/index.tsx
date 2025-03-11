'use client';

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  ErrorInfo,
  Component,
  useMemo,
} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from 'next-themes';
import { DynamicChartProps } from './types';
import { useChartConfig } from './use-chart-config';
import { processDataForChartType } from './plugins';
import { Skeleton } from '@/lib/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/lib/ui/alert';
import { AlertCircle } from 'lucide-react';
import { initializeHighcharts as initHighcharts } from './highcharts-init';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ChartErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Chart Error:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 bg-red-50 text-red-700 rounded">
            <h3 className="font-medium">Chart rendering error</h3>
            <p className="text-sm">
              Please try refreshing the page or contact support if the issue
              persists.
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

/**
 * A dynamic chart component that supports multiple chart types
 * and data transformations.
 */
export function DynamicChart({
  type,
  data,
  schema,
  options,
  interactiveOptions = {},
  className,
  onPointClick,
  onSeriesClick,
  onChartReady,
  fallbackComponent,
  transformData,
}: DynamicChartProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isHighchartsInitialized, setIsHighchartsInitialized] = useState(false);
  const [chartData, setChartData] = useState<any>([]);
  const { theme, resolvedTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize Highcharts - now synchronously
  useEffect(() => {
    if (!isClient) return;

    try {
      setIsLoading(true);
      const success = initializeHighcharts(); // No longer async
      setIsHighchartsInitialized(success);

      if (!success) {
        setError('Failed to initialize chart library. Please try again.');
      }
    } catch (err) {
      console.error('Chart initialization error:', err);
      setError('Error initializing chart library');
    } finally {
      setIsLoading(false);
    }
  }, [isClient]);

  // Process chart data
  useEffect(() => {
    if (!isClient || !isHighchartsInitialized || isLoading || error) return;

    const processData = async () => {
      try {
        // Apply custom data transformation if provided
        const transformedData = transformData ? transformData(data) : data;

        // Process data based on chart type
        const processed = await processDataForChartType(
          type,
          transformedData,
          schema
        );

        // Only set chart data if component is still mounted
        setChartData(processed);
      } catch (err) {
        console.error('Error processing chart data:', err);
        setError(
          'Error processing chart data: ' +
            (err instanceof Error ? err.message : String(err))
        );
      }
    };

    processData();
  }, [
    data,
    schema,
    type,
    isClient,
    isHighchartsInitialized,
    isLoading,
    error,
    transformData,
  ]);

  // Get chart configuration
  const chartOptions = useChartConfig({
    type,
    data,
    schema,
    options,
    interactiveOptions,
    onPointClick,
    onSeriesClick,
  });

  // Merge processed data with chart options
  const finalChartOptions = useMemo(() => {
    // Only create the options if we have valid data and Highcharts is initialized
    if (
      !chartData.series ||
      chartData.series.length === 0 ||
      !isHighchartsInitialized
    ) {
      return null; // Return null to prevent rendering until we're ready
    }

    // Create a new options object with merged properties
    const mergedOptions = {
      ...chartOptions,
      series: chartData.series,
      xAxis: {
        ...chartOptions.xAxis,
        ...(chartData.xAxis || {}),
      },
      // Ensure yAxis is properly handled based on whether it's an array or object
      yAxis: Array.isArray(chartOptions.yAxis)
        ? chartOptions.yAxis.map((axis, index) => ({
            ...axis,
            ...(chartData.yAxis && chartData.yAxis[index]
              ? chartData.yAxis[index]
              : {}),
          }))
        : {
            ...chartOptions.yAxis,
            ...(chartData.yAxis ? chartData.yAxis : {}),
          },
    };

    return mergedOptions;
  }, [chartOptions, chartData, isHighchartsInitialized]);

  // When chart is ready
  const handleChartCreated = useCallback(
    (chart: Highcharts.Chart) => {
      if (onChartReady) {
        // Do not try to enable accessibility features
        onChartReady(chart);
      }
    },
    [onChartReady]
  );

  // Add interactive features
  useEffect(() => {
    if (!chartRef.current || !chartRef.current.chart) return;

    const chart = chartRef.current.chart;

    try {
      // Create a single update object to minimize chart redraws
      const updateOptions: any = {
        chart: {},
      };

      // Add zoom capability
      if (interactiveOptions.zoom) {
        updateOptions.chart.zoomType = 'xy';
      }

      // Add pan capability
      if (interactiveOptions.pan) {
        updateOptions.chart.panning = true;
        updateOptions.chart.panKey = 'shift';
      }

      // Add export capability
      if (interactiveOptions.export) {
        updateOptions.exporting = {
          enabled: true,
          buttons: {
            contextButton: {
              menuItems: ['downloadPNG', 'downloadSVG', 'downloadCSV'],
            },
          },
        };
      }

      // Apply all updates at once
      chart.update(updateOptions, false);
      chart.redraw();
    } catch (error) {
      console.error('Error updating chart with interactive features:', error);
    }
  }, [interactiveOptions, chartRef.current?.chart]);

  // Render loading state
  if (isLoading) {
    return <Skeleton className={`w-full h-96 ${className || ''}`} />;
  }

  // Render error state
  if (error) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }

    return (
      <Alert variant="destructive" className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // No data to display or not ready to render
  if (!finalChartOptions) {
    return (
      <Alert className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Loading Chart</AlertTitle>
        <AlertDescription>Preparing chart data...</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={className}>
      <ChartErrorBoundary>
        <div className="w-full h-full">
          <HighchartsReact
            highcharts={Highcharts}
            options={finalChartOptions}
            ref={chartRef}
            callback={handleChartCreated}
          />
        </div>
      </ChartErrorBoundary>
    </div>
  );
}

/**
 * Initialize Highcharts with required modules
 * This is now synchronous to prevent race conditions
 */
function initializeHighcharts(): boolean {
  try {
    // Use the main initialization function
    const success = initHighcharts();
    return success;
  } catch (error) {
    console.error('Failed to load Highcharts modules:', error);
    return false;
  }
}
