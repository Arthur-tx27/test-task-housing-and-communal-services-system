import {
  renderWithProviders,
  createTestStore,
} from '@/shared/lib/test/renderWithProviders';
import { MetersTable } from './MetersTable';
import type { Instance } from 'mobx-state-tree';
import type { RootStore } from '@/entities/root/model/rootStore';
import { MeterModel } from '@/entities/meter/model/meter';
import { AreaModel } from '@/entities/area/model/area';

function populateStore(store: Instance<typeof RootStore>, count = 20) {
  for (let i = 0; i < count; i++) {
    store.metersStore.meters.push(
      MeterModel.create({
        id: String(i + 1),
        _type: i % 2 === 0 ? 'ColdWaterAreaMeter' : 'HotWaterAreaMeter',
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
      AreaModel.create({
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

describe('MetersTable', () => {
  it('рендерит 20 строк с данными', () => {
    const store = createTestStore();
    populateStore(store);
    const { container } = renderWithProviders(<MetersTable />, { store });

    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(20);
  });

  it('отображает ХВС для ColdWaterAreaMeter', () => {
    const store = createTestStore();
    populateStore(store);
    const { container } = renderWithProviders(<MetersTable />, { store });

    const cells = container.querySelectorAll('tbody tr td');
    expect(cells[1].textContent).toContain('ХВС');
  });

  it('отображает ГВС для HotWaterAreaMeter', () => {
    const store = createTestStore();
    store.metersStore.meters.push(
      MeterModel.create({
        id: '999',
        _type: 'HotWaterAreaMeter',
        installation_date: '2024-05-15',
        is_automatic: false,
        initial_values: [200],
        description: '',
        areaId: 'area-1',
      })
    );
    store.areasStore.areasMap.set(
      'area-1',
      AreaModel.create({
        id: 'area-1',
        number: 1,
        str_number: '1',
        str_number_full: 'кв. 11',
        house: {
          address: 'ул. Ленина, 1',
          id: 'house-1',
          fias_addrobjs: [],
        },
      })
    );

    const { container } = renderWithProviders(<MetersTable />, { store });
    const cells = container.querySelectorAll('tbody tr td');
    expect(cells[1].textContent).toContain('ГВС');
  });

  it('форматирует дату в дд.мм.гггг', () => {
    const store = createTestStore();
    store.metersStore.meters.push(
      MeterModel.create({
        id: '1',
        _type: 'ColdWaterAreaMeter',
        installation_date: '2024-12-31',
        is_automatic: false,
        initial_values: [100],
        description: '',
        areaId: 'area-1',
      })
    );

    const { container } = renderWithProviders(<MetersTable />, { store });
    const cells = container.querySelectorAll('tbody tr td');
    expect(cells[2].textContent).toBe('31.12.2024');
  });

  it('отображает "Да" для is_automatic=true', () => {
    const store = createTestStore();
    store.metersStore.meters.push(
      MeterModel.create({
        id: '1',
        _type: 'ColdWaterAreaMeter',
        installation_date: '2024-01-15',
        is_automatic: true,
        initial_values: [100],
        description: '',
        areaId: 'area-1',
      })
    );

    const { container } = renderWithProviders(<MetersTable />, { store });
    const cells = container.querySelectorAll('tbody tr td');
    expect(cells[3].textContent).toBe('Да');
  });

  it('отображает "Нет" для is_automatic=false', () => {
    const store = createTestStore();
    store.metersStore.meters.push(
      MeterModel.create({
        id: '1',
        _type: 'ColdWaterAreaMeter',
        installation_date: '2024-01-15',
        is_automatic: false,
        initial_values: [100],
        description: '',
        areaId: 'area-1',
      })
    );

    const { container } = renderWithProviders(<MetersTable />, { store });
    const cells = container.querySelectorAll('tbody tr td');
    expect(cells[3].textContent).toBe('Нет');
  });

  it('отображает первый элемент initial_values', () => {
    const store = createTestStore();
    store.metersStore.meters.push(
      MeterModel.create({
        id: '1',
        _type: 'ColdWaterAreaMeter',
        installation_date: '2024-01-15',
        is_automatic: false,
        initial_values: [42, 43, 44],
        description: '',
        areaId: 'area-1',
      })
    );

    const { container } = renderWithProviders(<MetersTable />, { store });
    const cells = container.querySelectorAll('tbody tr td');
    expect(cells[4].textContent).toBe('42');
  });

  it('отображает адрес из areasMap', () => {
    const store = createTestStore();
    store.metersStore.meters.push(
      MeterModel.create({
        id: '1',
        _type: 'ColdWaterAreaMeter',
        installation_date: '2024-01-15',
        is_automatic: false,
        initial_values: [100],
        description: '',
        areaId: 'area-77',
      })
    );
    store.areasStore.areasMap.set(
      'area-77',
      AreaModel.create({
        id: 'area-77',
        number: 77,
        str_number: '77',
        str_number_full: 'кв. 99',
        house: {
          address: 'пр. Мира, 42',
          id: 'house-77',
          fias_addrobjs: [],
        },
      })
    );

    const { container } = renderWithProviders(<MetersTable />, { store });
    const cells = container.querySelectorAll('tbody tr td');
    expect(cells[5].textContent).toBe('пр. Мира, 42, кв. 99');
  });
});
