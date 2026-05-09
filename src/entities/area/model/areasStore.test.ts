jest.mock('@/entities/area/api/areasApi', () => ({
  fetchAreasByIds: jest.fn(),
  clearCache: jest.fn(),
}));

import { unprotect } from 'mobx-state-tree';
import { AreasStore } from './areasStore';
import { fetchAreasByIds } from '../api/areasApi';
import type { AreaDTO } from './types';

function buildAreas(ids: string[]): AreaDTO[] {
  return ids.map((id) => ({
    id,
    house: `ул. Ленина, ${id.slice(-2)}`,
    str_number_full: `ул. Ленина, ${id.slice(-2)}`,
    apartment: String(10 + Number(id.slice(-1))),
  }));
}

function createStore() {
  const store = AreasStore.create();
  unprotect(store);
  return store;
}

describe('AreasStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAreas', () => {
    it('загружает новые адреса по id', async () => {
      const ids = ['area-1', 'area-2'];
      const areas = buildAreas(ids);
      (fetchAreasByIds as jest.Mock).mockResolvedValue(areas);

      const store = createStore();
      await store.fetchAreas(ids);

      expect(store.areasMap.has('area-1')).toBe(true);
      expect(store.areasMap.has('area-2')).toBe(true);
    });

    it('не делает запрос если все id уже в кэше', async () => {
      const ids = ['area-1', 'area-2'];
      const areas = buildAreas(ids);
      (fetchAreasByIds as jest.Mock).mockResolvedValue(areas);

      const store = createStore();
      await store.fetchAreas(ids);
      expect(fetchAreasByIds).toHaveBeenCalledTimes(1);

      await store.fetchAreas(ids);
      expect(fetchAreasByIds).toHaveBeenCalledTimes(1);
    });

    it('запрашивает только неизвестные id', async () => {
      const areas1 = buildAreas(['area-1']);
      const areas2 = buildAreas(['area-2']);
      (fetchAreasByIds as jest.Mock)
        .mockResolvedValueOnce(areas1)
        .mockResolvedValueOnce(areas2);

      const store = createStore();
      await store.fetchAreas(['area-1']);
      await store.fetchAreas(['area-1', 'area-2']);

      const lastCallArgs = (fetchAreasByIds as jest.Mock).mock.calls[1][0];
      expect(lastCallArgs).toEqual(['area-2']);
    });

    it('загружает несколько id параллельно за один запрос', async () => {
      const ids = ['area-1', 'area-2', 'area-3'];
      const areas = buildAreas(ids);
      (fetchAreasByIds as jest.Mock).mockResolvedValue(areas);

      const store = createStore();
      await store.fetchAreas(ids);

      expect(fetchAreasByIds).toHaveBeenCalledTimes(1);
      expect(fetchAreasByIds).toHaveBeenCalledWith(ids);
      expect(store.areasMap.size).toBe(3);
    });

    it('не делает запрос при пустом массиве id', async () => {
      const store = createStore();
      await store.fetchAreas([]);

      expect(fetchAreasByIds).not.toHaveBeenCalled();
    });

    it('устанавливает ошибку при сбое запроса', async () => {
      (fetchAreasByIds as jest.Mock).mockRejectedValue(
        new Error('Area load error')
      );

      const store = createStore();
      await store.fetchAreas(['area-1']);

      expect(store.error).toBe('Area load error');
      expect(store.isLoading).toBe(false);
    });
  });

  describe('clear', () => {
    it('очищает карту адресов', async () => {
      const areas = buildAreas(['area-1']);
      (fetchAreasByIds as jest.Mock).mockResolvedValue(areas);

      const store = createStore();
      await store.fetchAreas(['area-1']);
      store.clear();

      expect(store.areasMap.size).toBe(0);
      expect(store.error).toBeNull();
      expect(store.isLoading).toBe(false);
    });
  });
});
