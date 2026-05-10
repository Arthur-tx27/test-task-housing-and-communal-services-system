jest.mock('@/entities/meter/api/metersApi', () => ({
  fetchMeters: jest.fn(),
  deleteMeter: jest.fn(),
}));

import { unprotect } from 'mobx-state-tree';
import { MetersStore } from './metersStore';
import { fetchMeters, deleteMeter } from '../api/metersApi';

interface MeterApiItem {
  id: string;
  _type: string[];
  installation_date: string;
  is_automatic: boolean | null;
  initial_values: number[];
  description: string;
  area: { id: string };
}

function buildMetersDto(count: number, offset = 0): MeterApiItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: String(offset + i + 1),
    _type: i % 2 === 0 ? ['ColdWaterAreaMeter', 'AreaMeter'] : ['HotWaterAreaMeter', 'AreaMeter'],
    installation_date: `2024-01-${String(i + 1).padStart(2, '0')}`,
    is_automatic: i % 3 === 0,
    initial_values: [100 + i],
    description: `метр №${offset + i + 1}`,
    area: { id: `area-${i + 1}` },
  }));
}

function createStore() {
  const store = MetersStore.create();
  unprotect(store);
  return store;
}

describe('MetersStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadMeters', () => {
    it('загружает 20 элементов и устанавливает totalCount', async () => {
      const items = buildMetersDto(20);
      (fetchMeters as jest.Mock).mockResolvedValue({
        count: 45,
        next: null,
        previous: null,
        results: items,
      });

      const store = createStore();
      await store.loadMeters();

      expect(store.meters.length).toBe(20);
      expect(store.totalCount).toBe(45);
      expect(store.isLoading).toBe(false);
      expect(store.error).toBeNull();
    });

    it('устанавливает offset-параметр при запросе', async () => {
      (fetchMeters as jest.Mock).mockResolvedValue({
        count: 0,
        results: [],
      });

      const store = MetersStore.create({ offset: 20 });
      unprotect(store);
      await store.loadMeters();

      expect(fetchMeters).toHaveBeenCalledWith(20, 20);
    });

    it('устанавливает ошибку при сбое запроса', async () => {
      (fetchMeters as jest.Mock).mockRejectedValue(
        new Error('Network error')
      );

      const store = createStore();
      await store.loadMeters();

      expect(store.error).toBe('Network error');
      expect(store.isLoading).toBe(false);
    });
  });

  describe('deleteMeter', () => {
    it('удаляет метр и дозагружает один, сохраняя 20 элементов', async () => {
      const items = buildMetersDto(20);
      (fetchMeters as jest.Mock)
        .mockResolvedValueOnce({ count: 45, results: items })
        .mockResolvedValueOnce({
          count: 45,
          results: [
            {
              id: '21',
              _type: ['ColdWaterAreaMeter', 'AreaMeter'],
              installation_date: '2024-01-21',
              is_automatic: false,
              initial_values: [120],
              description: 'метр №21',
              area: { id: 'area-21' },
            },
          ],
        });

      (deleteMeter as jest.Mock).mockResolvedValue(undefined);

      const store = createStore();
      await store.loadMeters();
      expect(store.meters.length).toBe(20);

      await store.removeMeter('1');

      expect(deleteMeter).toHaveBeenCalledWith('1');
      expect(fetchMeters).toHaveBeenCalledWith(1, 19);
      expect(store.meters.length).toBe(20);
      expect(store.meters.find((m) => m.id === '1')).toBeUndefined();
      expect(store.meters.find((m) => m.id === '21')).toBeDefined();
    });

    it('устанавливает ошибку при сбое удаления', async () => {
      const items = buildMetersDto(20);
      (fetchMeters as jest.Mock).mockResolvedValue({
        count: 45,
        results: items,
      });
      (deleteMeter as jest.Mock).mockRejectedValue(
        new Error('Delete failed')
      );

      const store = createStore();
      await store.loadMeters();
      await store.removeMeter('1');

      expect(store.error).toBe('Delete failed');
    });
  });

  describe('пагинация', () => {
    it('loadNextPage увеличивает offset на 20', () => {
      const store = createStore();
      store.loadNextPage();
      expect(store.offset).toBe(20);
    });

    it('loadPrevPage уменьшает offset на 20', () => {
      const store = MetersStore.create({ offset: 40 });
      unprotect(store);
      store.loadPrevPage();
      expect(store.offset).toBe(20);
    });

    it('loadPrevPage не уходит ниже 0', () => {
      const store = MetersStore.create({ offset: 10 });
      unprotect(store);
      store.loadPrevPage();
      expect(store.offset).toBe(0);
    });
  });

  describe('clear', () => {
    it('сбрасывает все поля в начальное состояние', async () => {
      const items = buildMetersDto(20);
      (fetchMeters as jest.Mock).mockResolvedValue({
        count: 45,
        results: items,
      });

      const store = createStore();
      await store.loadMeters();
      store.clear();

      expect(store.meters.length).toBe(0);
      expect(store.offset).toBe(0);
      expect(store.totalCount).toBe(0);
      expect(store.error).toBeNull();
      expect(store.isLoading).toBe(false);
    });
  });
});
