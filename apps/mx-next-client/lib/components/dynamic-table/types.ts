import { HTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';
import {
  ColumnDef,
  ExpandedState,
  GroupingState,
  RowData,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { FilterOperator } from '@components/dynamic-table/filter-builder';

export interface BulkAction<TData> {
  id: string;
  label: string;
  icon?: LucideIcon;
  variant?: 'default' | 'destructive';
  onClick: (selectedRows: TData[]) => void;
}

export interface TableInitialState {
  grouping?: GroupingState;
  sorting?: SortingState;
  filters?: FilterCondition[];
  expanded?: Record<string, boolean>;
}

export interface DataTableProps<TData extends RowData, TValue = unknown> {
  columns: EnhancedColumnDef<TData>[];
  data: TData[];
  renderSubComponent?: (row: Row<TData>) => React.ReactNode;
  bulkActions?: BulkAction<TData>[];
  onFilter?: (filteredData: TData[]) => void;
  customActions?: React.ReactNode;
  initialState?: TableInitialState;
  enableTableConfig?: boolean;
  downloadOptions?: DownloadOption[];
}
export interface DownloadOption {
  id: string;
  label: string;
  icon?: React.ComponentType<HTMLAttributes<SVGElement>>;
  onClick: (data: any) => void;
}

export type DownloadOptions = DownloadOption[];

export type ComponentType = 'card' | 'chart' | 'table';
export type ChartType = 'line' | 'bar' | 'pie';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ComponentConfig {
  dataSource?: string;
  dataKey?: string;
  title?: string;
  chartType?: ChartType;
  format?: 'number' | 'currency' | 'percentage';
  pageSize?: number;
  value?: number;
  previousValue?: number;
  width?: number;
  data?: any[];
  columns?: any[];
  [key: string]: any;
}

export interface DashboardComponent {
  id: string;
  type: ComponentType;
  position: Position;
  size: Size;
  config: ComponentConfig;
}

export interface Dashboard {
  id: string;
  name: string;
  components: DashboardComponent[];
  layout: any;
  createdAt: string;
  updatedAt: string;
}

export interface MockDataSource {
  id: string;
  name: string;
  type: string;
  data: any[];
}

export type EnhancedColumnDef<T> = ColumnDef<T> & {
  type?: 'text' | 'date' | 'select' | 'number';
  options?: string[];
  accessorKey: string;
};

export interface DataTableProps<TData extends RowData, TValue = unknown> {
  columns: EnhancedColumnDef<TData>[];
  data: TData[];
  bulkActions?: BulkAction<TData>[];
  onFilter?: (filteredData: TData[]) => void;
  customActions?: React.ReactNode;
  initialState?: TableInitialState;
  enableTableConfig?: boolean;
  downloadOptions?: DownloadOption[];
}

// Define the BulkAction type
export interface BulkAction<TData> {
  id: string;
  label: string;
  variant?: 'default' | 'destructive';
  onClick: (selectedRows: TData[]) => void;
}

export interface FilterCondition {
  id: string;
  column: string;
  operator: FilterOperator;
  value?: string | number | boolean | Date | Date[] | null;
}
export interface TableState {
  sorting?: SortingState;
  grouping?: GroupingState;
  columnVisibility?: VisibilityState;
  rowSelection?: RowSelectionState;
  expanded?: ExpandedState;
  filters?: FilterCondition[];
}

export interface Row<TData> {
  original: TData;
  id: string;
}

export interface SavedConfiguration {
  id: string;
  name: string;
  filters: FilterCondition[];
  sorting: SortingState;
  grouping: GroupingState;
}

type ColumnType = 'text' | 'number' | 'date' | 'select' | 'boolean';

export interface CustomColumnDef<TData>
  extends Omit<ColumnDef<TData>, 'accessorKey'> {
  accessorKey: string;
  type?: ColumnType;
  options?: string[];
}
