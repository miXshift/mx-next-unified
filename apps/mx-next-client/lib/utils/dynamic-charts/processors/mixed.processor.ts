import {
  ChartSchema,
  MixedChartSchema,
  ProcessedChartData,
  SeriesConfig,
} from '@/lib/types/dynamic-charts/types';
import {
  applyDataTransformations,
  parseNumericValue,
  createCategoryAxis,
  createSeries,
} from '@/lib/utils/dynamic-charts/processor-utils';

/**
 * Process data for mixed chart types (combining different chart types)
 * @param data The data to process
 * @param schema The schema to use
 * @returns The processed chart data
 */
export function processMixedData(
  data: Record<string, any>[],
  schema: ChartSchema
): ProcessedChartData {
  const { xKey, series } = schema as MixedChartSchema;

  // Apply data transformations
  const processedData = applyDataTransformations(data, schema);

  const categories = processedData.map(item => item[xKey]);
  const processedSeries = series.map(seriesConfig =>
    processSeries(processedData, seriesConfig, xKey)
  );

  return {
    series: processedSeries,
    xAxis: createCategoryAxis(categories),
  };
}

/**
 * Process a single series for mixed charts
 * @param data The data to process
 * @param seriesConfig The series configuration
 * @param xKey The x-axis key
 * @returns The processed series data
 */
function processSeries(
  data: Record<string, any>[],
  seriesConfig: SeriesConfig,
  xKey: string
): any {
  const { key, name, type, yAxis, options = {} } = seriesConfig;

  const seriesData = data.map(item => parseNumericValue(item[key]));

  // Create series with appropriate options including yAxis if specified
  const seriesOptions = {
    ...options,
    ...(yAxis !== undefined ? { yAxis } : {}),
  };

  return createSeries(name, seriesData, type, seriesOptions);
}
