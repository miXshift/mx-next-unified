import { useState, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import { FilterCondition } from '@components/dynamic-table/filter-builder';

export interface UseTableFilteringProps<TData> {
  data: TData[];
  onFilteredDataChange?: (filteredData: TData[]) => void;
  initialFilters?: FilterCondition[];
}

export function useTableFiltering<TData>({
  data,
  onFilteredDataChange,
  initialFilters = [],
}: UseTableFilteringProps<TData>) {
  const [originalData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const [activeFilters, setActiveFilters] = useState<FilterCondition[]>(
    initialFilters || []
  );

  const applyFilter = useCallback(
    (conditions: FilterCondition[]) => {
      setActiveFilters(conditions);

      if (conditions.length === 0) {
        setFilteredData(originalData);
        onFilteredDataChange?.(originalData);
        return;
      }

      const filtered = originalData.filter(row => {
        return conditions.every(condition => {
          const value = (row as Record<string, any>)[condition.column]; // Cast row to Record<string, any>

          switch (condition.operator) {
            case 'contains':
              return String(value)
                .toLowerCase()
                .includes(String(condition.value).toLowerCase());
            case 'equals':
              return String(value) === String(condition.value);
            case 'startsWith':
              return String(value)
                .toLowerCase()
                .startsWith(String(condition.value).toLowerCase());
            case 'endsWith':
              return String(value)
                .toLowerCase()
                .endsWith(String(condition.value).toLowerCase());
            case 'isEmpty':
              return !value;
            case 'isNotEmpty':
              return !!value;
            case 'includesDates':
              if (condition.value instanceof Array) {
                return condition.value.some(
                  date =>
                    format(parseISO(String(value)), 'yyyy-MM-dd') ===
                    format(date, 'yyyy-MM-dd')
                );
              }
              return false;
            case 'excludesDates':
              if (condition.value instanceof Array) {
                return !condition.value.some(
                  date =>
                    format(parseISO(String(value)), 'yyyy-MM-dd') ===
                    format(date, 'yyyy-MM-dd')
                );
              }
              return true;
            default:
              return true;
          }
        });
      });

      setFilteredData(filtered);
      onFilteredDataChange?.(filtered);
    },
    [originalData, onFilteredDataChange]
  );

  const removeFilter = useCallback(
    (filterId: string) => {
      const newFilters = activeFilters.filter(f => f.id !== filterId);
      applyFilter(newFilters);
    },
    [activeFilters, applyFilter]
  );

  const clearFilters = useCallback(() => {
    setActiveFilters([]);
    setFilteredData(originalData);
    onFilteredDataChange?.(originalData);
  }, [originalData, onFilteredDataChange]);

  return {
    filteredData,
    activeFilters,
    isFiltered: filteredData.length !== originalData.length,
    totalCount: originalData.length,
    filteredCount: filteredData.length,
    hiddenCount: originalData.length - filteredData.length,
    applyFilter,
    removeFilter,
    clearFilters,
  };
}
