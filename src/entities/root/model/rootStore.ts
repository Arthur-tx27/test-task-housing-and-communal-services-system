import { types } from 'mobx-state-tree';
import { MetersStore } from '@/entities/meter/model/metersStore';
import { AreasStore } from '@/entities/area/model/areasStore';

export const RootStore = types
  .model('RootStore', {
    metersStore: types.optional(MetersStore, {}),
    areasStore: types.optional(AreasStore, {}),
  })
  .views((self) => ({
    get uniqueAreaIds() {
      return [...new Set(self.metersStore.meters.map((m) => m.areaId))];
    },
  }))
  .actions((self) => ({
    async loadMetersWithAddresses() {
      await self.metersStore.loadMeters();

      if (self.uniqueAreaIds.length > 0) {
        await self.areasStore.fetchAreas(self.uniqueAreaIds);
      }
    },

    async deleteMeter(id: string) {
      await self.metersStore.removeMeter(id);

      if (self.uniqueAreaIds.length > 0) {
        await self.areasStore.fetchAreas(self.uniqueAreaIds);
      }
    },

    loadNextPage() {
      self.metersStore.loadNextPage();
    },

    loadPrevPage() {
      self.metersStore.loadPrevPage();
    },
  }));
