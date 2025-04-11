import { useMemo, useState } from 'react';
import { ColumnDef, Row, RowData } from '@tanstack/react-table';
import { Checkbox } from '@ui/checkbox';
import { Button } from '@ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';

export function useTableColumns<TData extends RowData, TValue = unknown>(
  columns: ColumnDef<TData, TValue>[],
  renderSubComponent?: (row: Row<TData>) => React.ReactNode
) {
  // Selection column
  const selectionColumn: ColumnDef<TData>[] = [
    {
      id: 'select',
      enableSorting: false,
      enableHiding: false,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={value => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
    },
  ];

  // Expansion column
  const expansionColumn: ColumnDef<TData>[] = renderSubComponent
    ? [
        {
          id: 'expander',
          enableSorting: false,
          enableHiding: false,
          header: () => null,
          cell: ({ row }) => (
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-8 w-8"
              onClick={() => row.toggleExpanded()}
            >
              {row.getIsExpanded() ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          ),
        },
      ]
    : [];

  const allColumns = useMemo(
    () => [...selectionColumn, ...expansionColumn, ...columns],
    [columns]
  );

  const [columnOrder, setColumnOrder] = useState(() => {
    const staticColumns = [...selectionColumn, ...expansionColumn].map(
      col => col.id as string
    );
    const dynamicColumns = columns.map(col => {
      const colDef = col as unknown as { id?: string; accessorKey?: string };
      return colDef.id || colDef.accessorKey || '';
    });
    return [...staticColumns, ...dynamicColumns.filter(col => col !== '')];
  });

  return {
    allColumns,
    columnOrder,
    setColumnOrder,
    selectionCount: selectionColumn.length,
    expansionCount: expansionColumn.length,
  };
}
