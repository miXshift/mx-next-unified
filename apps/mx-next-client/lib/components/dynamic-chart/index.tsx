'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card } from '@/lib/ui/card';
import { cn } from '@/lib/utils/styling';
import { useChartConfig } from './use-chart-config';
import { initializeHighcharts } from './highcharts-init';
import type { DynamicChartProps, ChartOptions } from './types';
import {
  chartColors,
  getThemeColors,
  chartSequences,
} from '@/lib/utils/chart-colors';
import { useTheme } from 'next-themes';

// Import Highcharts but only use it on the client
let Highcharts: any;
let HighchartsReact: any;

if (typeof window !== 'undefined') {
  Highcharts = require('highcharts');
  HighchartsReact = require('highcharts-react-official').default;
}

export function DynamicChart({
  type,
  data,
  schema,
  options,
  interactiveOptions,
  className,
  onPointClick,
  onSeriesClick,
}: DynamicChartProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const getChartOptions = useCallback((): ChartOptions => {
    const themeColors = getThemeColors(isDarkMode);

    const baseOptions: ChartOptions = {
      chart: {
        type,
        backgroundColor: themeColors.background,
        style: {
          fontFamily: 'var(--font-sans)',
        },
        height: options?.chart?.height || '400px',
      },
      colors:
        type === 'waterfall'
          ? [themeColors.positive, themeColors.negative]
          : chartSequences.categorical,
      title: {
        text: options?.title?.text || '',
        style: {
          color: themeColors.text,
          fontSize: '16px',
          fontWeight: '500',
        },
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderRadius: 4,
          maxPointWidth: 40,
        },
        waterfall: {
          borderWidth: 0,
          states: {
            hover: {
              brightness: 0.1,
            },
          },
          dataLabels: {
            enabled: true,
            format: '${point.y:,.0f}',
            style: {
              color: themeColors.text,
              textOutline: 'none',
              fontWeight: '500',
            },
          },
          upColor: themeColors.positive,
          color: themeColors.negative,
        },
        column: {
          borderWidth: 0,
          groupPadding: 0.1,
          states: {
            hover: {
              brightness: 0.1,
            },
          },
        },
        area: {
          fillColor: themeColors.area,
          lineColor: themeColors.accent,
          states: {
            hover: {
              brightness: 0.1,
            },
          },
        },
      },
      xAxis: {
        labels: {
          style: {
            color: themeColors.text,
          },
        },
        lineColor: themeColors.text,
        tickColor: themeColors.text,
      },
      yAxis: {
        labels: {
          style: {
            color: themeColors.text,
          },
        },
        gridLineColor: isDarkMode
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)',
        title: {
          style: {
            color: themeColors.text,
          },
        },
      },
      tooltip: {
        backgroundColor: themeColors.background,
        borderColor: themeColors.primaryLight,
        style: {
          color: themeColors.text,
        },
      },
      legend: {
        itemStyle: {
          color: themeColors.text,
        },
        itemHoverStyle: {
          color: themeColors.textMuted,
        },
      },
      ...options,
    };

    // Adjust data for account changes to make positive numbers higher
    if (type === 'waterfall' && data) {
      const adjustedData = data.map(point => {
        if (typeof point === 'object' && point.y && point.y > 0) {
          return { ...point, y: point.y * 1.5 }; // Increase positive values by 50%
        }
        return point;
      });
      return { ...baseOptions, series: [{ data: adjustedData }] };
    }

    return baseOptions;
  }, [type, data, options, isDarkMode]);

  useEffect(() => {
    if (isClient) {
      initializeHighcharts().then(() => {
        // Initialize chart with theme-aware options
        const chartOptions = getChartOptions();
        // ... rest of initialization code
      });
    }
  }, [initializeHighcharts, isClient, getChartOptions]);

  const chartConfig = useChartConfig({
    type,
    data,
    schema,
    options: getChartOptions(),
    interactiveOptions,
    onPointClick,
    onSeriesClick,
  });

  console.log('Chart Data:', data);
  console.log('Chart Schema:', schema);
  console.log('Chart Config:', chartConfig);

  if (error) {
    return (
      <Card className={cn('p-4 overflow-hidden bg-destructive/10', className)}>
        <div className="flex flex-col gap-2">
          <div className="text-destructive font-medium">Chart Error</div>
          <div className="text-destructive/80 text-sm">{error}</div>
          <button
            onClick={initChart}
            className="text-sm text-primary hover:text-primary/80"
          >
            Retry Loading
          </button>
        </div>
      </Card>
    );
  }

  if (isLoading || !isClient) {
    return (
      <Card className={cn('p-4 overflow-hidden', className)}>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('p-4 overflow-hidden shadow-none', className)}>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartConfig}
        containerProps={{ className: 'w-full h-full' }}
      />
    </Card>
  );
}
