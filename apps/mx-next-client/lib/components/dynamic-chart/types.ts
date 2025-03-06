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
  chart?: {
    type?: ChartType;
    backgroundColor?: string;
    style?: {
      fontFamily?: string;
    };
    height?: string | number;
    [key: string]: any;
  };
  colors?: string[];
  title?: {
    text?: string;
    useHTML?: boolean;
    align?: 'left' | 'center' | 'right';
    style?: {
      color?: string;
      fontSize?: string;
      fontWeight?: string;
    };
  };
  credits?: {
    enabled?: boolean;
  };
  plotOptions?: {
    series?: {
      borderRadius?: number;
      maxPointWidth?: number;
      [key: string]: any;
    };
    waterfall?: {
      [key: string]: any;
    };
    column?: {
      [key: string]: any;
    };
    area?: {
      [key: string]: any;
    };
    line?: {
      [key: string]: any;
    };
  };
  xAxis?: {
    [key: string]: any;
  };
  yAxis?: {
    [key: string]: any;
  };
  tooltip?: {
    useHTML?: boolean;
    headerFormat?: string;
    pointFormat?: string;
    formatter?: (this: TooltipFormatterContextObject) => string;
    valuePrefix?: string;
    valueDecimals?: number;
    shared?: boolean;
    [key: string]: any;
  };
  legend?: {
    [key: string]: any;
  };
  [key: string]: any;
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
      fontSize?: string;
      fontWeight?: string;
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
  plotOptions?: {
    area?: {
      fillOpacity?: number;
    };
    waterfall?: {
      colors?: {
        positive: string;
        negative: string;
      };
    };
  };
}

export interface ProcessedChartData {
  series: Options['series'];
  xAxis?: Options['xAxis'];
  yAxis?: Options['yAxis'];
}

export interface TooltipPoint {
  series: {
    name: string;
    color: string;
  };
  x: string | number;
  y: number;
}

export interface TooltipFormatterContextObject {
  points: TooltipPoint[];
  x: string | number;
  y: number;
  series: {
    name: string;
    color: string;
  };
}
