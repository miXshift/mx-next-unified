import { EnhancedColumnDef } from '@/lib/components/dynamic-table/types';
import { Merchant } from './types';
import { Button } from '@ui/button';
import { MoreHorizontal } from 'lucide-react';

export const columns: EnhancedColumnDef<Merchant>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-muted rounded-full" />
        <div className="font-medium">{row.getValue('name')}</div>
      </div>
    ),
    type: 'text',
  },
  {
    accessorKey: 'displayName',
    header: 'Display Name',
    cell: ({ row }) => row.getValue('displayName'),
    type: 'text',
  },
  {
    accessorKey: 'marketplace',
    header: 'Marketplace',
    cell: ({ row }) => row.getValue('marketplace'),
    type: 'text',
  },
  {
    accessorKey: 'availableData',
    header: 'Available Data',
    cell: ({ row }) => row.getValue('availableData'),
    type: 'text',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => row.getValue('status'),
    type: 'select',
    options: ['Empty', 'Modest'],
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: () => (
      <Button variant="ghost" size="sm">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
];
