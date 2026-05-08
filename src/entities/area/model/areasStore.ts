import { types } from 'mobx-state-tree';
import { runInAction } from 'mobx';
import { AreaModel } from './area';
import { fetchAreasByIds } from '../api/areasApi';

export const AreasStore = types
  .model('AreasStore', {
    areasMap: types.map(AreaModel),
    isLoading: false,
    error: types.maybeNull(types.string),
  })
  .actions((self) => ({
    async fetchAreas(ids: string[]) {
      if (ids.length === 0) return;

      const unknownIds = ids.filter((id) => !self.areasMap.has(id));
      if (unknownIds.length === 0) return;

      self.isLoading = true;
      self.error = null;

      try {
        const areas = await fetchAreasByIds(unknownIds);
        runInAction(() => {
          areas.forEach(({ id, house, str_number_full, apartment }) => {
            self.areasMap.set(id, AreaModel.create({ id, house, str_number_full, apartment }));
          });
        });
      } catch (err) {
        runInAction(() => {
          self.error =
            err instanceof Error ? err.message : 'Ошибка загрузки адресов';
        });
      } finally {
        runInAction(() => {
          self.isLoading = false;
        });
      }
    },

    clear() {
      self.areasMap.clear();
      self.error = null;
      self.isLoading = false;
    },
  }));
