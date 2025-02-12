import React, { useState, useEffect } from 'react';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { X, Save, FileDown, Filter, ArrowDownAZ } from 'lucide-react';
import { Badge } from '@ui/badge';
import { SortingState } from '@tanstack/react-table';
import { type FilterCondition } from '@components/dynamic-table/filter-builder';
import { SavedConfiguration } from '@components/dynamic-table/types';

interface FilterSortManagerProps {
  activeFilters: FilterCondition[];
  activeSorting: SortingState;
  onFilterChange: (filters: FilterCondition[]) => void;
  onSortingChange: (sorting: SortingState) => void;
  columns: { id: string; header: string }[];
}

export default function FilterSortManager({
  activeFilters,
  activeSorting,
  onFilterChange,
  onSortingChange,
  columns,
}: FilterSortManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [configName, setConfigName] = useState('');
  const [savedConfigs, setSavedConfigs] = useState<SavedConfiguration[]>([]);

  // Load saved configurations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tableConfigurations');
    if (saved) {
      setSavedConfigs(JSON.parse(saved));
    }
  }, []);

  // Save configurations to localStorage
  const saveConfigurations = (configs: SavedConfiguration[]) => {
    localStorage.setItem('tableConfigurations', JSON.stringify(configs));
    setSavedConfigs(configs);
  };

  const handleSaveConfiguration = () => {
    if (!configName) return;

    const newConfig: SavedConfiguration = {
      id: Date.now().toString(),
      name: configName,
      filters: activeFilters,
      sorting: activeSorting,
      grouping: [],
    };

    saveConfigurations([...savedConfigs, newConfig]);
    setConfigName('');
    setIsOpen(false);
  };

  const loadConfiguration = (config: SavedConfiguration) => {
    onFilterChange(config.filters);
    onSortingChange(config.sorting);
  };

  const deleteConfiguration = (id: string) => {
    const newConfigs = savedConfigs.filter(config => config.id !== id);
    saveConfigurations(newConfigs);
  };

  const removeFilter = (filterToRemove: FilterCondition) => {
    const newFilters = activeFilters.filter(
      filter => filter.id !== filterToRemove.id
    );
    onFilterChange(newFilters);
  };

  const removeSort = (indexToRemove: number) => {
    const newSorting = activeSorting.filter(
      (_, index) => index !== indexToRemove
    );
    onSortingChange(newSorting);
  };

  const getOperatorLabel = (operator: string) => {
    const operatorMap: Record<string, string> = {
      contains: 'contains',
      equals: '=',
      startsWith: 'starts with',
      endsWith: 'ends with',
      isEmpty: 'is empty',
      isNotEmpty: 'is not empty',
    };
    return operatorMap[operator] || operator;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save Configuration
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Current Configuration</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder="Configuration name"
                value={configName}
                onChange={e => setConfigName(e.target.value)}
              />
              <Button onClick={handleSaveConfiguration} disabled={!configName}>
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <FileDown className="mr-2 h-4 w-4" />
              Load Configuration
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {savedConfigs.map(config => (
              <DropdownMenuItem
                key={config.id}
                className="flex items-center justify-between"
                onClick={() => loadConfiguration(config)}
              >
                <span>{config.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0"
                  onClick={e => {
                    e.stopPropagation();
                    deleteConfiguration(config.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </DropdownMenuItem>
            ))}
            {savedConfigs.length === 0 && (
              <DropdownMenuItem disabled>
                No saved configurations
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {(activeFilters.length > 0 || activeSorting.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map(filter => (
            <Badge
              key={filter.id}
              variant="secondary"
              className="flex items-center gap-1"
            >
              <Filter className="h-3 w-3" />
              <span>
                {columns.find(col => col.id === filter.column)?.header}{' '}
                {getOperatorLabel(filter.operator)}{' '}
                {filter.value && `"${filter.value}"`}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => removeFilter(filter)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {activeSorting.map((sort, index) => (
            <Badge
              key={index}
              variant="default"
              className="flex items-center gap-1"
            >
              <ArrowDownAZ className="h-3 w-3" />
              <span>
                {columns.find(col => col.id === sort.id)?.header}{' '}
                {sort.desc ? 'desc' : 'asc'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => removeSort(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
