import { types } from 'mobx-state-tree';
import { MetersStore } from '@/entities/meter/model/metersStore';
import { AreasStore } from '@/entities/area/model/areasStore';

export const RootStore = types
  .model('RootStore', {
    metersStore: types.optional(MetersStore, {}),
    areasStore: types.optional(AreasStore, {}),
  })
  .actions((self) => ({
    async loadMetersWithAddresses() {
      await self.metersStore.loadMeters();

      const areaIds = self.metersStore.meters.map((m) => m.areaId);
      const uniqueIds = [...new Set(areaIds)];

      if (uniqueIds.length > 0) {
        await self.areasStore.fetchAreas(uniqueIds);
      }
    },

    async deleteMeter(id: string) {
      await self.metersStore.removeMeter(id);

      const areaIds = self.metersStore.meters.map((m) => m.areaId);
      const uniqueIds = [...new Set(areaIds)];

      if (uniqueIds.length > 0) {
        await self.areasStore.fetchAreas(uniqueIds);
      }
    },

    loadNextPage() {
      self.metersStore.loadNextPage();
    },

    loadPrevPage() {
      self.metersStore.loadPrevPage();
    },
  }));
