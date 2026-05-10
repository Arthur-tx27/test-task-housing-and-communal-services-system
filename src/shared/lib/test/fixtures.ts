import { MeterModel } from '@/entities/meter/model/meter';
import { AreaModel } from '@/entities/area/model/area';
import type { MeterDTO } from '@/entities/meter/model/types';
import type { AreaDTO } from '@/entities/area/model/types';
import type { RootStore } from '@/entities/root/model/rootStore';
import type { Instance } from 'mobx-state-tree';
import type { SnapshotIn } from 'mobx-state-tree';

export function createTestMeter(
  overrides: Partial<SnapshotIn<typeof MeterModel>> = {}
) {
  return MeterModel.create({
    id: '1',
    _type: 'ColdWaterAreaMeter',
    installation_date: '2024-01-15',
    is_automatic: false,
    initial_values: [100],
    description: '',
    areaId: 'area-1',
    ...overrides,
  });
}

export function createTestArea(
  overrides: Partial<SnapshotIn<typeof AreaModel>> = {}
) {
  const id = overrides.id ?? 'area-1';
  return AreaModel.create({
    id: String(id),
    number: 1,
    str_number: '1',
    str_number_full: 'кв. 1',
    house: {
      address: 'ул. Ленина, 1',
      id: `house-${id}`,
      fias_addrobjs: [],
    },
    ...overrides,
  });
}

export function createMetersDto(
  count: number,
  offset = 0
): MeterDTO[] {
  return Array.from({ length: count }, (_, i) => ({
    id: String(offset + i + 1),
    _type:
      i % 2 === 0
        ? (['ColdWaterAreaMeter', 'AreaMeter'] as string[])
        : (['HotWaterAreaMeter', 'AreaMeter'] as string[]),
    installation_date: `2024-01-${String(i + 1).padStart(2, '0')}`,
    is_automatic: i % 3 === 0,
    initial_values: [100 + i],
    description: `метр №${offset + i + 1}`,
    area: { id: `area-${i + 1}` },
  }));
}

export function createSingleMeterDto(
  id: string,
  areaId: string
): MeterDTO {
  return {
    id,
    _type: ['ColdWaterAreaMeter', 'AreaMeter'],
    installation_date: '2024-01-15',
    is_automatic: false,
    initial_values: [100],
    description: `метр №${id}`,
    area: { id: areaId },
  };
}

export function createAreasDto(ids: string[]): AreaDTO[] {
  return ids.map((id) => ({
    id,
    number: 1,
    str_number: String(id.slice(-2)),
    str_number_full: `кв. ${id.slice(-2)}`,
    house: {
      address: `ул. Ленина, ${id.slice(-2)}`,
      id: `house-${id}`,
      fias_addrobjs: [],
    },
  }));
}

export function createSingleAreaDto(id: string): AreaDTO {
  return {
    id,
    number: 1,
    str_number: '1',
    str_number_full: 'кв. 42',
    house: {
      address: `ул. Ленина, ${id}`,
      id: `house-${id}`,
      fias_addrobjs: [],
    },
  };
}

export function populateTestStore(
  store: Instance<typeof RootStore>,
  count = 20
) {
  for (let i = 0; i < count; i++) {
    store.metersStore.meters.push(
      createTestMeter({
        id: String(i + 1),
        _type:
          i % 2 === 0 ? 'ColdWaterAreaMeter' : 'HotWaterAreaMeter',
        installation_date: `2024-01-${String(i + 1).padStart(2, '0')}`,
        is_automatic: i % 3 === 0,
        initial_values: [100 + i],
        description: `метр №${i + 1}`,
        areaId: `area-${(i % 5) + 1}`,
      })
    );
  }

  for (let j = 1; j <= 5; j++) {
    store.areasStore.areasMap.set(
      `area-${j}`,
      createTestArea({
        id: `area-${j}`,
        number: j,
        str_number: String(j),
        str_number_full: `кв. ${j}`,
        house: {
          address: `ул. Ленина, ${j}`,
          id: `house-${j}`,
          fias_addrobjs: [],
        },
      })
    );
  }

  store.metersStore.totalCount = 45;
  store.metersStore.offset = 0;
}
