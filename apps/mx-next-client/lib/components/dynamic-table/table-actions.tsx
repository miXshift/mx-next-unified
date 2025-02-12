import { FileDown, ListChecks } from 'lucide-react';
import { Table } from '@tanstack/react-table';
import { BulkAction, DownloadOption } from '@components/dynamic-table/types';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from '@ui/dropdown-menu';
import { Button } from '@ui/button';

interface TableActionsProps<TData> {
  table: Table<TData>;
  bulkActions?: BulkAction<TData>[];
  customActions?: React.ReactNode;
  downloadOptions?: DownloadOption[];
}

export function TableActions<TData>({
  table,
  bulkActions,
  customActions,
  downloadOptions,
}: TableActionsProps<TData>) {
  const selectedRows = table.getSelectedRowModel().rows;

  return (
    <div className="flex items-center gap-x-4">
      {customActions}

      {downloadOptions && downloadOptions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <FileDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {downloadOptions.map(option => (
              <DropdownMenuItem
                key={option.id}
                onClick={() =>
                  option.onClick(
                    table.getRowModel().rows.map(row => row.original)
                  )
                }
              >
                {option.icon && <option.icon className="mr-2 h-4 w-4" />}
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {selectedRows.length > 0 && bulkActions && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Bulk Actions ({selectedRows.length})
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {bulkActions.map(action => (
              <DropdownMenuItem
                key={action.id}
                onClick={() =>
                  action.onClick(selectedRows.map(row => row.original))
                }
                className={
                  action.variant === 'destructive' ? 'text-red-600' : ''
                }
              >
                {action.icon && <action.icon className="mr-2 h-4 w-4" />}
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <ListChecks className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter(
              column =>
                column.getCanHide() &&
                !['select', 'expander'].includes(column.id)
            )
            .map(column => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={value => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
