'use client';
import AppLayoutFooter from '@/lib/components/app-layout/app-layout-footer';
import AppLayoutHeader from '@/lib/components/app-layout/app-layout-header';
import { AppSidebar } from '@/lib/components/sidebar/app-sidebar';
import { SidebarInset } from '@/lib/ui/sidebar';

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
          <main className="flex-1 p-6 w-full">{children}</main>
          <AppLayoutFooter />
        </div>
      </SidebarInset>
    </div>
  );
}
