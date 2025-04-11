import { Button } from '@ui/button';
import { Input } from '@ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { X, Plus } from 'lucide-react';
import { useState } from 'react';
import { DateRangeFilter } from '@components/dynamic-table/date-range-filter';

export type ColumnType = 'text' | 'number' | 'date' | 'boolean' | 'select';

interface Column {
  id: string;
  header: string;
  type?: ColumnType;
}

export type FilterOperator =
  | 'contains'
  | 'equals'
  | 'startsWith'
  | 'endsWith'
  | 'isEmpty'
  | 'isNotEmpty'
  | 'greaterThan'
  | 'lessThan'
  | 'between'
  | 'includesDates'
  | 'excludesDates';

export type FilterCondition = {
  id: string;
  column: string;
  operator: FilterOperator;
  value?: any;
};

interface FilterBuilderProps {
  columns: {
    id: string;
    header: string;
    type?: ColumnType;
    options?: string[];
  }[];
  initialFilters?: FilterCondition[];
  onFilter: (conditions: FilterCondition[]) => void;
}

export function FilterBuilder({
  columns,
  onFilter,
  initialFilters = [],
}: FilterBuilderProps) {
  const [conditions, setConditions] =
    useState<FilterCondition[]>(initialFilters);

  const addCondition = () => {
    const firstColumn = columns[0];
    setConditions([
      ...conditions,
      {
        id: Math.random().toString(),
        column: firstColumn.id,
        operator: getOperatorsByType(firstColumn.type)[0].value,
        value: '',
      },
    ]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const updateCondition = (id: string, updates: Partial<FilterCondition>) => {
    setConditions(
      conditions.map(condition =>
        condition.id === id ? { ...condition, ...updates } : condition
      )
    );
  };

  const getOperatorsByType = (
    type?: ColumnType
  ): { label: string; value: FilterOperator }[] => {
    const commonOperators: { label: string; value: FilterOperator }[] = [
      { label: 'Is empty', value: 'isEmpty' },
      { label: 'Is not empty', value: 'isNotEmpty' },
    ];

    switch (type) {
      case 'date':
        return [
          { label: 'Include dates', value: 'includesDates' },
          { label: 'Exclude dates', value: 'excludesDates' },
          ...commonOperators,
        ];
      case 'number':
        return [
          { label: 'Equals', value: 'equals' },
          { label: 'Greater than', value: 'greaterThan' },
          { label: 'Less than', value: 'lessThan' },
          { label: 'Between', value: 'between' },
          ...commonOperators,
        ];
      default:
        return [
          { label: 'Contains', value: 'contains' },
          { label: 'Equals', value: 'equals' },
          { label: 'Starts with', value: 'startsWith' },
          { label: 'Ends with', value: 'endsWith' },
          ...commonOperators,
        ];
    }
  };

  const renderValueInput = (condition: FilterCondition, column: Column) => {
    if (['isEmpty', 'isNotEmpty'].includes(condition.operator)) {
      return null;
    }

    if (
      column.type === 'date' &&
      ['includesDates', 'excludesDates'].includes(condition.operator)
    ) {
      return (
        <DateRangeFilter
          selectedDates={(condition.value as Date[]) || []}
          onChange={dates => updateCondition(condition.id, { value: dates })}
          isExclude={condition.operator === 'excludesDates'}
        />
      );
    }

    if (column.type === 'number') {
      return (
        <Input
          value={(condition.value as string) || ''}
          onChange={e =>
            updateCondition(condition.id, { value: e.target.value })
          }
          className="w-[200px]"
          type="number"
          placeholder="Enter value..."
        />
      );
    }

    return (
      <Input
        value={(condition.value as string) || ''}
        onChange={e => updateCondition(condition.id, { value: e.target.value })}
        className="w-[200px]"
        placeholder="Enter value..."
      />
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Filters</h3>
        <Button variant="outline" size="sm" onClick={addCondition}>
          <Plus className="mr-2 h-4 w-4" />
          Add Filter
        </Button>
      </div>

      {conditions.map(condition => {
        const currentColumn = columns.find(c => c.id === condition.column);
        const operators = getOperatorsByType(currentColumn?.type);

        return (
          <div key={condition.id} className="flex items-center gap-2">
            <Select
              value={condition.column}
              onValueChange={value => {
                const newColumn = columns.find(c => c.id === value);
                updateCondition(condition.id, {
                  column: value,
                  operator: getOperatorsByType(newColumn?.type)[0].value,
                  value: '',
                });
              }}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select column">
                  {currentColumn?.header}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {columns.map(column => (
                  <SelectItem key={column.id} value={column.id}>
                    {column.header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={condition.operator}
              onValueChange={value =>
                updateCondition(condition.id, {
                  operator: value as FilterOperator,
                  value: '',
                })
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select operator">
                  {operators.find(op => op.value === condition.operator)?.label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {operators.map(op => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {currentColumn && renderValueInput(condition, currentColumn)}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeCondition(condition.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        );
      })}

      {conditions.length > 0 && (
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setConditions([]);
              onFilter([]);
            }}
          >
            Clear
          </Button>
          <Button size="sm" onClick={() => onFilter(conditions)}>
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
}
