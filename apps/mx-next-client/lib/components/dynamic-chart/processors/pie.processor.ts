import { ChartSchema, PieChartSchema, ProcessedChartData } from '../types';

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

  // Apply data transformations if any
  let processedData = [...data];
  if ('transformations' in schema && schema.transformations) {
    for (const transformation of schema.transformations) {
      processedData = transformation.transform(processedData);
    }
  }

  const seriesData = processedData.map(item => {
    const value = parseFloat(item[valueKey]);
    return {
      name: item[categoryKey],
      y: isNaN(value) ? 0 : value,
    };
  });

  return {
    series: [
      {
        name: valueKey,
        data: seriesData,
        type: 'pie',
      },
    ],
  };
}
