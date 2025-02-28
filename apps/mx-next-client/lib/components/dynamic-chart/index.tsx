'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card } from '@/lib/ui/card';
import { cn } from '@/lib/utils/styling';
import { useChartConfig } from './use-chart-config';
import { initializeHighcharts } from './highcharts-init';
import type { DynamicChartProps } from './types';

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

  const chartConfig = useChartConfig({
    type,
    data,
    schema,
    options: {
      ...options,
      chart: {
        ...options?.chart,
        type,
      },
    },
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
    <Card className={cn('p-4 overflow-hidden', className)}>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartConfig}
        containerProps={{ className: 'w-full h-full' }}
      />
    </Card>
  );
}
