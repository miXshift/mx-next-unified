// app/(dashboard)/keywords/page.tsx
'use client';
import { DynamicTable } from '@/lib/components/dynamic-table';
import { Account } from './reportTable.types';
import { mockData } from './reportTable.mock-data';
import { columns } from './reportTable.columns';
import { DateRangePicker } from '@/lib/components/date-range/date-range-picker';
import { ExcludableDatePicker } from '@/lib/components/date-range/date-range-exclude';
import { useState } from 'react';

export default function ReportsDashboardTable() {
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  } | null>(null);
  const bulkActions = [
    {
      id: 'delete',
      label: 'Delete Selected',
      variant: 'destructive' as const,
      onClick: (selectedRows: Account[]) => {
        console.log('Delete', selectedRows);
      },
    },
  ];

  const initialState = {
    grouping: ['amazonAccountLogin'], // Column ID to group by
    sorting: [], // Keep empty or add initial sorting if needed
    filters: [], // Keep empty or add initial filters if needed
    expanded: {}, // Keep empty or add initial expanded state if needed
  };

  return (
    <div className="space-y-4 pt-6">
      <DynamicTable
        columns={columns}
        data={mockData}
        bulkActions={bulkActions}
        initialState={initialState}
        customActions={
          <>
            <DateRangePicker
              onSelect={range => {
                setDateRange(range);
                console.log('Date range selected:', range);
              }}
            />
            <ExcludableDatePicker
              defaultNumberOfDays={30}
              onChange={dates => {
                console.log('Included ranges:', dates.includedRanges);
                console.log('Excluded dates:', dates.excludedDates);
              }}
            />
          </>
        }
      />

      <div className="text-sm text-muted-foreground">
        Records: 1 - 50 of 5403 results
      </div>
    </div>
  );
}
