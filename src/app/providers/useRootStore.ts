import { useContext } from 'react';
import { StoreContext } from './storeContext';

export function useRootStore() {
  return useContext(StoreContext);
}
