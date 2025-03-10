import {
  ChartSchema,
  MixedChartSchema,
  ProcessedChartData,
  SeriesConfig,
} from '../types';

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

  // Apply data transformations if any
  let processedData = [...data];
  if ('transformations' in schema && schema.transformations) {
    for (const transformation of schema.transformations) {
      processedData = transformation.transform(processedData);
    }
  }

  const categories = processedData.map(item => item[xKey]);
  const processedSeries = series.map(seriesConfig =>
    processSeries(processedData, seriesConfig, xKey)
  );

  return {
    series: processedSeries,
    xAxis: {
      categories,
      type: 'category',
    },
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

  const seriesData = data.map(item => {
    const value = parseFloat(item[key]);
    return isNaN(value) ? null : value;
  });

  return {
    name,
    type,
    data: seriesData,
    yAxis,
    ...options,
  };
}
