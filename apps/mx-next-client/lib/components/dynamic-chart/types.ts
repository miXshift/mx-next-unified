import { Options } from 'highcharts';

export type ChartType =
  | 'line'
  | 'bar'
  | 'pie'
  | 'scatter'
  | 'heatmap'
  | 'area'
  | 'column'
  | 'waterfall'
  | 'mixed';

export type SeriesType = 'line' | 'bar' | 'column' | 'area' | 'scatter';

export type SeriesConfig = {
  key: string;
  name: string;
  type: SeriesType;
  yAxis?: number;
};

export type BaseChartSchema = {
  xKey?: string;
  yKey?: string;
  seriesKey?: string;
  categoryKey?: string;
  valueKey?: string;
  series?: SeriesConfig[];
};

export type LineChartSchema = {
  xKey: string;
  yKey: string;
  seriesKey?: string;
};

export type PieChartSchema = {
  categoryKey: string;
  valueKey: string;
};

export type HeatmapChartSchema = {
  xKey: string;
  yKey: string;
  valueKey: string;
};

export type WaterfallChartSchema = {
  categoryKey: string;
  valueKey: string;
};

export type MixedChartSchema = {
  xKey: string;
  series: SeriesConfig[];
};

export type ChartSchema =
  | LineChartSchema
  | PieChartSchema
  | HeatmapChartSchema
  | WaterfallChartSchema
  | MixedChartSchema;

export interface ChartOptions {
  title?: string;
  subtitle?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  theme?: 'light' | 'dark' | 'system';
  height?: number | string;
  width?: number | string;
  legend?: boolean;
  tooltip?: boolean;
  animation?: boolean;
  credits?: boolean;
  chart?: {
    type?: ChartType;
    height?: number | string;
    width?: number | string;
    [key: string]: any;
  };
  yAxis?: Array<{
    title?: { text: string };
    opposite?: boolean;
    [key: string]: any;
  }>;
  plotOptions?: {
    [key: string]: {
      colorByPoint?: boolean;
      grouping?: boolean;
      pointPadding?: number;
      borderWidth?: number;
      [key: string]: any;
    };
  };
}

export interface ChartInteractiveOptions {
  zoom?: boolean;
  pan?: boolean;
  drilldown?: boolean;
  export?: boolean;
}

export interface DynamicChartProps {
  type: ChartType;
  data: Record<string, any>[];
  schema: ChartSchema;
  options?: ChartOptions;
  interactiveOptions?: ChartInteractiveOptions;
  className?: string;
  onPointClick?: (point: any) => void;
  onSeriesClick?: (series: any) => void;
}

export interface ChartTheme {
  colors: string[];
  chart: {
    backgroundColor: string;
    style?: {
      fontFamily?: string;
    };
  };
  title: {
    style: {
      color: string;
    };
  };
  subtitle: {
    style: {
      color: string;
    };
  };
  xAxis: {
    labels: {
      style: {
        color: string;
      };
    };
    gridLineColor: string;
  };
  yAxis: {
    labels: {
      style: {
        color: string;
      };
    };
    gridLineColor: string;
  };
  legend: {
    itemStyle: {
      color: string;
    };
  };
  tooltip: {
    backgroundColor: string;
    borderColor: string;
    style: {
      color: string;
    };
  };
}

export interface ProcessedChartData {
  series: Options['series'];
  xAxis?: Options['xAxis'];
  yAxis?: Options['yAxis'];
}
