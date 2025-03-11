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

  // Ensure chartTheme is properly initialized with defaults if any properties are missing
  const safeChartTheme = {
    ...LIGHT_THEME, // Use light theme as base
    ...chartTheme,
    tooltip: {
      ...LIGHT_THEME.tooltip,
      ...(chartTheme.tooltip || {}),
    },
    legend: {
      ...LIGHT_THEME.legend,
      ...(chartTheme.legend || {}),
    },
    plotOptions: {
      ...LIGHT_THEME.plotOptions,
      ...(chartTheme.plotOptions || {}),
    },
  };

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
            ...safeChartTheme.yAxis.labels.style,
            ...axis.title?.style,
          },
        },
        labels: {
          style: safeChartTheme.yAxis.labels.style,
        },
        gridLineColor: safeChartTheme.yAxis.gridLineColor,
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
            ...safeChartTheme.yAxis.labels.style,
            ...options.yAxis.title?.style,
          },
        },
        labels: {
          style: safeChartTheme.yAxis.labels.style,
        },
        gridLineColor: safeChartTheme.yAxis.gridLineColor,
      };
    } else {
      yAxisConfig = {
        title: {
          text: '',
          style: safeChartTheme.yAxis.labels.style,
        },
        labels: {
          style: safeChartTheme.yAxis.labels.style,
        },
        gridLineColor: safeChartTheme.yAxis.gridLineColor,
      };
    }

    // Get default options for this chart type from plugins
    const defaultTypeOptions = getDefaultOptionsForChartType(type);

    // Base configuration with theme applied
    const baseConfig = {
      chart: {
        ...options.chart,
        type,
        backgroundColor: safeChartTheme.chart.backgroundColor,
        style: {
          ...safeChartTheme.chart.style,
          fontFamily: 'inherit',
        },
        height: options.height || 400,
      },
      colors:
        type === 'waterfall'
          ? [
              safeChartTheme.plotOptions?.waterfall?.colors?.positive ||
                safeChartTheme.colors[0],
              safeChartTheme.plotOptions?.waterfall?.colors?.negative ||
                safeChartTheme.colors[2],
            ]
          : safeChartTheme.colors,
      title: {
        text:
          typeof options.title === 'string'
            ? options.title
            : options.title?.text || '',
        style: safeChartTheme.title.style,
      },
      subtitle: {
        text:
          typeof options.subtitle === 'string'
            ? options.subtitle
            : options.subtitle?.text || '',
        style: safeChartTheme.subtitle.style,
      },
      xAxis: {
        type: 'category',
        title: {
          text: options.xAxisLabel,
          style: safeChartTheme.xAxis.labels.style,
        },
        labels: {
          style: safeChartTheme.xAxis.labels.style,
          autoRotation: [-45],
          overflow: 'justify',
        },
        gridLineColor: safeChartTheme.xAxis.gridLineColor,
        lineColor: safeChartTheme.xAxis.gridLineColor,
        tickColor: safeChartTheme.xAxis.gridLineColor,
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
          fillOpacity: safeChartTheme.plotOptions?.area?.fillOpacity || 0.2,
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
        backgroundColor: safeChartTheme.tooltip.backgroundColor,
        borderColor: safeChartTheme.tooltip.borderColor,
        style: safeChartTheme.tooltip.style,
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
        enabled: options?.legend?.enabled ?? true,
        itemStyle: safeChartTheme?.legend?.itemStyle,
      },
      credits: {
        enabled: false,
      },
    };

    // Deep merge with plugin default options first, then with user options
    const mergedOptions = deepMerge.all([
      baseConfig,
      defaultTypeOptions,
      options || {}, // User options have highest priority
    ]) as Options;

    // Remove any accessibility settings from merged options to prevent errors
    if (mergedOptions.accessibility) {
      delete mergedOptions.accessibility;
    }

    return mergedOptions;
  }, [
    type,
    safeChartTheme,
    options,
    theme,
    onPointClick,
    handleSeriesClick,
    schema,
  ]);
}
