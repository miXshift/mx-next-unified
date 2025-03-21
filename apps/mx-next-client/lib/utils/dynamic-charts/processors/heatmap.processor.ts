import {
  ChartSchema,
  HeatmapChartSchema,
  ProcessedChartData,
} from '@/lib/types/dynamic-charts/types';
import {
  applyDataTransformations,
  parseNumericValue,
  extractUniqueCategories,
  createCategoryAxis,
  createSeries,
} from '@/lib/utils/dynamic-charts/processor-utils';

/**
 * Process data for heatmap charts
 * @param data The data to process
 * @param schema The schema to use
 * @returns The processed chart data
 */
export function processHeatmapData(
  data: Record<string, any>[],
  schema: ChartSchema
): ProcessedChartData {
  const { xKey, yKey, valueKey } = schema as HeatmapChartSchema;

  // Apply data transformations
  const processedData = applyDataTransformations(data, schema);

  // Extract unique x and y values to create categories
  const xCategories = extractUniqueCategories(processedData, xKey);
  const yCategories = extractUniqueCategories(processedData, yKey);

  // Convert data to format expected by Highcharts
  const seriesData = processedData.map(item => {
    const xIndex = xCategories.indexOf(item[xKey]);
    const yIndex = yCategories.indexOf(item[yKey]);
    const value = parseNumericValue(item[valueKey]) ?? 0; // Use 0 if null

    return {
      x: xIndex,
      y: yIndex,
      value,
    };
  });

  // Create a heatmap series with additional options
  const heatmapOptions = {
    dataLabels: {
      enabled: true,
      format: '{point.value}',
    },
  };

  return {
    series: [createSeries(valueKey, seriesData, 'heatmap', heatmapOptions)],
    xAxis: createCategoryAxis(xCategories),
    yAxis: createCategoryAxis(yCategories),
  };
}
