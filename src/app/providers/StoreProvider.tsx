import { type ReactNode } from 'react';
import { StoreContext, rootStore } from './storeContext';

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  );
}
