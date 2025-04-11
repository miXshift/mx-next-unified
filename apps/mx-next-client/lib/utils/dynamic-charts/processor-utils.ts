import { ChartSchema } from '@/lib/types/dynamic-charts/types';

// Define common types used across processors
export type ChartDataValue = number | null;

/**
 * Interface for intermediate series data
 */
export interface SeriesData {
  name: string;
  data:
    | ChartDataValue[]
    | Array<{ name: string; y: number }>
    | Array<{ x: number; y: number; value: number }>;
  type?: string;
  [key: string]: any; // Allow for additional series properties
}

/**
 * Applies transformations to the data based on schema
 * @param data Original data array
 * @param schema Chart schema that may contain transformations
 * @returns Transformed data array
 */
export function applyDataTransformations<T extends Record<string, any>>(
  data: T[],
  schema: ChartSchema
): T[] {
  let processedData = [...data];

  if ('transformations' in schema && schema.transformations) {
    for (const transformation of schema.transformations) {
      processedData = transformation.transform(processedData);
    }
  }

  return processedData;
}

/**
 * Safely parses a value to a number, returns null if NaN
 * @param value Value to parse
 * @returns Parsed number or null if invalid
 */
export function parseNumericValue(value: any): number | null {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? null : parsedValue;
}

/**
 * Extracts unique categories from data array
 * @param data Data array
 * @param key Key to extract categories from
 * @returns Array of unique categories
 */
export function extractUniqueCategories<T extends Record<string, any>>(
  data: T[],
  key: string
): any[] {
  return Array.from(new Set(data.map(item => item[key])));
}

/**
 * Creates a basic highcharts series object
 * @param name Series name
 * @param data Series data
 * @param type Chart type
 * @param additionalOptions Additional options to merge
 * @returns Series object
 */
export function createSeries(
  name: string,
  data: any[],
  type: string = 'line',
  additionalOptions: Record<string, any> = {}
): any {
  return {
    name,
    data,
    type,
    ...additionalOptions,
  };
}

/**
 * Creates a category axis configuration
 * @param categories Array of category values
 * @param additionalOptions Additional options to merge
 * @returns Axis configuration object
 */
export function createCategoryAxis(
  categories: any[],
  additionalOptions: Record<string, any> = {}
): any {
  return {
    categories,
    type: 'category',
    ...additionalOptions,
  };
}

/**
 * Creates point data for pie and similar charts
 * @param item Data item
 * @param categoryKey Key for category/name
 * @param valueKey Key for numeric value
 * @returns Formatted point object
 */
export function createPointData(
  item: Record<string, any>,
  categoryKey: string,
  valueKey: string
): { name: string; y: number } {
  return {
    name: item[categoryKey],
    y: parseNumericValue(item[valueKey]) ?? 0, // Use 0 if null
  };
}

/**
 * Processes common data patterns for charts with x and y axes
 * @param data Data array
 * @param schema Chart schema
 * @param seriesType Chart type to create
 * @returns Processed chart data with series and xAxis
 */
export function processXYData(
  data: Record<string, any>[],
  schema: ChartSchema & { xKey: string; yKey: string; seriesKey?: string },
  seriesType: string = 'line'
): { series: any[]; xAxis: any } {
  const { xKey, yKey, seriesKey } = schema;

  if (!xKey || !yKey) {
    throw new Error('xKey and yKey are required for XY data processing');
  }

  // Apply data transformations
  const processedData = applyDataTransformations(data, schema);

  if (seriesKey) {
    // Process multi-series data
    return processMultiSeriesData(
      processedData,
      xKey,
      yKey,
      seriesKey,
      seriesType
    );
  } else {
    // Process single series data
    const categories = processedData.map(item => item[xKey]);
    const seriesData = processedData.map(item => parseNumericValue(item[yKey]));

    return {
      series: [createSeries(yKey, seriesData, seriesType)],
      xAxis: createCategoryAxis(categories),
    };
  }
}

/**
 * Process data for multiple series based on a series key
 * @param processedData Transformed data array
 * @param xKey Key for x-axis values
 * @param yKey Key for y-axis values
 * @param seriesKey Key to group series by
 * @param seriesType Chart type to create
 * @returns Processed chart data with multiple series
 */
export function processMultiSeriesData(
  processedData: Record<string, any>[],
  xKey: string,
  yKey: string,
  seriesKey: string,
  seriesType: string = 'line'
): { series: any[]; xAxis: any } {
  // Group data by series
  const seriesMap = new Map<string, SeriesData>();
  const categories = extractUniqueCategories(processedData, xKey);

  processedData.forEach(item => {
    const seriesName = item[seriesKey];
    if (!seriesMap.has(seriesName)) {
      seriesMap.set(seriesName, {
        name: seriesName,
        data: Array(categories.length).fill(null),
        type: seriesType,
      });
    }
    const seriesData = seriesMap.get(seriesName)!;
    const xValue = item[xKey];
    const yValue = parseNumericValue(item[yKey]);

    // Find the index in categories
    const xIndex = categories.indexOf(xValue);
    // Set the value at the correct index
    (seriesData.data as (number | null)[])[xIndex] = yValue;
  });

  // Convert to array of series
  const series = Array.from(seriesMap.values());

  return {
    series,
    xAxis: createCategoryAxis(categories),
  };
}
