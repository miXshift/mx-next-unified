import {
  ChartSchema,
  PieChartSchema,
  ProcessedChartData,
} from '@/lib/types/dynamic-charts/types';
import {
  applyDataTransformations,
  createPointData,
  createSeries,
} from '@/lib/utils/dynamic-charts/processor-utils';

/**
 * Process data for pie charts
 * @param data The data to process
 * @param schema The schema to use
 * @returns The processed chart data
 */
export function processPieChartData(
  data: Record<string, any>[],
  schema: ChartSchema
): ProcessedChartData {
  const { categoryKey, valueKey } = schema as PieChartSchema;

  // Apply data transformations
  const processedData = applyDataTransformations(data, schema);

  // Map each data item to pie point format using the utility function
  const seriesData = processedData.map(item =>
    createPointData(item, categoryKey, valueKey)
  );

  // Create a pie series with the processed data
  return {
    series: [createSeries(valueKey, seriesData, 'pie')],
  };
}
