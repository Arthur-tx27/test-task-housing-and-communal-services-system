import { types } from 'mobx-state-tree';
import { runInAction } from 'mobx';
import { MeterModel } from './meter';
import { fetchMeters, deleteMeter } from '../api/metersApi';

interface MeterApiItem {
  id: string;
  _type: string;
  installation_date: string;
  is_automatic: boolean;
  initial_values: number[];
  description: string;
  area: { id: string };
}

export const MetersStore = types
  .model('MetersStore', {
    meters: types.array(MeterModel),
    isLoading: false,
    offset: 0,
    error: types.maybeNull(types.string),
  })
  .actions((self) => {
    function createMeterFromDto(dto: MeterApiItem) {
      return MeterModel.create({
        id: dto.id,
        _type: dto._type,
        installation_date: dto.installation_date,
        is_automatic: dto.is_automatic,
        initial_values: dto.initial_values,
        description: dto.description ?? '',
        areaId: dto.area.id,
      });
    }

    return {
      async loadMeters() {
        self.isLoading = true;
        self.error = null;

        try {
          const response = await fetchMeters(20, self.offset);
          runInAction(() => {
            self.meters.clear();
            response.results.forEach((dto) => {
              self.meters.push(createMeterFromDto(dto));
            });
          });
        } catch (err) {
          runInAction(() => {
            self.error =
              err instanceof Error
                ? err.message
                : 'Ошибка загрузки данных';
          });
        } finally {
          runInAction(() => {
            self.isLoading = false;
          });
        }
      },

      async removeMeter(id: string) {
        self.isLoading = true;
        self.error = null;

        try {
          await deleteMeter(id);

          const response = await fetchMeters(
            1,
            self.offset + self.meters.length
          );

          runInAction(() => {
            const index = self.meters.findIndex((m) => m.id === id);
            if (index !== -1) {
              self.meters.splice(index, 1);
            }

            response.results.forEach((dto) => {
              self.meters.push(createMeterFromDto(dto));
            });
          });
        } catch (err) {
          runInAction(() => {
            self.error =
              err instanceof Error
                ? err.message
                : 'Ошибка удаления счётчика';
          });
        } finally {
          runInAction(() => {
            self.isLoading = false;
          });
        }
      },

      loadNextPage() {
        self.offset += 20;
      },

      loadPrevPage() {
        self.offset = Math.max(0, self.offset - 20);
      },

      clear() {
        self.meters.clear();
        self.offset = 0;
        self.error = null;
        self.isLoading = false;
      },
    };
  });
