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
    color: item.isPositive ? '#16a34a' : item.isTotal ? '#0f172a' : '#dc2626',
    isIntermediateSum: item.isTotal,
  }));

  return {
    series: [
      {
        type: 'waterfall',
        name: valueKey,
        data: processedData,
        pointPadding: 0.2,
        dataLabels: {
          enabled: true,
          formatter: function (this: any) {
            return `${this.y >= 0 ? '+' : ''}${this.y.toFixed(2)}`;
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

  const processedData = data.map(item => ({
    name: item[categoryKey],
    y: Number(item[valueKey]),
    color: item.isPositive ? '#16a34a' : item.isTotal ? '#0f172a' : '#dc2626',
  }));

  return {
    series: [
      {
        type: 'column',
        name: valueKey,
        data: processedData,
        dataLabels: {
          enabled: true,
          formatter: function (this: any) {
            return `${this.y >= 0 ? '+' : ''}${this.y.toFixed(2)}`;
          },
        },
      },
    ] as SeriesOptionsType[],
    xAxis: {
      type: 'category',
    },
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
  point: any,
  type: ChartType,
  schema: ChartSchema
): string {
  switch (type) {
    case 'pie': {
      const { categoryKey, valueKey } = schema as PieChartSchema;
      return `${point.name}: ${point.y}`;
    }
    case 'heatmap': {
      const { xKey, yKey, valueKey } = schema as HeatmapChartSchema;
      return `${point.series.xAxis.categories[point.x]}, ${
        point.series.yAxis.categories[point.y]
      }: ${point.value}`;
    }
    case 'column': {
      const { categoryKey, valueKey } = schema as PieChartSchema;
      return `${point.name}: ${point.y >= 0 ? '+' : ''}${point.y.toFixed(2)}`;
    }
    default: {
      const { xKey, yKey } = schema as LineChartSchema;
      return `${point.name}: ${point.y}`;
    }
  }
}
