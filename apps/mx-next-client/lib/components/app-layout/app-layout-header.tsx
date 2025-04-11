import React from 'react';
import { DashboardBreadcrumb } from './breadcrumbs';
import { useAppHeader } from '@providers/app-provider/appheader-provider';

export default function AppLayoutHeader() {
  const { title, breadcrumbs, customHeader } = useAppHeader();

  return (
    <header className="h-16 border-b bg-cards sticky top-0 z-10 bg-background shadow-sm">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4 w-full">
          {title && <h1 className="text-lg font-semibold">{title}</h1>}
          {breadcrumbs.length > 0 && <DashboardBreadcrumb />}
          {customHeader && <div className="ml-auto">{customHeader}</div>}
        </div>
      </div>
    </header>
  );
}
