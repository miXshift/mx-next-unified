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
  | 'mixed'
  | string; // Allow for custom chart types via plugins

export type SeriesType =
  | 'line'
  | 'bar'
  | 'column'
  | 'area'
  | 'scatter'
  | string; // Allow for custom series types

export type SeriesConfig = {
  key: string;
  name: string;
  type: SeriesType;
  yAxis?: number;
  options?: Record<string, any>; // Additional series-specific options
};

export type BaseChartSchema = {
  xKey?: string;
  yKey?: string;
  seriesKey?: string;
  categoryKey?: string;
  valueKey?: string;
  series?: SeriesConfig[];
  transformations?: DataTransformation[]; // Allow for data transformations
};

export type LineChartSchema = {
  xKey: string;
  yKey: string;
  seriesKey?: string;
  transformations?: DataTransformation[];
};

export type PieChartSchema = {
  categoryKey: string;
  valueKey: string;
  transformations?: DataTransformation[];
};

export type HeatmapChartSchema = {
  xKey: string;
  yKey: string;
  valueKey: string;
  transformations?: DataTransformation[];
};

export type WaterfallChartSchema = {
  categoryKey: string;
  valueKey: string;
  transformations?: DataTransformation[];
};

export type MixedChartSchema = {
  xKey: string;
  series: SeriesConfig[];
  transformations?: DataTransformation[];
};

export type ChartSchema =
  | LineChartSchema
  | PieChartSchema
  | HeatmapChartSchema
  | WaterfallChartSchema
  | MixedChartSchema
  | Record<string, any>; // Allow for custom schemas via plugins

// Data transformation pipeline
export interface DataTransformation {
  name: string;
  transform: (data: Record<string, any>[]) => Record<string, any>[];
  options?: Record<string, any>;
}

export interface ChartOptions {
  chart?: {
    type?: ChartType;
    backgroundColor?: string;
    style?: {
      fontFamily?: string;
    };
    height?: string | number;
    zoomType?: 'x' | 'y' | 'xy';
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
    [key: string]: any; // Allow for any plot options
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
  accessibility?: {
    [key: string]: any;
  };
  [key: string]: any;
}

export interface ChartInteractiveOptions {
  zoom?: boolean;
  pan?: boolean;
  drilldown?: boolean;
  export?: boolean;
  [key: string]: any; // Allow for other interactive options
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
  onChartReady?: (chart: any) => void; // Callback when chart is ready
  fallbackComponent?: React.ReactNode; // Component to show if chart fails
  transformData?: (data: Record<string, any>[]) => Record<string, any>[]; // Custom data transformer
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
    [key: string]: any; // Allow for other plot options
  };
}

export interface ProcessedChartData {
  series: Options['series'];
  xAxis?: Options['xAxis'];
  yAxis?: Options['yAxis'];
  [key: string]: any; // Allow for additional properties
}

export interface TooltipPoint {
  series: {
    name: string;
    color: string;
  };
  x: string | number;
  y: number;
  [key: string]: any; // Allow for additional properties
}

export interface TooltipFormatterContextObject {
  points: TooltipPoint[];
  x: string | number;
  y: number;
  series: {
    name: string;
    color: string;
  };
  [key: string]: any; // Allow for additional properties
}

// Plugin architecture for chart types
export interface ChartTypePlugin {
  type: string;
  processData: (
    data: Record<string, any>[],
    schema: ChartSchema
  ) => ProcessedChartData;
  formatTooltip: (tooltipContext: any, schema: ChartSchema) => string;
  defaultOptions?: Partial<ChartOptions>;
}
