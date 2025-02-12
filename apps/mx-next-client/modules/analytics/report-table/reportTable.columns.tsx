import { EnhancedColumnDef } from '@/lib/components/dynamic-table/types';
import { Account } from './reportTable.types';
import { parseISO, format } from 'date-fns';
import { Button } from '@/lib/ui/button';

export const columns: EnhancedColumnDef<Account>[] = [
  {
    accessorKey: 'amazonAccountLogin',
    header: 'Amazon Account Login',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('amazonAccountLogin')}</div>
    ),
    type: 'text',
    enableGrouping: true,
  },
  {
    accessorKey: 'merchantName',
    header: 'Merchant Name',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('merchantName')}</div>
    ),
    type: 'text',
  },
  {
    accessorKey: 'marketPlace',
    header: 'Market Place',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('marketPlace')}</div>
    ),
    type: 'text',
  },
  {
    accessorKey: 'dateAdded',
    header: 'Date Added',
    type: 'date',
    cell: ({ row }) =>
      format(parseISO(row.getValue('dateAdded')), 'MMM dd, yyyy'),
    enableGrouping: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    type: 'select',
    options: ['active', 'pending', 'suspended', 'deleted', 'review'],
    cell: ({ row }) => {
      const status = row.getValue('status') as string;

      if (status === 'active') {
        return (
          <div className="flex items-center gap-2">
            <span>Active</span>
            <Button variant="destructive" size="sm" className="h-7 px-2">
              Delete
            </Button>
          </div>
        );
      }

      if (status === 'pending') {
        return (
          <Button variant="secondary" size="sm" className="h-7">
            Complete Authentication
          </Button>
        );
      }

      return <span className="text-muted-foreground capitalize">{status}</span>;
    },
  },
  {
    accessorKey: 'activeMerchants',
    header: 'Active Merchants',
    type: 'number',
    cell: ({ row }) => (
      <div className="tabular-nums">{row.getValue('activeMerchants')}</div>
    ),
    aggregationFn: 'sum',
    aggregatedCell: ({ getValue }) => (
      <div className="tabular-nums">{getValue() as number} total</div>
    ),
  },
  {
    accessorKey: 'inactiveMerchants',
    header: 'Inactive Merchants',
    type: 'number',
    cell: ({ row }) => (
      <div className="tabular-nums">{row.getValue('inactiveMerchants')}</div>
    ),
    aggregationFn: 'sum',
    aggregatedCell: ({ getValue }) => (
      <div className="font-medium tabular-nums">
        {getValue() as number} total
      </div>
    ),
  },
  {
    accessorKey: 'totalMerchants',
    header: 'Total Merchants',
    type: 'number',
    cell: ({ row }) => (
      <div className="tabular-nums">{row.getValue('totalMerchants')}</div>
    ),
    aggregationFn: 'sum',
    aggregatedCell: ({ getValue }) => (
      <div className="font-medium tabular-nums">
        {getValue() as number} total
      </div>
    ),
  },
];
