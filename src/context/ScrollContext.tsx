import React, { createContext, useContext, useState, ReactNode } from 'react';

type ScrollContextData = {
  isNavbarVisible: boolean;
  setIsNavbarVisible: (visible: boolean) => void;
};

const ScrollContext = createContext<ScrollContextData>({} as ScrollContextData);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  return (
    <ScrollContext.Provider value={{ isNavbarVisible, setIsNavbarVisible }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
}
