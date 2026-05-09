jest.mock('@/entities/meter/api/metersApi', () => ({
  fetchMeters: jest.fn(),
  deleteMeter: jest.fn(),
}));

jest.mock('@/entities/area/api/areasApi', () => ({
  fetchAreasByIds: jest.fn(),
  clearCache: jest.fn(),
}));

import { unprotect } from 'mobx-state-tree';
import { RootStore } from './rootStore';
import { fetchMeters } from '@/entities/meter/api/metersApi';
import { fetchAreasByIds } from '@/entities/area/api/areasApi';
import type { MeterDTO } from '@/entities/meter/model/types';
import type { AreaDTO } from '@/entities/area/model/types';

function buildMeterDto(id: string, areaId: string): MeterDTO {
  return {
    id,
    _type: 'ColdWaterAreaMeter',
    installation_date: '2024-01-15',
    is_automatic: false,
    initial_values: [100],
    description: `метр №${id}`,
    area: { id: areaId },
  };
}

function buildAreaDto(id: string): AreaDTO {
  return {
    id,
    house: `ул. Ленина, ${id}`,
    str_number_full: `ул. Ленина, ${id}`,
    apartment: '42',
  };
}

function createStore() {
  const store = RootStore.create();
  unprotect(store);
  return store;
}

describe('RootStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadMetersWithAddresses', () => {
    it('загружает метры и адреса к ним', async () => {
      const meters = [
        buildMeterDto('1', 'area-1'),
        buildMeterDto('2', 'area-2'),
      ];
      const areas = [buildAreaDto('area-1'), buildAreaDto('area-2')];

      (fetchMeters as jest.Mock).mockResolvedValue({
        count: 2,
        next: null,
        previous: null,
        results: meters,
      });

      (fetchAreasByIds as jest.Mock).mockResolvedValue(areas);

      const store = createStore();
      await store.loadMetersWithAddresses();

      expect(store.metersStore.meters.length).toBe(2);
      expect(store.metersStore.totalCount).toBe(2);
      expect(store.areasStore.areasMap.size).toBe(2);
    });

    it('не запрашивает адреса, если нет метров', async () => {
      (fetchMeters as jest.Mock).mockResolvedValue({
        count: 0,
        results: [],
      });

      const store = createStore();
      await store.loadMetersWithAddresses();

      expect(fetchAreasByIds).not.toHaveBeenCalled();
    });

    it('дедуплицирует id адресов', async () => {
      const meters = [
        buildMeterDto('1', 'area-1'),
        buildMeterDto('2', 'area-1'),
      ];
      const areas = [buildAreaDto('area-1')];

      (fetchMeters as jest.Mock).mockResolvedValue({
        count: 2,
        results: meters,
      });
      (fetchAreasByIds as jest.Mock).mockResolvedValue(areas);

      const store = createStore();
      await store.loadMetersWithAddresses();

      expect(fetchAreasByIds).toHaveBeenCalledWith(['area-1']);
    });
  });

  describe('deleteMeter', () => {
    it('удаляет метр и обновляет адреса', async () => {
      const meters = [buildMeterDto('1', 'area-1')];
      (fetchMeters as jest.Mock)
        .mockResolvedValueOnce({ count: 1, results: meters })
        .mockResolvedValueOnce({ count: 0, results: [] });

      (fetchAreasByIds as jest.Mock).mockResolvedValue([]);

      const store = createStore();
      await store.loadMetersWithAddresses();
      await store.deleteMeter('1');

      expect(store.metersStore.meters.length).toBe(0);
    });
  });

  describe('пагинация', () => {
    it('loadNextPage делегирует в metersStore', () => {
      const store = createStore();
      store.loadNextPage();
      expect(store.metersStore.offset).toBe(20);
    });

    it('loadPrevPage делегирует в metersStore', () => {
      const store = createStore();
      store.metersStore.loadNextPage();
      store.loadPrevPage();
      expect(store.metersStore.offset).toBe(0);
    });
  });
});
