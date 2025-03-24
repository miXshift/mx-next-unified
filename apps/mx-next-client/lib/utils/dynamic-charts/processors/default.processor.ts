import {
  ChartSchema,
  LineChartSchema,
  ProcessedChartData,
} from '@/lib/types/dynamic-charts/types';
import { processXYData } from '@/lib/utils/dynamic-charts/processor-utils';

/**
 * Process data for default chart types (line, bar, column, area)
 * @param data The data to process
 * @param schema The schema to use
 * @returns The processed chart data
 */
export function processDefaultChartData(
  data: Record<string, any>[],
  schema: ChartSchema
): ProcessedChartData {
  const typedSchema = schema as LineChartSchema;

  // Use the common XY data processor with the appropriate chart type
  // The chart type will be determined by the chart's configuration
  return processXYData(data, typedSchema, 'line');
}
