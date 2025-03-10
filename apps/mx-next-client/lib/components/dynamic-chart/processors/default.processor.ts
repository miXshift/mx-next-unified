import { ChartSchema, LineChartSchema, ProcessedChartData } from '../types';
import { SeriesOptionsType } from 'highcharts';

// Define a type for data that can include null values
type ChartDataValue = number | null;

// Define a type for our intermediate data structure before converting to Highcharts series
interface SeriesData {
  name: string;
  data: (number | null)[];
  type?: string;
}

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
  const { xKey, yKey, seriesKey } = schema as LineChartSchema;

  // Apply data transformations if any
  let processedData = [...data];
  if ('transformations' in schema && schema.transformations) {
    for (const transformation of schema.transformations) {
      processedData = transformation.transform(processedData);
    }
  }

  if (seriesKey) {
    // Group data by series
    const seriesMap = new Map<string, SeriesData>();
    const categories = [...new Set(processedData.map(item => item[xKey]))];

    processedData.forEach(item => {
      const seriesName = item[seriesKey];
      if (!seriesMap.has(seriesName)) {
        seriesMap.set(seriesName, {
          name: seriesName,
          data: [] as (number | null)[],
          type: 'line',
        });
      }
      const seriesData = seriesMap.get(seriesName)!;
      const xValue = item[xKey];
      const yValue = parseFloat(item[yKey]);

      // Find the index in categories
      const xIndex = categories.indexOf(xValue);
      // Ensure the data array is long enough
      while (seriesData.data.length < categories.length) {
        seriesData.data.push(null);
      }
      // Set the value at the correct index
      seriesData.data[xIndex] = isNaN(yValue) ? null : yValue;
    });

    // When creating the final series array, convert to SeriesOptionsType
    const processedSeries = Array.from(seriesMap.values());
    const series = processedSeries as any;

    return {
      series: processedSeries as any[],
      xAxis: {
        categories,
        type: 'category',
      },
    };
  } else {
    // Single series
    const categories = processedData.map(item => item[xKey]);
    const seriesData = processedData.map(item => {
      const value = parseFloat(item[yKey]);
      return isNaN(value) ? null : value;
    });

    return {
      series: [
        {
          name: yKey,
          data: seriesData,
          type: 'line',
        },
      ],
      xAxis: {
        categories,
        type: 'category',
      },
    };
  }
}
