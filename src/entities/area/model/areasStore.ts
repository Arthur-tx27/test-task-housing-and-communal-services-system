import { types } from 'mobx-state-tree';
import { AreaModel } from './area';
import type { AreaDTO } from './types';
import { fetchAreasByIds } from '../api/areasApi';
import { ERROR_LOAD_AREAS } from '@/shared/constants/api';

export const AreasStore = types
  .model('AreasStore', {
    areasMap: types.map(AreaModel),
    isLoading: false,
    error: types.maybeNull(types.string),
  })
  .actions((self) => ({
    setLoading(v: boolean) {
      self.isLoading = v;
    },
    setError(e: string | null) {
      self.error = e;
    },
    setAreas(areas: AreaDTO[]) {
      areas.forEach((area) => {
        self.areasMap.set(area.id, AreaModel.create(area));
      });
    },
  }))
  .actions((self) => ({
    async fetchAreas(ids: string[]) {
      if (ids.length === 0) return;

      const unknownIds = ids.filter((id) => !self.areasMap.has(id));
      if (unknownIds.length === 0) return;

      self.setLoading(true);
      self.setError(null);

      try {
        const areas = await fetchAreasByIds(unknownIds);
        self.setAreas(areas);
      } catch (err) {
        self.setError(
          err instanceof Error ? err.message : ERROR_LOAD_AREAS
        );
      } finally {
        self.setLoading(false);
      }
    },

    clear() {
      self.areasMap.clear();
      self.error = null;
      self.isLoading = false;
    },
  }));
