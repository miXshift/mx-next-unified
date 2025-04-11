import * as React from 'react';
import { Button } from '@ui/button';
import { X, GripVertical } from 'lucide-react';
import { GroupingState } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';

interface GroupBuilderProps {
  fields: Array<{
    id: string;
    header: string;
    aggregateFunction?: 'count' | 'sum' | 'avg' | 'min' | 'max';
  }>;
  groupingRules: GroupingState;
  onChange: (rules: GroupingState) => void;
}

export default function GroupBuilder({
  fields,
  groupingRules,
  onChange,
}: GroupBuilderProps) {
  const addGroupRule = () => {
    const availableFields = fields
      .filter(field => !groupingRules.includes(field.id))
      .map(field => field.id);

    if (availableFields.length > 0) {
      onChange([...groupingRules, availableFields[0]]);
    }
  };

  const removeGroupRule = (index: number) => {
    const updatedRules = groupingRules.filter((_, i) => i !== index);
    onChange(updatedRules);
  };

  const updateGroupRule = (index: number, fieldId: string) => {
    const updatedRules = groupingRules.map((rule, i) =>
      i === index ? fieldId : rule
    );
    onChange(updatedRules);
  };

  const moveGroupRule = (from: number, to: number) => {
    const updatedRules = [...groupingRules];
    const [removed] = updatedRules.splice(from, 1);
    updatedRules.splice(to, 0, removed);
    onChange(updatedRules);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Group By Rules</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={addGroupRule}
          disabled={groupingRules.length >= fields.length}
        >
          Add Group Rule
        </Button>
      </div>

      {groupingRules.map((rule, index) => {
        const field = fields.find(f => f.id === rule);
        const availableFields = fields.filter(
          f => !groupingRules.includes(f.id) || f.id === rule
        );

        return (
          <div key={index} className="flex items-center gap-2 group">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => {
                  if (index > 0) {
                    moveGroupRule(index, index - 1);
                  }
                }}
                disabled={index === 0}
              >
                <GripVertical className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Level {index + 1}
              </span>
            </div>

            <Select
              value={rule}
              onValueChange={value => updateGroupRule(index, value)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue>{field?.header || 'Select field'}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {availableFields.map(field => (
                  <SelectItem key={field.id} value={field.id}>
                    {field.header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {field?.aggregateFunction && (
              <div className="text-sm text-muted-foreground">
                Aggregated by: {field.aggregateFunction}
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeGroupRule(index)}
              className="ml-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        );
      })}

      {groupingRules.length > 0 && (
        <div className="pt-2 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => onChange([])}>
            Clear Groups
          </Button>
        </div>
      )}
    </div>
  );
}
