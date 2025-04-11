import * as React from 'react';
import { addDays, format, differenceInDays } from 'date-fns';
import { Calendar } from '@ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Button } from '@ui/button';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { Badge } from '@ui/badge';
import { cn } from '@/lib/utils/styling';

interface DateRange {
  from: Date;
  to: Date;
}

interface ExcludableDatePickerProps {
  onChange?: (dates: {
    includedRanges: DateRange[];
    excludedDates: Date[];
  }) => void;
  defaultNumberOfDays?: number;
}

export function ExcludableDatePicker({
  onChange,
  defaultNumberOfDays = 30,
}: ExcludableDatePickerProps) {
  const [mainRange, setMainRange] = React.useState<DateRange>({
    from: addDays(new Date(), -defaultNumberOfDays),
    to: new Date(),
  });

  const [excludedDates, setExcludedDates] = React.useState<Date[]>([]);
  const [open, setOpen] = React.useState(false);

  const getEffectiveDateRanges = React.useCallback(() => {
    const ranges: DateRange[] = [];
    let currentFrom = mainRange.from;

    const sortedExcludedDates = [...excludedDates].sort(
      (a, b) => a.getTime() - b.getTime()
    );

    for (const excludedDate of sortedExcludedDates) {
      if (excludedDate > currentFrom && excludedDate < mainRange.to) {
        ranges.push({
          from: currentFrom,
          to: addDays(excludedDate, -1),
        });
        currentFrom = addDays(excludedDate, 1);
      }
    }

    if (currentFrom < mainRange.to) {
      ranges.push({
        from: currentFrom,
        to: mainRange.to,
      });
    }

    return ranges;
  }, [mainRange, excludedDates]);

  const handleSelect = (date: Date) => {
    const isExcluded = excludedDates.some(
      d =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );

    if (isExcluded) {
      setExcludedDates(
        excludedDates.filter(
          d =>
            d.getFullYear() !== date.getFullYear() ||
            d.getMonth() !== date.getMonth() ||
            d.getDate() !== date.getDate()
        )
      );
    } else {
      setExcludedDates([...excludedDates, date]);
    }
  };

  React.useEffect(() => {
    onChange?.({
      includedRanges: getEffectiveDateRanges(),
      excludedDates,
    });
  }, [mainRange, excludedDates, onChange, getEffectiveDateRanges]);

  const totalDays = differenceInDays(mainRange.to, mainRange.from);
  const excludedDays = excludedDates.length;
  const effectiveDays = totalDays - excludedDays;

  return (
    <div className="grid gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'justify-start text-left font-normal',
              !mainRange && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>
              {format(mainRange.from, 'LLL dd, y')} -{' '}
              {format(mainRange.to, 'LLL dd, y')}
            </span>
            {excludedDates.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {excludedDates.length} excluded
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Date Range</h4>
              <p className="text-sm text-muted-foreground">
                {effectiveDays} days selected ({excludedDays} excluded)
              </p>
            </div>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={mainRange.from}
            selected={mainRange}
            onSelect={range => {
              if (range?.from && range?.to) {
                const { from, to } = range; // Destructure to ensure TypeScript understands they are defined
                setMainRange({ from, to });
                setExcludedDates(
                  excludedDates.filter(date => date >= from && date <= to)
                );
              }
            }}
            modifiers={{
              excluded: excludedDates,
            }}
            modifiersStyles={{
              excluded: {
                backgroundColor: '#22c55e',
                color: 'white',
              },
            }}
            onDayClick={handleSelect}
            numberOfMonths={2}
            disabled={date =>
              date > new Date() || date < addDays(new Date(), -365)
            }
          />
          {excludedDates.length > 0 && (
            <div className="p-3 border-t">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Excluded Dates</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExcludedDates([])}
                  >
                    Clear all
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {excludedDates.map((date, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {format(date, 'MMM d')}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          setExcludedDates(
                            excludedDates.filter((_, index) => index !== i)
                          );
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
