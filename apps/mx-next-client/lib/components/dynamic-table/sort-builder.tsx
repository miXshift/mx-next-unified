import * as React from 'react';
import { Button } from '@ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { X } from 'lucide-react';
import { SortingState } from '@tanstack/react-table';

type SortBuilderProps = {
  fields: string[];
  sortingRules: SortingState;
  onChange: (rules: SortingState) => void;
};

export default function SortBuilder({
  fields,
  sortingRules,
  onChange,
}: SortBuilderProps) {
  const addSortRule = () => {
    const newRule = { id: fields[0], desc: false };
    onChange([...sortingRules, newRule]);
  };

  const removeSortRule = (index: number) => {
    const updatedRules = sortingRules.filter((_, i) => i !== index);
    onChange(updatedRules);
  };

  const updateSortRule = (
    index: number,
    updatedRule: Partial<{ id: string; desc: boolean }>
  ) => {
    const updatedRules = sortingRules.map((rule, i) =>
      i === index ? { ...rule, ...updatedRule } : rule
    );
    onChange(updatedRules);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Sort</h3>
        <Button variant="outline" size="sm" onClick={addSortRule}>
          Add Sort Rule
        </Button>
      </div>
      {sortingRules.map((rule, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Select
            value={rule.id}
            onValueChange={id => updateSortRule(index, { id })}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select field" />
            </SelectTrigger>
            <SelectContent>
              {fields.map(field => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={rule.desc ? 'desc' : 'asc'}
            onValueChange={desc =>
              updateSortRule(index, { desc: desc === 'desc' })
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Ascending / Descending" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeSortRule(index)}
          >
            <X />
          </Button>
        </div>
      ))}
    </div>
  );
}
