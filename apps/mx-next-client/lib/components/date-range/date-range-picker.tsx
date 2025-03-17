'use client';

import { useState } from 'react';
import { format } from 'date-fns';

import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';

import { cn } from '@utils/styling';
import { Button } from '@ui/button';
import { Calendar } from '@ui/calendar';

type PresetOption = {
  label: string;
  value: string;
};

const presets: PresetOption[] = [
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 Days', value: 'last7days' },
  { label: 'This Week', value: 'thisWeek' },
  { label: 'Last Week', value: 'lastWeek' },
  { label: 'Last 30 Days', value: 'last30days' },
  { label: 'This Month', value: 'thisMonth' },
  { label: 'Last Month', value: 'lastMonth' },
  { label: 'Year To Date', value: 'yearToDate' },
  { label: 'Lifetime', value: 'lifetime' },
  { label: 'Custom range', value: 'custom' },
];

interface DateRangePickerProps {
  onSelect?: (range: { from: Date; to: Date }) => void;
}

export function DateRangePicker({ onSelect }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('last30days');
  const [date, setDate] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(),
    to: new Date(),
  });

  const handleSelect = (preset: string) => {
    setSelectedPreset(preset);
    // Calculate date range based on preset
    // You'll need to implement this based on your requirements
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedPreset === 'custom' ? (
            date?.from ? (
              <>
                {format(date.from, 'LLL dd, y')} -{' '}
                {date.to ? format(date.to, 'LLL dd, y') : ''}
              </>
            ) : (
              'Pick a date'
            )
          ) : (
            presets.find(p => p.value === selectedPreset)?.label
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-10" align="start">
        <div className="grid grid-cols-[200px_1fr] divide-x bg-background border rounded-lg shadow-md">
          {/* Presets */}
          <div className="p-3 space-y-1">
            {presets.map(preset => (
              <Button
                key={preset.value}
                variant={selectedPreset === preset.value ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => handleSelect(preset.value)}
              >
                {preset.label}
              </Button>
            ))}
          </div>

          {/* Calendar */}
          <div className="p-3">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={range => {
                if (range?.from && range?.to) {
                  // Create a new object with the correct type
                  const newRange = { from: range.from, to: range.to };
                  setDate(newRange);
                  setSelectedPreset('custom');
                }
              }}
              numberOfMonths={2}
            />

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 border-t pt-3 mt-3">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onSelect?.(date);
                  setIsOpen(false);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
