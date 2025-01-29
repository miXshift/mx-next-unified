"use client";

import { cn } from "@/lib/utils/styling";
import {
  LayoutDashboard,
  BarChart,
  Users,
  FileText,
  Settings,
  HelpCircle,
  ChevronDown,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@components/button";
import Logo from "@components/logo";
import { ThemeSwitcher } from "@components/theme-switcher";
import { Sheet, SheetTrigger, SheetContent } from "@components/sheet";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "#" },
  { name: "Analytics", icon: BarChart, href: "#" },
  { name: "Customers", icon: Users, href: "#" },
  { name: "Documents", icon: FileText, href: "#" },
  { name: "Settings", icon: Settings, href: "#" },
  { name: "Help", icon: HelpCircle, href: "#" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:flex flex-col border-r bg-card transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {isSidebarOpen ? (
            <Logo />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10" />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <ChevronDown className="rotate-90" />
            ) : (
              <ChevronDown className="-rotate-90" />
            )}
          </Button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    !isSidebarOpen && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {isSidebarOpen && <span className="ml-3">{item.name}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <div className="lg:hidden">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent side="left" className="w-64 p-0">
          <div className="h-16 flex items-center px-4 border-b">
            <Logo />
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto">
                <X className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Button variant="ghost" className="w-full justify-start">
                    <item.icon className="h-5 w-5" />
                    <span className="ml-3">{item.name}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>

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
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <ThemeSwitcher />
              <Button variant="ghost" size="sm" className="gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10" />
                <span>John Doe</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>

        <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
          © 2024 Platform, Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
