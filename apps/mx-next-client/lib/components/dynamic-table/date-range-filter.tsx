import * as React from 'react';
import { Button } from '@ui/button';
import { Calendar } from '@ui/calendar';
import { cn } from '@/lib/utils/styling';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import { CalendarIcon, X } from 'lucide-react';

interface DateRangeFilterProps {
  selectedDates: Date[];
  onChange: (dates: Date[]) => void;
  isExclude?: boolean;
}

export function DateRangeFilter({
  selectedDates,
  onChange,
  isExclude,
}: DateRangeFilterProps) {
  const [open, setOpen] = React.useState(false);

  const clearDates = () => {
    onChange([]);
  };

  return (
    <div className="grid gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'justify-start text-left font-normal h-9 px-3 relative',
              !selectedDates.length && 'text-muted-foreground',
              selectedDates.length > 0 && 'pr-8'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDates.length > 0 ? (
              <>
                {isExclude ? 'Excluding' : 'Including'} {selectedDates.length}{' '}
                {selectedDates.length === 1 ? 'date' : 'dates'}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearDates();
                  }}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Clear dates</span>
                </Button>
              </>
            ) : (
              'Select dates'
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border shadow bg-background" align="start">
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={dates => onChange(dates || [])}
            fixedWeeks
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
