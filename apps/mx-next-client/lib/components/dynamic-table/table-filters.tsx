import { Button } from '@ui/button';
import { Badge } from '@ui/badge';
import { X, Filter, GripVertical, ArrowDownAZ } from 'lucide-react';
import { GroupingState, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { FilterCondition } from '@components/dynamic-table/filter-builder';
import { CustomColumnDef } from '@components/dynamic-table/types';

interface TableFiltersProps<TData> {
  columns: CustomColumnDef<TData>[];
  activeFilters: FilterCondition[];
  activeSorting: SortingState;
  activeGrouping: GroupingState;
  onFilterRemove: (filterId: string) => void;
  onSortRemove: (index: number) => void;
  onGroupRemove: (columnId: string) => void;
  onClearAll: () => void;
}

export function TableFilters<TData>({
  columns,
  activeFilters,
  activeSorting,
  activeGrouping,
  onFilterRemove,
  onSortRemove,
  onGroupRemove,
  onClearAll,
}: TableFiltersProps<TData>) {
  const [isOpen, setIsOpen] = useState(true);

  const totalActiveItems =
    activeFilters.length + activeSorting.length + activeGrouping.length;

  if (totalActiveItems === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {isOpen && (
        <div className="rounded-md border border-border bg-card p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Active Filters & Sorting</h3>
            <Button variant="ghost" size="sm" onClick={onClearAll}>
              <X className="mr-2 h-3 w-3" />
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(filter => (
              <Badge
                key={filter.id}
                variant="default"
                className="flex items-center gap-1 px-2 py-1"
              >
                <Filter className="h-3 w-3" />
                <span>
                  Filter:
                  {
                    columns.find(col => col.id === filter.column)
                      ?.header as React.ReactNode
                  }
                  {filter.operator} {filter.value && `"${filter.value}"`}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => onFilterRemove(filter.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}

            {activeGrouping.map(columnId => (
              <Badge
                key={columnId}
                variant="default"
                className="flex items-center gap-1 px-2 py-1"
              >
                <GripVertical className="h-3 w-3" />
                <span>
                  Group:
                  {
                    columns.find(
                      col =>
                        col.id === columnId ||
                        (col as any).accessorKey === columnId
                    )?.header as React.ReactNode
                  }
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => onGroupRemove(columnId)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}

            {activeSorting.map((sort, index) => (
              <Badge
                key={index}
                variant="default"
                className="flex items-center gap-1 px-2 py-1"
              >
                <ArrowDownAZ className="h-3 w-3" />
                <span>
                  Sort:
                  {
                    columns.find(
                      col =>
                        col.id === sort.id ||
                        (col as any).accessorKey === sort.id
                    )?.header as React.ReactNode
                  }
                  {sort.desc ? 'desc' : 'asc'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => onSortRemove(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
