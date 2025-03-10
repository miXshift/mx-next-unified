'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from 'next-themes';
import { DynamicChartProps } from './types';
import { useChartConfig } from './use-chart-config';
import { processDataForChartType } from './plugins';
import { Skeleton } from '@/lib/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/lib/ui/alert';
import { AlertCircle } from 'lucide-react';

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
  const [chartData, setChartData] = useState<any>([]);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize Highcharts
  const initChart = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const success = await initializeHighcharts();

      if (!success) {
        setError('Failed to initialize chart. Please try again.');
      }
    } catch (err) {
      console.error('Chart initialization error:', err);
      setError('Error initializing chart');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      initChart();
    }
  }, [initChart, isClient]);

  // Process chart data
  useEffect(() => {
    const processData = async () => {
      try {
        console.log('Processing data for chart type:', type);
        // Apply custom data transformation if provided
        const transformedData = transformData ? transformData(data) : data;
        console.log('Transformed data:', transformedData);

        // Process data based on chart type
        const processed = await processDataForChartType(
          type,
          transformedData,
          schema
        );
        console.log('Processed chart data:', processed);
        setChartData(processed);
      } catch (err) {
        console.error('Error processing chart data:', err);
        setError(
          'Error processing chart data: ' +
            (err instanceof Error ? err.message : String(err))
        );
      }
    };

    if (isClient && !isLoading) {
      processData();
    }
  }, [data, schema, type, isClient, isLoading, transformData]);

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
  const finalChartOptions = {
    ...chartOptions,
    series: chartData.series,
    xAxis: {
      ...chartOptions.xAxis,
      ...chartData.xAxis,
    },
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

  // When chart is ready
  const handleChartCreated = useCallback(() => {
    if (onChartReady && chartRef.current && chartRef.current.chart) {
      onChartReady(chartRef.current.chart);
    }
  }, [onChartReady]);

  // Add interactive features
  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      const chart = chartRef.current.chart;

      // Add zoom capability
      if (interactiveOptions.zoom) {
        chart.update(
          {
            chart: { zoomType: 'xy' as 'xy' },
          } as any,
          false
        );
      }

      // Add pan capability
      if (interactiveOptions.pan) {
        chart.update(
          {
            chart: { panning: true, panKey: 'shift' },
          } as any,
          false
        );
      }

      // Add export capability
      if (interactiveOptions.export) {
        chart.update(
          {
            exporting: {
              enabled: true,
              buttons: {
                contextButton: {
                  menuItems: ['downloadPNG', 'downloadSVG', 'downloadCSV'],
                },
              },
            },
          },
          false
        );
      }

      // Redraw with all updates at once for better performance
      chart.redraw();
    }
  }, [interactiveOptions, chartRef.current]);

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

  // No data to display
  if (!chartData.series || chartData.series.length === 0) {
    return (
      <Alert className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>
          There is no data to display for this chart.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={className}>
      <HighchartsReact
        highcharts={Highcharts}
        options={finalChartOptions}
        ref={chartRef}
        callback={handleChartCreated}
      />
    </div>
  );
}

/**
 * Initialize Highcharts with required modules
 */
async function initializeHighcharts(): Promise<boolean> {
  try {
    // Load required modules
    await import('highcharts/modules/exporting');
    await import('highcharts/modules/export-data');
    await import('highcharts/modules/accessibility');

    // Load specific chart type modules if needed
    await import('highcharts/modules/heatmap');

    return true;
  } catch (error) {
    console.error('Failed to load Highcharts modules:', error);
    return false;
  }
}
