import {
  ChartSchema,
  ChartType,
  ProcessedChartData,
  LineChartSchema,
  PieChartSchema,
  HeatmapChartSchema,
  WaterfallChartSchema,
  MixedChartSchema,
} from './types';
import { SeriesOptionsType } from 'highcharts';

export function processChartData(
  data: Record<string, any>[],
  schema: ChartSchema,
  type: ChartType
): ProcessedChartData {
  switch (type) {
    case 'pie':
      return processPieChartData(data, schema as PieChartSchema);
    case 'heatmap':
      return processHeatmapData(data, schema as HeatmapChartSchema);
    case 'column':
      return processColumnData(data, schema as PieChartSchema);
    case 'mixed':
      return processMixedData(data, schema as MixedChartSchema);
    default:
      return processDefaultChartData(data, schema as LineChartSchema);
  }
}

function processDefaultChartData(
  data: Record<string, any>[],
  schema: LineChartSchema
): ProcessedChartData {
  console.log('Processing data:', { data, schema });

  const { xKey, yKey, seriesKey } = schema;

  // Validate data and schema
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.warn('No data provided for chart');
    return {
      series: [
        {
          type: 'line' as const,
          name: yKey || 'Value',
          data: [],
        },
      ] as SeriesOptionsType[],
    };
  }

  if (!xKey || !yKey) {
    console.error('Missing required schema keys:', { xKey, yKey });
    return {
      series: [
        {
          type: 'line' as const,
          name: 'Error',
          data: [],
        },
      ] as SeriesOptionsType[],
    };
  }

  if (!seriesKey) {
    // For line charts, we can just use simple arrays of values
    const processedData = data.map(item => Number(item[yKey]));
    const categories = data.map(item => item[xKey]);

    console.log('Processed single series data:', {
      data: processedData,
      categories,
    });

    return {
      series: [
        {
          type: 'line' as const,
          name: yKey,
          data: processedData,
        },
      ] as SeriesOptionsType[],
      xAxis: {
        categories,
        type: 'category',
        title: { text: xKey },
      },
      yAxis: {
        title: { text: yKey },
      },
    };
  }

  const seriesMap = new Map<string, number[]>();
  const categories = Array.from(new Set(data.map(item => item[xKey])));

  // Initialize series with empty arrays
  data.forEach(item => {
    const seriesName = item[seriesKey];
    if (!seriesMap.has(seriesName)) {
      seriesMap.set(seriesName, new Array(categories.length).fill(null));
    }
  });

  // Fill in the values
  data.forEach(item => {
    const seriesName = item[seriesKey];
    const categoryIndex = categories.indexOf(item[xKey]);
    const value = Number(item[yKey]);

    if (!isNaN(value) && categoryIndex !== -1) {
      seriesMap.get(seriesName)![categoryIndex] = value;
    } else {
      console.warn(`Invalid value or category for series ${seriesName}:`, item);
    }
  });

  const processedSeries = Array.from(seriesMap.entries()).map(
    ([name, points]) => ({
      type: 'line' as const,
      name,
      data: points,
    })
  ) as SeriesOptionsType[];

  console.log('Processed multi-series data:', {
    series: processedSeries,
    categories,
  });

  return {
    series: processedSeries,
    xAxis: {
      categories,
      type: 'category',
      title: { text: xKey },
    },
    yAxis: {
      title: { text: yKey },
    },
  };
}

function processPieChartData(
  data: Record<string, any>[],
  schema: PieChartSchema
): ProcessedChartData {
  const { categoryKey, valueKey } = schema;

  return {
    series: [
      {
        type: 'pie',
        name: valueKey,
        data: data.map(item => ({
          name: item[categoryKey],
          y: Number(item[valueKey]),
        })),
      },
    ] as SeriesOptionsType[],
  };
}

function processHeatmapData(
  data: Record<string, any>[],
  schema: HeatmapChartSchema
): ProcessedChartData {
  const { xKey, yKey, valueKey } = schema;

  // Get unique x and y values for axis categories
  const xCategories = Array.from(new Set(data.map(item => item[xKey]))).sort();
  const yCategories = Array.from(new Set(data.map(item => item[yKey]))).sort();

  // Create a 2D array for the heatmap data
  const heatmapData = data.map(item => [
    xCategories.indexOf(item[xKey]),
    yCategories.indexOf(item[yKey]),
    Number(item[valueKey]),
  ]);

  return {
    series: [
      {
        type: 'heatmap',
        borderWidth: 1,
        data: heatmapData,
        dataLabels: {
          enabled: true,
          color: '#000000',
        },
      },
    ] as SeriesOptionsType[],
    xAxis: {
      categories: xCategories,
      title: { text: null },
    },
    yAxis: {
      categories: yCategories,
      title: { text: null },
      reversed: true,
    },
  };
}

function processWaterfallData(
  data: Record<string, any>[],
  schema: WaterfallChartSchema
): ProcessedChartData {
  const { categoryKey, valueKey } = schema;

  const processedData = data.map(item => ({
    name: item[categoryKey],
    y: Number(item[valueKey]),
    isSum: item.isTotal || false,
    isIntermediateSum: item.isTotal || false,
  }));

  return {
    series: [
      {
        type: 'waterfall',
        name: '', // Empty string for no name at all
        showInLegend: false, // Hide from legend
        data: processedData,
        pointPadding: 0.2,
        dataLabels: {
          enabled: true,
          formatter: function (this: any) {
            const value = this.y;
            return `${value >= 0 ? '+' : ''}$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          },
        },
      },
    ] as SeriesOptionsType[],
  };
}

function processColumnData(
  data: Record<string, any>[],
  schema: PieChartSchema
): ProcessedChartData {
  const { categoryKey, valueKey } = schema;

  // Map the data to format required by column charts
  const processedData = data.map(item => {
    // Add color handling for positive/negative values to mimic waterfall chart
    const value = Number(item[valueKey]);
    const isPositive = item.isPositive || value > 0;
    const isTotal = item.isTotal || false;

    return {
      name: item[categoryKey],
      y: value,
      // Color handling - similar to waterfall chart
      color: isTotal ? '#0f172a' : isPositive ? '#16a34a' : '#2563eb',
    };
  });

  return {
    series: [
      {
        type: 'column',
        // Don't specify a name to avoid the "value" label
        // or use an empty string
        name: '',
        data: processedData,
        showInLegend: false,
      },
    ] as SeriesOptionsType[],
  };
}

function processMixedData(
  data: Record<string, any>[],
  schema: MixedChartSchema
): ProcessedChartData {
  const { xKey, series } = schema;

  const categories = data.map(item => item[xKey]);
  const processedSeries = series.map(seriesConfig => ({
    type: seriesConfig.type,
    name: seriesConfig.name,
    yAxis: seriesConfig.yAxis || 0,
    data: data.map(item => Number(item[seriesConfig.key])),
  })) as SeriesOptionsType[];

  return {
    series: processedSeries,
    xAxis: {
      categories,
      type: 'category',
    },
  };
}

export function formatTooltip(
  tooltipContext: any,
  type: ChartType,
  schema: ChartSchema
): string {
  // Shared tooltip showing multiple series
  if (tooltipContext.points && tooltipContext.points.length > 0) {
    // Skip showing tooltips for waterfall charts (handled by single point case)
    if (type === 'waterfall') {
      const point = tooltipContext.points[0];
      const value = point.y;
      // Format the value with proper currency
      const formattedValue =
        value >= 0
          ? `+$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : `-$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      // Show the point name without any series labels
      if (point.key || (point.point && point.point.name)) {
        const name = point.key || (point.point && point.point.name);
        return `<b>${name}</b><br/>${formattedValue}`;
      }

      // Fallback
      return `<b>${formattedValue}</b>`;
    }

    const dateStr =
      tooltipContext.points[0].x instanceof Date
        ? tooltipContext.points[0].x.toLocaleDateString()
        : tooltipContext.points[0].x;

    let html = `<b>${dateStr}</b><br/>`;

    // Sort points to ensure consistent order
    const sortedPoints = [...tooltipContext.points].sort((a, b) => {
      // Define a specific order for series names if needed
      const seriesOrder = [
        'Ad Sales',
        'Ordered Product Sales',
        'Ads % of Tot. Sales',
        'CPA',
        'AOV',
        'ROAS',
      ];
      const aIndex = seriesOrder.indexOf(a.series.name);
      const bIndex = seriesOrder.indexOf(b.series.name);

      if (aIndex >= 0 && bIndex >= 0) {
        return aIndex - bIndex;
      }

      return 0; // Keep original order if not in the predefined list
    });

    sortedPoints.forEach((point: any) => {
      const value = point.y;

      if (typeof value === 'number') {
        // Format based on series name or type
        let formattedValue = '';

        if (point.series.name.includes('ROAS')) {
          formattedValue = `${value.toFixed(1)}x`;
        } else if (point.series.name.includes('%')) {
          formattedValue = `${value.toFixed(1)}%`;
        } else {
          // Assume monetary value by default
          formattedValue = `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }

        html += `<span style="color:${point.series.color}">\u25CF</span> ${point.series.name}: <b>${formattedValue}</b><br/>`;
      }
    });

    return html;
  }

  // Single point tooltip
  switch (type) {
    case 'pie': {
      const { categoryKey, valueKey } = schema as PieChartSchema;
      const value = tooltipContext.y;
      return `<b>${tooltipContext.point.name}</b>: $${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    case 'heatmap': {
      const { xKey, yKey, valueKey } = schema as HeatmapChartSchema;
      const xCategory =
        tooltipContext.series.xAxis.categories[tooltipContext.point.x];
      const yCategory =
        tooltipContext.series.yAxis.categories[tooltipContext.point.y];
      const value = tooltipContext.point.value;
      return `<b>${xCategory}, ${yCategory}</b>: ${value}`;
    }
    case 'waterfall': {
      const value = tooltipContext.y;

      // Format the value with proper currency
      const formattedValue =
        value >= 0
          ? `+$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : `-$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      // For waterfall charts, just display the name and value directly, no series name or labels
      if (tooltipContext.point && tooltipContext.point.name) {
        return `<b>${tooltipContext.point.name}</b><br/>${formattedValue}`;
      }

      // Fallback if name isn't available
      return `<b>${formattedValue}</b>`;
    }
    case 'column': {
      const value = tooltipContext.y;
      // Format value with proper currency
      const formattedValue =
        value >= 0
          ? `+$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : `-$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      // Just return the formatted value without any additional elements
      return `<b>${formattedValue}</b>`;
    }
    case 'mixed': {
      const seriesName = tooltipContext.series.name;
      const value = tooltipContext.y;

      let formattedValue = '';
      if (seriesName.includes('ROAS')) {
        formattedValue = `${value.toFixed(1)}x`;
      } else if (seriesName.includes('%')) {
        formattedValue = `${value.toFixed(1)}%`;
      } else {
        formattedValue = `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }

      return `<span style="color:${tooltipContext.series.color}">\u25CF</span> ${seriesName}: <b>${formattedValue}</b>`;
    }
    default: {
      const value = tooltipContext.y;
      return `<span style="color:${tooltipContext.series.color}">\u25CF</span> ${tooltipContext.series.name}: <b>${value.toLocaleString()}</b>`;
    }
  }
}
