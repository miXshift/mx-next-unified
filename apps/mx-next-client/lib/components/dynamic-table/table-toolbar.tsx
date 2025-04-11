import { Button } from '@ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import {
  Filter,
  ArrowDownAZ,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Separator } from '@ui/separator';
import { Badge } from '@ui/badge';
import { GroupingState, SortingState } from '@tanstack/react-table';
import {
  FilterBuilder,
  FilterCondition,
} from '@components/dynamic-table/filter-builder';
import SortBuilder from '@components/dynamic-table/sort-builder';
import GroupBuilder from '@components/dynamic-table/group-by-builder';
import { CustomColumnDef } from '@components/dynamic-table/types';

interface TableToolbarProps<TData> {
  columns: CustomColumnDef<TData>[];
  sorting: SortingState;
  grouping: GroupingState;
  activeFilters: FilterCondition[];
  onSortingChange: (sorting: SortingState) => void;
  onGroupingChange: (grouping: GroupingState) => void;
  onFilterChange: (filters: FilterCondition[]) => void;
  isActiveFiltersOpen: boolean;
  onToggleActiveFilters: () => void;
  tableConfiguration: React.ReactNode;
}

export function TableToolbar<TData>({
  columns,
  sorting,
  grouping,
  activeFilters,
  onSortingChange,
  onGroupingChange,
  onFilterChange,
  isActiveFiltersOpen,
  onToggleActiveFilters,
  tableConfiguration,
}: TableToolbarProps<TData>) {
  // Map columns using the extended type
  const mappedColumns = columns.map(col => ({
    id: col.id || col.accessorKey || '',
    header: typeof col.header === 'string' ? col.header : col.accessorKey || '',
    type: col.type,
    options: col.options || [],
  }));

  const totalActiveItems =
    activeFilters.length + sorting.length + grouping.length;

  return (
    <div className="flex items-center gap-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[500px] w-full p-4" align="start">
          <FilterBuilder
            columns={mappedColumns}
            initialFilters={activeFilters}
            onFilter={onFilterChange}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <ArrowDownAZ className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[500px] w-full p-4" align="start">
          <SortBuilder
            fields={mappedColumns.map(col => col.id)}
            sortingRules={sorting}
            onChange={onSortingChange}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <GripVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[500px] w-full p-4" align="start">
          <GroupBuilder
            fields={mappedColumns}
            groupingRules={grouping}
            onChange={onGroupingChange}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      {totalActiveItems > 0 && (
        <>
          <Separator orientation="vertical" className="h-6" />
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleActiveFilters}
            className="gap-2"
          >
            {isActiveFiltersOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <Filter className="w-4" />
            <Badge variant="outline" className="ml-1">
              {totalActiveItems}
            </Badge>
          </Button>
        </>
      )}
      {tableConfiguration}
    </div>
  );
}
