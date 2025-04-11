import { useState, useEffect } from 'react';
import { Button } from '@ui/button';
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
  DropdownMenuSeparator,
} from '@ui/dropdown-menu';
import { Input } from '@ui/input';
import { Save, FileDown, X } from 'lucide-react';
import { GroupingState, SortingState } from '@tanstack/react-table';
import { SavedConfiguration } from '@components/dynamic-table/types';
import { FilterCondition } from '@components/dynamic-table/filter-builder';

interface TableConfigurationProps {
  activeFilters: FilterCondition[];
  activeSorting: SortingState;
  activeGrouping: GroupingState;
  onLoad: (config: SavedConfiguration) => void;
}

export function TableConfiguration({
  activeFilters,
  activeSorting,
  activeGrouping,
  onLoad,
}: TableConfigurationProps) {
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
      grouping: activeGrouping,
    };

    saveConfigurations([...savedConfigs, newConfig]);
    setConfigName('');
    setIsOpen(false);
  };

  const deleteConfiguration = (id: string) => {
    saveConfigurations(savedConfigs.filter(config => config.id !== id));
  };

  return (
    <div className="flex items-center gap-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save View
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Current View</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              placeholder="View name"
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
            Load View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {savedConfigs.map(config => (
            <DropdownMenuItem
              key={config.id}
              className="flex items-center justify-between"
              onClick={() => onLoad(config)}
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
            <DropdownMenuItem disabled>No saved views</DropdownMenuItem>
          )}
          {savedConfigs.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => saveConfigurations([])}
                className="text-destructive"
              >
                Clear All Saved Views
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
