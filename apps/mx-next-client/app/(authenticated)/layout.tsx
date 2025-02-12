'use client';
import AppLayoutFooter from '@components/app-layout/app-layout-footer';
import AppLayoutHeader from '@components/app-layout/app-layout-header';
import { AppSidebar } from '@components/sidebar/app-sidebar';
import { SidebarInset } from '@ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex">
      <AppSidebar />
      <SidebarInset>
        <div className="flex-1 flex flex-col w-full">
          <AppLayoutHeader />
          <main className="flex-1 p-6 w-full bg-slate-200 dark:bg-slate-600">
            {children}
          </main>
          <AppLayoutFooter />
        </div>
      </SidebarInset>
    </div>
  );
}
