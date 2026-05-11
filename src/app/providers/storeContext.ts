import { createContext } from 'react';
import { type Instance } from 'mobx-state-tree';
import { RootStore } from '@/entities/root/model/rootStore';

export const rootStore = RootStore.create({});

export const StoreContext =
  createContext<Instance<typeof RootStore>>(rootStore);
