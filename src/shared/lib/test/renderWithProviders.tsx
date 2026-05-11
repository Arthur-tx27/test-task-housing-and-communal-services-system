/* eslint-disable react-refresh/only-export-components */
import { type ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { StoreContext } from '@/app/providers/storeContext';
import { RootStore } from '@/entities/root/model/rootStore';
import { theme } from '@/app/styles/theme';
import { unprotect, type Instance } from 'mobx-state-tree';

interface WrapperProps {
  store?: Instance<typeof RootStore>;
}

export function createTestStore() {
  const store = RootStore.create();
  unprotect(store);
  return store;
}

function AllTheProviders({ children, store }: { children: ReactNode } & WrapperProps) {
  const testStore = store ?? createTestStore();

  return (
    <ThemeProvider theme={theme}>
      <StoreContext.Provider value={testStore}>
        {children}
      </StoreContext.Provider>
    </ThemeProvider>
  );
}

export function renderWithProviders(
  ui: ReactNode,
  options?: Omit<RenderOptions, 'wrapper'> & WrapperProps
) {
  const { store, ...renderOptions } = options ?? {};

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders store={store}>{children}</AllTheProviders>
    ),
    ...renderOptions,
  });
}
