'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ThemeSwitcher } from '@components/theme-switcher';
import { Button } from '@components/button';
import { Logo } from '@components/logo';
import { logger } from '@utils/logger';
import {
  Building2,
  Sparkles,
  LayoutDashboard,
  FileBarChart,
  ChevronDown,
  Menu,
  X,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@components/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/dropdown-menu';
import { cn } from '@utils/styling';
import Icon from '@/lib/ui/icon';

const navigation = [
  { name: 'Organization', icon: Building2, href: '/organization' },
  { name: 'Spotlight', icon: Sparkles, href: '/spotlight' },
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Reports Center', icon: FileBarChart, href: '/reports' },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    logger.component('Dashboard layout mounted', 'DashboardLayout');
    return () => {
      logger.component('Dashboard layout unmounted', 'DashboardLayout');
    };
  }, []);

  const toggleSidebar = () => {
    logger.component(
      `Sidebar ${isSidebarOpen ? 'closed' : 'opened'}`,
      'DashboardLayout'
    );
    setIsSidebarOpen(!isSidebarOpen);
  };

  const currentPage =
    navigation.find(item => pathname.startsWith(item.href))?.name ||
    'Dashboard';

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          'hidden lg:flex flex-col border-r sidebar-bg transition-all duration-300',
          isSidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {isSidebarOpen ? (
            <Logo />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10">
              <Icon />
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isSidebarOpen ? (
              <ChevronDown className="rotate-90" />
            ) : (
              <ChevronDown className="-rotate-90" />
            )}
          </Button>
        </div>

        <div className="flex-1 flex flex-col justify-between py-4">
          <nav className="px-4">
            <ul className="space-y-2">
              {navigation.map(item => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          'w-full justify-start hover:sidebar-hover',
                          !isSidebarOpen && 'justify-center px-2',
                          isActive && 'sidebar-active'
                        )}
                        onClick={() =>
                          logger.action('Navigation clicked', item.name)
                        }
                      >
                        <item.icon className="h-5 w-5" />
                        {isSidebarOpen && (
                          <span className="ml-3">{item.name}</span>
                        )}
                      </Button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-4 space-y-2">
            <ThemeSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start hover:sidebar-hover',
                    !isSidebarOpen && 'justify-center px-2'
                  )}
                >
                  <User className="h-5 w-5" />
                  {isSidebarOpen && <span className="ml-3">John Doe</span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-card">
          <div className="h-full px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              <h1 className="text-lg font-semibold">{currentPage}</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>

        <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground footer-bg">
          © 2024 Platform, Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
