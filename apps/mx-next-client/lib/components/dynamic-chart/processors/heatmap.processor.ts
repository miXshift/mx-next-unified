import { ChartSchema, HeatmapChartSchema, ProcessedChartData } from '../types';

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

  // Apply data transformations if any
  let processedData = [...data];
  if ('transformations' in schema && schema.transformations) {
    for (const transformation of schema.transformations) {
      processedData = transformation.transform(processedData);
    }
  }

  // Extract unique x and y values to create categories
  const xCategories = Array.from(
    new Set(processedData.map(item => item[xKey]))
  );
  const yCategories = Array.from(
    new Set(processedData.map(item => item[yKey]))
  );

  // Convert data to format expected by Highcharts
  const seriesData = processedData.map(item => {
    const xIndex = xCategories.indexOf(item[xKey]);
    const yIndex = yCategories.indexOf(item[yKey]);
    const value = parseFloat(item[valueKey]);

    return {
      x: xIndex,
      y: yIndex,
      value: isNaN(value) ? 0 : value,
    };
  });

  return {
    series: [
      {
        name: valueKey,
        data: seriesData,
        type: 'heatmap',
        dataLabels: {
          enabled: true,
          format: '{point.value}',
        },
      },
    ],
    xAxis: {
      categories: xCategories,
      type: 'category',
    },
    yAxis: {
      categories: yCategories,
      type: 'category',
    },
  };
}
