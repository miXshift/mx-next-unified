import { Button } from '@ui/button';
import { Sheet, SheetTrigger } from '@ui/sheet';
import { Menu } from 'lucide-react';
import React from 'react';

interface AppLayoutHeaderProps {
  title?: string;
  header?: React.ReactNode;
}

export default function AppLayoutHeader({
  title,
  header,
}: AppLayoutHeaderProps) {
  return (
    <header className="h-16 border-b bg-cards sticky top-0 z-10 bg-background shadow-sm">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </Sheet>
          {title && <h1 className="text-lg font-semibold">{title}</h1>}
          {header}
        </div>
      </div>
    </header>
  );
}
