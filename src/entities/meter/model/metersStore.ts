import { types } from 'mobx-state-tree';
import { MeterModel } from './meter';
import { fetchMeters, deleteMeter } from '../api/metersApi';
import type { MeterDTO } from './types';

export const MetersStore = types
  .model('MetersStore', {
    meters: types.array(MeterModel),
    isLoading: false,
    offset: 0,
    displayOffset: 0,
    totalCount: 0,
    error: types.maybeNull(types.string),
  })
  .actions((self) => {
    function createMeterFromDto(dto: MeterDTO) {
      return MeterModel.create({
        id: dto.id,
        _type: dto._type[0],
        installation_date: dto.installation_date,
        is_automatic: dto.is_automatic ?? false,
        initial_values: dto.initial_values,
        description: dto.description ?? '',
        areaId: dto.area.id,
      });
    }

    return {
      setLoading(v: boolean) {
        self.isLoading = v;
      },
      setError(e: string | null) {
        self.error = e;
      },
      setMeters(response: { count: number; results: MeterDTO[] }) {
        self.meters.clear();
        self.totalCount = response.count;
        self.displayOffset = self.offset;
        response.results.forEach((dto) => {
          self.meters.push(createMeterFromDto(dto));
        });
      },
      appendMeters(results: MeterDTO[]) {
        results.forEach((dto) => {
          self.meters.push(createMeterFromDto(dto));
        });
      },
      removeMeterById(id: string) {
        const index = self.meters.findIndex((m) => m.id === id);
        if (index !== -1) {
          self.meters.splice(index, 1);
        }
      },
    };
  })
  .actions((self) => ({
    async loadMeters() {
      self.setLoading(true);
      self.setError(null);

      try {
        const response = await fetchMeters(20, self.offset);
        self.setMeters(response);
      } catch (err) {
        self.setError(
          err instanceof Error
            ? err.message
            : 'Ошибка загрузки данных'
        );
      } finally {
        self.setLoading(false);
      }
    },

    async removeMeter(id: string) {
      self.setLoading(true);
      self.setError(null);

      try {
        await deleteMeter(id);

        const response = await fetchMeters(
          1,
          Math.max(0, self.offset + self.meters.length - 1)
        );

        self.removeMeterById(id);
        self.appendMeters(response.results);
      } catch (err) {
        self.setError(
          err instanceof Error
            ? err.message
            : 'Ошибка удаления счётчика'
        );
      } finally {
        self.setLoading(false);
      }
    },

    loadNextPage() {
      self.offset += 20;
    },

    loadPrevPage() {
      self.offset = Math.max(0, self.offset - 20);
    },

    setOffset(v: number) {
      self.offset = v;
    },

    clear() {
      self.meters.clear();
      self.offset = 0;
      self.displayOffset = 0;
      self.totalCount = 0;
      self.error = null;
      self.isLoading = false;
    },
  }));
