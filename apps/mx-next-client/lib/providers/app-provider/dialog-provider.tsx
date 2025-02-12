'use client';
import React, { createContext, useCallback, useContext, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@ui/dialog';
import { cn } from '@/lib/utils/styling';

interface DialogOptions {
  title?: string;
  description?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  preventCloseOnOutsideClick?: boolean;
}

interface DialogContextType {
  showDialog: (options: DialogOptions) => void;
  hideDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

const dialogSizes = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-xl',
  lg: 'sm:max-w-3xl',
  xl: 'sm:max-w-4xl',
  full: 'sm:max-w-[95vw] sm:h-[95vh]',
};

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const showDialog = useCallback((options: DialogOptions) => {
    setDialogOptions(options);
    setOpen(true);
  }, []);

  const hideDialog = useCallback(() => {
    setOpen(false);
    setDialogOptions(null);
  }, []);

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        {dialogOptions && (
          <DialogContent
            className={cn(
              dialogOptions.size && dialogSizes[dialogOptions.size],
              dialogOptions.size === 'full' && 'flex flex-col',
              'max-h-screen overflow-hidden'
            )}
            onInteractOutside={
              dialogOptions.preventCloseOnOutsideClick
                ? e => e.preventDefault()
                : undefined
            }
          >
            {dialogOptions.title && (
              <DialogHeader className="flex-shrink-0">
                <DialogTitle>{dialogOptions.title}</DialogTitle>
                {dialogOptions.description && (
                  <DialogDescription>
                    {dialogOptions.description}
                  </DialogDescription>
                )}
              </DialogHeader>
            )}
            <div
              className={cn(
                'overflow-y-auto',
                dialogOptions.size === 'full'
                  ? 'flex-1'
                  : 'max-h-[calc(85vh-2rem)]',
                'py-4'
              )}
            >
              {dialogOptions.content}
            </div>
            {dialogOptions.footer && (
              <DialogFooter className="flex-shrink-0">
                {dialogOptions.footer}
              </DialogFooter>
            )}
          </DialogContent>
        )}
      </Dialog>
    </DialogContext.Provider>
  );
}

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};
