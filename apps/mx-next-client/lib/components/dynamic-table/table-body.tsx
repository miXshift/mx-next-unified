import React from 'react';
import { Table, Row } from '@tanstack/react-table';
import { TableBody, TableCell, TableRow } from '@ui/table';
import { Button } from '@ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { flexRender } from '@tanstack/react-table';

interface TableBodyProps<TData> {
  table: Table<TData>;
}

export function DynamicTableBody<TData>({ table }: TableBodyProps<TData>) {
  const processedIds = new Set<string>();

  const renderRowCells = (row: Row<TData>, isNested: boolean = false) => {
    const cells = row.getVisibleCells();
    const selectionCell = cells.find(cell => cell.column.id === 'select');
    const otherCells = cells.filter(cell => cell.column.id !== 'select');

    return (
      <>
        {selectionCell && (
          <TableCell key={selectionCell.id}>
            {flexRender(
              selectionCell.column.columnDef.cell,
              selectionCell.getContext()
            )}
          </TableCell>
        )}
        {otherCells.map(cell => {
          const isGroupedColumn = cell.column.id === row.groupingColumnId;
          const className = isNested && !isGroupedColumn ? 'pl-8' : '';

          return (
            <TableCell key={cell.id} className={className}>
              {cell.getIsGrouped() ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-4"
                    onClick={() => row.toggleExpanded()}
                  >
                    {row.getIsExpanded() ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}(
                  {row.subRows.length})
                </div>
              ) : cell.getIsAggregated() ? (
                flexRender(
                  cell.column.columnDef.aggregatedCell ??
                    cell.column.columnDef.cell,
                  cell.getContext()
                )
              ) : cell.getIsPlaceholder() ? null : isGroupedColumn ? null : (
                flexRender(cell.column.columnDef.cell, cell.getContext())
              )}
            </TableCell>
          );
        })}
      </>
    );
  };

  return (
    <TableBody>
      {table.getRowModel().rows.map(row => {
        if (processedIds.has(row.id) || row.getParentRow()?.getIsGrouped()) {
          return null;
        }
        processedIds.add(row.id);

        if (row.getIsGrouped() && row.subRows.length === 1) {
          const subRow = row.subRows[0];
          return <TableRow key={subRow.id}>{renderRowCells(subRow)}</TableRow>;
        }

        return (
          <React.Fragment key={row.id}>
            <TableRow
              className={row.getIsGrouped() ? 'bg-muted/50' : undefined}
            >
              {renderRowCells(row)}
            </TableRow>

            {row.getIsExpanded() && row.subRows.length > 1 && (
              <>
                {row.subRows.map(subRow => {
                  processedIds.add(subRow.id);
                  return (
                    <TableRow key={subRow.id}>
                      {renderRowCells(subRow, true)}
                    </TableRow>
                  );
                })}
              </>
            )}
          </React.Fragment>
        );
      })}
    </TableBody>
  );
}

export default DynamicTableBody;
