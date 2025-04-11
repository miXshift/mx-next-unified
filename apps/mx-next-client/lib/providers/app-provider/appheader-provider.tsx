// context/AppHeaderContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface AppHeaderContextType {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  customHeader: ReactNode;
  setTitle: (title: string) => void;
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
  setCustomHeader: (header: ReactNode) => void;
}

const AppHeaderContext = createContext<AppHeaderContextType | undefined>(
  undefined
);

export const AppHeaderProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState<string>('');
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [customHeader, setCustomHeader] = useState<ReactNode>(null);

  return (
    <AppHeaderContext.Provider
      value={{
        title,
        breadcrumbs,
        customHeader,
        setTitle,
        setBreadcrumbs,
        setCustomHeader,
      }}
    >
      {children}
    </AppHeaderContext.Provider>
  );
};

export const useAppHeader = () => {
  const context = useContext(AppHeaderContext);
  if (!context) {
    throw new Error('useAppHeader must be used within an AppHeaderProvider');
  }
  return context;
};
