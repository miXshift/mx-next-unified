import {
  CustomColumnDef,
  EnhancedColumnDef,
  TableInitialState,
} from '@/lib/components/dynamic-table/types';
import { FilterCondition } from '@components/dynamic-table/filter-builder';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateTableInitialState<TData>(
  initialState: TableInitialState | undefined,
  columns: EnhancedColumnDef<TData>[]
): ValidationResult {
  const errors: string[] = [];

  if (!initialState) {
    return { isValid: true, errors: [] };
  }

  // Helper to get column IDs including both id and accessorKey
  const columnIds = new Set(
    columns.map(col =>
      typeof col.id !== 'undefined' ? col.id : (col.accessorKey as string)
    )
  );

  // Validate sorting
  if (initialState.sorting) {
    initialState.sorting.forEach((sort, index) => {
      if (!columnIds.has(sort.id)) {
        errors.push(
          `Invalid sorting configuration: Column '${sort.id}' at index ${index} does not exist`
        );
      }
    });
  }

  // Validate grouping
  if (initialState.grouping) {
    initialState.grouping.forEach((columnId, index) => {
      if (!columnIds.has(columnId)) {
        errors.push(
          `Invalid grouping configuration: Column '${columnId}' at index ${index} does not exist`
        );
      }
    });
  }

  // Validate filters
  if (initialState.filters) {
    initialState.filters.forEach((filter, index) => {
      // Check if column exists
      if (!columnIds.has(filter.column)) {
        errors.push(
          `Invalid filter configuration: Column '${filter.column}' at index ${index} does not exist`
        );
      }

      // Find column definition
      const column = columns.find(
        col => (col.id || (col.accessorKey as string)) === filter.column
      );

      // Validate operator based on column type
      if (column) {
        const validOperators = getValidOperatorsForColumn(column);
        if (!validOperators.includes(filter.operator)) {
          errors.push(
            `Invalid filter operator '${filter.operator}' for column '${filter.column}' of type '${column.type}'`
          );
        }
      }

      // Validate value based on operator
      if (!isValidFilterValue(filter)) {
        errors.push(
          `Invalid filter value for operator '${filter.operator}' on column '${filter.column}'`
        );
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

function getValidOperatorsForColumn(column: CustomColumnDef<any>): string[] {
  // Default operators for string type
  const defaultOperators = [
    'contains',
    'equals',
    'startsWith',
    'endsWith',
    'isEmpty',
    'isNotEmpty',
  ];

  switch (column.type) {
    case 'number':
      return ['equals', 'greaterThan', 'lessThan', 'isEmpty', 'isNotEmpty'];
    case 'date':
      return [
        'equals',
        'before',
        'after',
        'includesDates',
        'excludesDates',
        'isEmpty',
        'isNotEmpty',
      ];
    case 'boolean':
      return ['equals', 'isEmpty', 'isNotEmpty'];
    default:
      return defaultOperators;
  }
}

function isValidFilterValue(filter: FilterCondition): boolean {
  switch (filter.operator) {
    case 'isEmpty':
    case 'isNotEmpty':
      return true; // These operators don't require values
    case 'includesDates':
    case 'excludesDates':
      return (
        Array.isArray(filter.value) &&
        filter.value.every(v => v instanceof Date)
      );
    default:
      return filter.value !== undefined && filter.value !== null;
  }
}
