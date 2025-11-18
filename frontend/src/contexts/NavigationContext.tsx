import React, { createContext, useContext, ReactNode } from 'react';

type TabType =
  | 'home'
  | 'dashboard'
  | 'users'
  | 'patrimonio'
  | 'reports'
  | 'notifications'
  | 'cache'
  | 'filters'
  | 'analytics'
  | 'monitoring'
  | 'performance'
  | 'advanced'
  | 'production'
  | 'testing';

interface NavigationContextType {
  navigateTo: (tab: TabType) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export const NavigationProvider: React.FC<{
  children: ReactNode;
  navigateTo: (tab: TabType) => void;
}> = ({ children, navigateTo }) => {
  return (
    <NavigationContext.Provider value={{ navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

