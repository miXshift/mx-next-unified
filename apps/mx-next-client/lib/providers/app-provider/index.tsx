'use client';
import { SidebarProvider } from '@/lib/ui/sidebar';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { DialogProvider } from './dialog-provider';
import { Toaster } from './toast-provider';
import { AppHeaderProvider } from './appheader-provider';

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <DialogProvider>
          <AppHeaderProvider>{children}</AppHeaderProvider>
          <Toaster />
        </DialogProvider>
      </ThemeProvider>
    </SidebarProvider>
  );
}
