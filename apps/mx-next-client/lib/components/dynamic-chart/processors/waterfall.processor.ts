import {
  ChartSchema,
  WaterfallChartSchema,
  ProcessedChartData,
} from '../types';

/**
 * Process data for waterfall charts
 * @param data The data to process
 * @param schema The schema to use
 * @returns The processed chart data
 */
export function processWaterfallData(
  data: Record<string, any>[],
  schema: ChartSchema
): ProcessedChartData {
  const { categoryKey, valueKey } = schema as WaterfallChartSchema;

  // Apply data transformations if any
  let processedData = [...data];
  if ('transformations' in schema && schema.transformations) {
    for (const transformation of schema.transformations) {
      processedData = transformation.transform(processedData);
    }
  }

  const categories = processedData.map(item => item[categoryKey]);
  const seriesData = processedData.map(item => {
    const value = parseFloat(item[valueKey]);
    const isTotal = 'isTotal' in item && Boolean(item.isTotal);

    return {
      name: item[categoryKey],
      y: isNaN(value) ? 0 : value,
      isSum: isTotal, // For sum points (displayed differently)
      isIntermediateSum:
        'isIntermediateSum' in item && Boolean(item.isIntermediateSum),
      isPositive: value >= 0,
      color: undefined, // Will be set by the theme
    };
  });

  return {
    series: [
      {
        data: seriesData,
        type: 'waterfall',
        pointPadding: 0.2,
        name: valueKey,
      },
    ],
    xAxis: {
      categories,
      type: 'category',
    },
  };
}
