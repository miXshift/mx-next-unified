import { useState, useEffect } from 'react';
import {
  GroupingState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  ExpandedState,
  ColumnDef,
} from '@tanstack/react-table';
import {
  CustomColumnDef,
  EnhancedColumnDef,
  TableInitialState,
} from '@components/dynamic-table/types';
import { FilterCondition } from '@components/dynamic-table/filter-builder';
import { validateTableInitialState } from '@components/dynamic-table/table-state-validation';

export function useTableState<TData>(
  initialState: TableInitialState | undefined,
  columns: EnhancedColumnDef<TData>[],
  onValidationError?: (errors: string[]) => void
) {
  // Default states
  const defaultState = {
    sorting: [] as SortingState,
    grouping: [] as GroupingState,
    filters: [] as FilterCondition[], // Use the consistent FilterCondition type
    columnVisibility: {} as VisibilityState,
    rowSelection: {} as RowSelectionState,
    expanded: {} as ExpandedState,
  };

  // Validate initial state
  const validation = validateTableInitialState(initialState, columns);
  if (!validation.isValid) {
    onValidationError?.(validation.errors);
    initialState = undefined;
  }

  // Initialize states with merged values
  const [sorting, setSorting] = useState<SortingState>(
    initialState?.sorting || defaultState.sorting
  );
  const [grouping, setGrouping] = useState<GroupingState>(
    initialState?.grouping || defaultState.grouping
  );
  const [activeFilters, setActiveFilters] = useState<FilterCondition[]>(
    initialState?.filters || defaultState.filters
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultState.columnVisibility
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    defaultState.rowSelection
  );
  const [expanded, setExpanded] = useState<ExpandedState>(
    initialState?.expanded || defaultState.expanded
  );

  // Handle programmatic updates
  useEffect(() => {
    if (initialState) {
      const validation = validateTableInitialState(initialState, columns);
      if (validation.isValid) {
        if (initialState.sorting) setSorting(initialState.sorting);
        if (initialState.grouping) setGrouping(initialState.grouping);
        if (initialState.filters) setActiveFilters(initialState.filters);
        if (initialState.expanded) setExpanded(initialState.expanded);
      } else {
        onValidationError?.(validation.errors);
      }
    }
  }, [initialState, columns]);

  return {
    sorting,
    setSorting,
    grouping,
    setGrouping,
    activeFilters,
    setActiveFilters,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
    expanded,
    setExpanded,
  };
}
