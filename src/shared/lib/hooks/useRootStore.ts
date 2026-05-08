import { useContext } from 'react';
import { StoreContext } from '@/app/providers/storeContext';

export function useRootStore() {
  return useContext(StoreContext);
}
