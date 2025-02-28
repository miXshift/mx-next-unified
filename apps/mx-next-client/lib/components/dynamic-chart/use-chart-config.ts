import { useMemo } from 'react';
import { useTheme } from 'next-themes';
import { Options } from 'highcharts';
import { DynamicChartProps } from './types';
import { LIGHT_THEME, DARK_THEME } from './theme-constants';
import { processChartData, formatTooltip } from './utils';

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

  return useMemo(() => {
    const processedData = processChartData(data, schema, type);
    console.log('Processed Chart Data:', processedData);

    const config: Options = {
      chart: {
        type: type === 'mixed' ? undefined : type,
        height: options.height || 400,
        backgroundColor:
          options.chart?.backgroundColor || chartTheme.chart.backgroundColor,
        style: {
          ...chartTheme.chart.style,
          fontFamily: 'inherit',
        },
        animation: options.animation ?? true,
        panning: {
          enabled: true,
          type: 'x',
        },
        panKey: 'shift',
      },
      title: {
        text: options.title,
        style: chartTheme.title.style,
      },
      subtitle: {
        text: options.subtitle,
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
        ...processedData.xAxis,
      },
      yAxis: options.yAxis?.map(axis => ({
        ...axis,
        title: {
          ...axis.title,
          style: chartTheme.yAxis.labels.style,
        },
        labels: {
          style: chartTheme.yAxis.labels.style,
        },
        gridLineColor: chartTheme.yAxis.gridLineColor,
      })) || [
        {
          title: {
            text: options.yAxisLabel,
            style: chartTheme.yAxis.labels.style,
          },
          labels: {
            style: chartTheme.yAxis.labels.style,
          },
          gridLineColor: chartTheme.yAxis.gridLineColor,
        },
      ],
      colors: chartTheme.colors,
      plotOptions: {
        series: {
          cursor: onPointClick || onSeriesClick ? 'pointer' : undefined,
          events: {
            click: onSeriesClick,
          },
          states: {
            hover: {
              enabled: true,
              brightness: 0.1,
            },
            inactive: {
              opacity: 0.5,
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
          fillOpacity: 0.5,
          lineWidth: 2,
          marker: {
            enabled: false,
          },
        },
      },
      tooltip: {
        enabled: options.tooltip ?? true,
        backgroundColor: chartTheme.tooltip.backgroundColor,
        borderColor: chartTheme.tooltip.borderColor,
        style: chartTheme.tooltip.style,
        shared: true,
        useHTML: true,
        formatter: function () {
          return formatTooltip(this, type, schema);
        },
      },
      legend: {
        enabled: options.legend ?? true,
        itemStyle: chartTheme.legend.itemStyle,
        align: 'center',
        verticalAlign: 'bottom',
      },
      credits: {
        enabled: options.credits ?? false,
      },
      series: processedData.series,
    };

    if (interactiveOptions.export) {
      config.exporting = {
        enabled: true,
        buttons: {
          contextButton: {
            menuItems: ['downloadPNG', 'downloadSVG', 'downloadCSV'],
          },
        },
      };
    }

    console.log('Final Chart Config:', config);
    return config;
  }, [
    type,
    data,
    schema,
    options,
    interactiveOptions,
    chartTheme,
    onPointClick,
    onSeriesClick,
  ]);
}
