import {
  ChartSchema,
  WaterfallChartSchema,
  ProcessedChartData,
} from '@/lib/types/dynamic-charts/types';
import {
  applyDataTransformations,
  parseNumericValue,
  createCategoryAxis,
  createSeries,
} from '@/lib/utils/dynamic-charts/processor-utils';

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

  // Apply data transformations
  const processedData = applyDataTransformations(data, schema);

  const categories = processedData.map(item => item[categoryKey]);
  const seriesData = processedData.map(item => {
    const value = parseNumericValue(item[valueKey]) ?? 0; // Use 0 if null
    const isTotal = 'isTotal' in item && Boolean(item.isTotal);

    return {
      name: item[categoryKey],
      y: value,
      isSum: isTotal, // For sum points (displayed differently)
      isIntermediateSum:
        'isIntermediateSum' in item && Boolean(item.isIntermediateSum),
      isPositive: value >= 0,
      color: undefined, // Will be set by the theme
    };
  });

  // Create a waterfall series with additional options
  const waterfallOptions = {
    pointPadding: 0.2,
  };

  return {
    series: [createSeries(valueKey, seriesData, 'waterfall', waterfallOptions)],
    xAxis: createCategoryAxis(categories),
  };
}
