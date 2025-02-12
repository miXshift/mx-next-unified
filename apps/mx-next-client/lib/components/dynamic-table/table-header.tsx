import { Header } from '@tanstack/react-table';
import { TableHead } from '@ui/table';
import { Button } from '@ui/button';
import { ArrowUpDown } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender } from '@tanstack/react-table';

interface TableHeaderProps<TData, TValue> {
  header: Header<TData, TValue>;
  isDraggable?: boolean;
}

export function TableHeader<TData, TValue>({
  header,
  isDraggable,
}: TableHeaderProps<TData, TValue>) {
  const sortable = useSortable({ id: header.id });
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = isDraggable
    ? sortable
    : {
        attributes: {},
        listeners: {},
        setNodeRef: null,
        transform: null,
        transition: null,
        isDragging: false,
      };

  const style = isDraggable
    ? {
        transform: CSS.Transform.toString(transform),
        transition: transition || '',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        touchAction: 'none',
      }
    : {};

  const isSelectColumn = header.column.id === 'select';

  const HeaderComponent = (
    <div className="flex items-center whitespace-nowrap">
      {isSelectColumn ? (
        flexRender(header.column.columnDef.header, header.getContext())
      ) : (
        <>
          {flexRender(header.column.columnDef.header, header.getContext())}
          {header.column.getCanSort() && (
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-8 w-8 p-0"
              onClick={e => {
                e.stopPropagation();
                header.column.toggleSorting();
              }}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          )}
        </>
      )}
    </div>
  );

  if (isDraggable && !isSelectColumn) {
    return (
      <TableHead ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {HeaderComponent}
      </TableHead>
    );
  }

  return <TableHead>{HeaderComponent}</TableHead>;
}
