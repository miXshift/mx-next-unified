import * as React from 'react';
import { Button } from '@ui/button';
import { Badge } from '@ui/badge';
import { Calendar } from '@ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils/styling';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';

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

  const toggleDate = (date: Date) => {
    const exists = selectedDates.some(
      d =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );

    if (exists) {
      onChange(
        selectedDates.filter(
          d =>
            d.getFullYear() !== date.getFullYear() ||
            d.getMonth() !== date.getMonth() ||
            d.getDate() !== date.getDate()
        )
      );
    } else {
      onChange([...selectedDates, date]);
    }
  };

  return (
    <div className="grid gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'justify-start text-left font-normal',
              !selectedDates.length && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDates.length > 0 ? (
              <>
                {isExclude ? 'Excluding' : 'Including'} {selectedDates.length}{' '}
                dates
              </>
            ) : (
              'Select dates'
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={dates => onChange(dates || [])}
            initialFocus
          />
          {selectedDates.length > 0 && (
            <div className="border-t p-3">
              <div className="flex flex-wrap gap-1">
                {selectedDates.map((date, i) => (
                  <Badge
                    key={i}
                    variant={isExclude ? 'destructive' : 'default'}
                    className="cursor-pointer"
                    onClick={() => toggleDate(date)}
                  >
                    {format(date, 'LLL dd, y')}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
