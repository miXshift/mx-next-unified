import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  RowData,
} from '@tanstack/react-table';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { Table, TableHeader, TableRow } from '@ui/table';
import { Button } from '@ui/button';

import { TableHeader as DynamicTableHeader } from './table-header';
import { TableToolbar } from '@components/dynamic-table/table-toolbar';
import { TableActions } from '@components/dynamic-table/table-actions';
import { TableFilters } from '@components/dynamic-table/table-filters';
import { TableConfiguration } from '@components/dynamic-table/table-configuration';
import { DynamicTableBody } from '@components/dynamic-table/table-body';
import {
  DataTableProps,
  SavedConfiguration,
} from '@components/dynamic-table/types';

// Hooks
import {
  useTableState,
  useTableColumns,
  useTableFiltering,
} from '@hooks/dynamic-table';

export function DynamicTable<TData extends RowData, TValue = unknown>({
  columns,
  data,
  renderSubComponent,
  bulkActions,
  onFilter,
  customActions,
  initialState,
  enableTableConfig = false,
  downloadOptions,
}: DataTableProps<TData, TValue>) {
  // Table state management
  const {
    sorting,
    setSorting,
    grouping,
    setGrouping,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
    expanded,
    setExpanded,
  } = useTableState(initialState, columns, errors => {
    console.error('Table state validation errors:', errors);
  });

  // Filtering management
  const {
    filteredData,
    activeFilters,
    applyFilter,
    removeFilter,
    clearFilters,
    isFiltered,
    hiddenCount,
  } = useTableFiltering({
    data,
    onFilteredDataChange: onFilter,
    initialFilters: initialState?.filters,
  });

  // Column management
  const {
    allColumns,
    columnOrder,
    setColumnOrder,
    selectionCount,
    expansionCount,
  } = useTableColumns(columns, renderSubComponent);

  const [isActiveFiltersOpen, setIsActiveFiltersOpen] = useState(false);

  // DnD sensors
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    })
  );

  // Handle column reordering
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = columnOrder.indexOf(active.id as string);
    const newIndex = columnOrder.indexOf(over.id as string);

    const newColumnOrder = [...columnOrder];
    newColumnOrder.splice(oldIndex, 1);
    newColumnOrder.splice(newIndex, 0, active.id as string);
    setColumnOrder(newColumnOrder);
  };

  // Handle saved configuration loading
  const handleLoadConfiguration = (config: SavedConfiguration) => {
    applyFilter(config.filters);
    setSorting(config.sorting);
    setGrouping(config.grouping);
  };

  // Initialize table
  const table = useReactTable({
    data: filteredData,
    columns: allColumns,
    state: {
      sorting,
      grouping,
      columnVisibility,
      rowSelection,
      expanded,
      columnOrder,
    },
    enableGrouping: true,
    enableExpanding: !!renderSubComponent,
    getRowId: (row: any) => row.id,
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    groupedColumnMode: 'reorder',
    manualGrouping: false,
    getSubRows: undefined,
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex justify-between gap-2 flex-wrap">
        <TableToolbar
          columns={columns}
          sorting={sorting}
          grouping={grouping}
          activeFilters={activeFilters}
          onSortingChange={setSorting}
          onGroupingChange={setGrouping}
          onFilterChange={applyFilter}
          isActiveFiltersOpen={isActiveFiltersOpen}
          onToggleActiveFilters={() =>
            setIsActiveFiltersOpen(!isActiveFiltersOpen)
          }
          tableConfiguration={
            enableTableConfig ? (
              <TableConfiguration
                activeFilters={activeFilters}
                activeSorting={sorting}
                activeGrouping={grouping}
                onLoad={handleLoadConfiguration}
              />
            ) : null
          }
        />
        <TableActions
          table={table}
          bulkActions={bulkActions}
          downloadOptions={downloadOptions}
          customActions={
            <>
              {customActions}
              {isFiltered && (
                <Button size="sm" variant="outline" onClick={clearFilters}>
                  Reset ({hiddenCount} hidden)
                </Button>
              )}
            </>
          }
        />
      </div>

      {/* Active Filters Display */}
      {(activeFilters.length > 0 ||
        sorting.length > 0 ||
        grouping.length > 0) &&
        isActiveFiltersOpen && (
          <TableFilters
            columns={columns}
            activeFilters={activeFilters}
            activeSorting={sorting}
            activeGrouping={grouping}
            onFilterRemove={removeFilter}
            onSortRemove={index =>
              setSorting(prev => prev.filter((_, i) => i !== index))
            }
            onGroupRemove={columnId =>
              setGrouping(prev => prev.filter(g => g !== columnId))
            }
            onClearAll={() => {
              clearFilters();
              setSorting([]);
              setGrouping([]);
            }}
          />
        )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => {
              const selectionHeader = headerGroup.headers.find(
                header => header.column.id === 'select'
              );
              const remainingHeaders = headerGroup.headers.filter(
                header => header.column.id !== 'select'
              );

              return (
                <TableRow key={headerGroup.id}>
                  {/* Selection Header - Always First */}
                  {selectionHeader && (
                    <DynamicTableHeader
                      key={selectionHeader.id}
                      header={selectionHeader}
                      isDraggable={false}
                    />
                  )}

                  {/* Draggable Headers */}
                  <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    <SortableContext
                      items={remainingHeaders.map(header => header.id)}
                      strategy={horizontalListSortingStrategy}
                    >
                      {remainingHeaders.map(header => (
                        <DynamicTableHeader
                          key={header.id}
                          header={header}
                          isDraggable={!header.column.getIsGrouped()}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                </TableRow>
              );
            })}
          </TableHeader>

          <DynamicTableBody table={table} />
        </Table>
      </div>
    </div>
  );
}
