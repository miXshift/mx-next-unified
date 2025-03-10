import { useCallback, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { Options } from 'highcharts';
import { DynamicChartProps } from './types';
import { LIGHT_THEME, DARK_THEME } from './theme-constants';
import {
  formatTooltipForChartType,
  getDefaultOptionsForChartType,
} from './plugins';
import deepMerge from 'deepmerge';

/**
 * Custom hook to generate chart configuration
 */
export function useChartConfig({
  type,
  data,
  schema,
  options = {},
  interactiveOptions = {},
  onPointClick,
  onSeriesClick,
}: DynamicChartProps): Options {
  const { resolvedTheme } = useTheme();
  const theme = options.theme || resolvedTheme || 'light';
  const chartTheme = theme === 'dark' ? DARK_THEME : LIGHT_THEME;

  const handlePointClick = useCallback(
    (event: any) => {
      if (onPointClick) {
        onPointClick(event.point);
      }
    },
    [onPointClick]
  );

  const handleSeriesClick = useCallback(
    (event: any) => {
      if (onSeriesClick) {
        onSeriesClick(event.target);
      }
    },
    [onSeriesClick]
  );

  return useMemo(() => {
    // Handle yAxis configuration
    let yAxisConfig;
    if (Array.isArray(options.yAxis)) {
      yAxisConfig = options.yAxis.map(axis => ({
        ...axis,
        title: {
          text:
            typeof axis.title === 'string'
              ? axis.title
              : axis.title?.text || '',
          style: {
            ...chartTheme.yAxis.labels.style,
            ...axis.title?.style,
          },
        },
        labels: {
          style: chartTheme.yAxis.labels.style,
        },
        gridLineColor: chartTheme.yAxis.gridLineColor,
      }));
    } else if (options.yAxis) {
      yAxisConfig = {
        ...options.yAxis,
        title: {
          text:
            typeof options.yAxis.title === 'string'
              ? options.yAxis.title
              : options.yAxis.title?.text || '',
          style: {
            ...chartTheme.yAxis.labels.style,
            ...options.yAxis.title?.style,
          },
        },
        labels: {
          style: chartTheme.yAxis.labels.style,
        },
        gridLineColor: chartTheme.yAxis.gridLineColor,
      };
    } else {
      yAxisConfig = {
        title: {
          text: '',
          style: chartTheme.yAxis.labels.style,
        },
        labels: {
          style: chartTheme.yAxis.labels.style,
        },
        gridLineColor: chartTheme.yAxis.gridLineColor,
      };
    }

    // Get default options for this chart type from plugins
    const defaultTypeOptions = getDefaultOptionsForChartType(type);

    // Base configuration with theme applied
    const baseConfig = {
      chart: {
        ...options.chart,
        type,
        backgroundColor: chartTheme.chart.backgroundColor,
        style: {
          ...chartTheme.chart.style,
          fontFamily: 'inherit',
        },
        height: options.height || 400,
      },
      colors:
        type === 'waterfall'
          ? [
              chartTheme.plotOptions?.waterfall?.colors?.positive ||
                chartTheme.colors[0],
              chartTheme.plotOptions?.waterfall?.colors?.negative ||
                chartTheme.colors[2],
            ]
          : chartTheme.colors,
      title: {
        text:
          typeof options.title === 'string'
            ? options.title
            : options.title?.text || '',
        style: chartTheme.title.style,
      },
      subtitle: {
        text:
          typeof options.subtitle === 'string'
            ? options.subtitle
            : options.subtitle?.text || '',
        style: chartTheme.subtitle.style,
      },
      xAxis: {
        type: 'category',
        title: {
          text: options.xAxisLabel,
          style: chartTheme.xAxis.labels.style,
        },
        labels: {
          style: chartTheme.xAxis.labels.style,
          autoRotation: [-45],
          overflow: 'justify',
        },
        gridLineColor: chartTheme.xAxis.gridLineColor,
        lineColor: chartTheme.xAxis.gridLineColor,
        tickColor: chartTheme.xAxis.gridLineColor,
        ...options.xAxis,
      },
      yAxis: yAxisConfig,
      plotOptions: {
        series: {
          cursor: onPointClick ? 'pointer' : 'default',
          events: {
            click: handleSeriesClick,
          },
          states: {
            hover: {
              enabled: true,
              brightness: theme === 'dark' ? 0.2 : 0.1,
            },
            inactive: {
              opacity: theme === 'dark' ? 0.7 : 0.5,
            },
          },
          marker: {
            enabled: true,
            radius: 4,
            symbol: 'circle',
          },
        },
        waterfall: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
        column: {
          groupPadding: 0.1,
          pointPadding: 0.05,
          borderWidth: 0,
        },
        area: {
          fillOpacity: chartTheme.plotOptions?.area?.fillOpacity || 0.2,
          lineWidth: 2,
          marker: {
            enabled: true,
            radius: 4,
            symbol: 'circle',
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: chartTheme.tooltip.backgroundColor,
        borderColor: chartTheme.tooltip.borderColor,
        style: chartTheme.tooltip.style,
        shared: true,
        useHTML: true,
        headerFormat: '',
        followPointer: true,
        pointFormat: '',
        footerFormat: '',
        valueDecimals: 2,
        outside: false,
        formatter: function () {
          return formatTooltipForChartType(type, this, schema);
        },
      },
      legend: {
        enabled:
          options.legend?.enabled !== undefined ? options.legend.enabled : true,
        itemStyle: chartTheme.legend.itemStyle,
      },
      credits: {
        enabled: false,
      },
      accessibility: {
        enabled: true,
        describeSingleSeries: true,
      },
    };

    // Deep merge with plugin default options first, then with user options
    return deepMerge.all([
      baseConfig,
      defaultTypeOptions,
      options, // User options have highest priority
    ]) as Options;
  }, [
    type,
    chartTheme,
    options,
    theme,
    onPointClick,
    handleSeriesClick,
    schema,
  ]);
}
