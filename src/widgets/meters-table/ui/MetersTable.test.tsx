import {
  renderWithProviders,
  createTestStore,
} from '@/shared/lib/test/renderWithProviders';
import { MetersTable } from './MetersTable';
import {
  createTestMeter,
  createTestArea,
  populateTestStore,
} from '@/shared/lib/test/fixtures';

describe('MetersTable', () => {
  it('рендерит 20 строк с данными', () => {
    const store = createTestStore();
    populateTestStore(store);
    const { container } = renderWithProviders(<MetersTable />, { store });

    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(20);
  });

  it('отображает ХВС для ColdWaterAreaMeter', () => {
    const store = createTestStore();
    populateTestStore(store);
    const { container } = renderWithProviders(<MetersTable />, { store });

    const cells = container.querySelectorAll('tbody tr td');
    expect(cells[1].textContent).toContain('ХВС');
  });

  it('отображает ГВС для HotWaterAreaMeter', () => {
    const store = createTestStore();
    store.metersStore.meters.push(
      createTestMeter({
        id: '999',
        _type: 'HotWaterAreaMeter',
        installation_date: '2024-05-15',
        initial_values: [200],
        areaId: 'area-1',
      })
    );
    store.areasStore.areasMap.set(
      'area-1',
      createTestArea({
        id: 'area-1',
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
      createTestMeter({
        id: '1',
        installation_date: '2024-12-31',
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
      createTestMeter({ id: '1', is_automatic: true, areaId: 'area-1' })
    );

    const { container } = renderWithProviders(<MetersTable />, { store });
    const cells = container.querySelectorAll('tbody tr td');
    expect(cells[3].textContent).toBe('Да');
  });

  it('отображает "Нет" для is_automatic=false', () => {
    const store = createTestStore();
    store.metersStore.meters.push(
      createTestMeter({ id: '1', is_automatic: false, areaId: 'area-1' })
    );

    const { container } = renderWithProviders(<MetersTable />, { store });
    const cells = container.querySelectorAll('tbody tr td');
    expect(cells[3].textContent).toBe('Нет');
  });

  it('отображает первый элемент initial_values', () => {
    const store = createTestStore();
    store.metersStore.meters.push(
      createTestMeter({
        id: '1',
        initial_values: [42, 43, 44],
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
      createTestMeter({ id: '1', areaId: 'area-77' })
    );
    store.areasStore.areasMap.set(
      'area-77',
      createTestArea({
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
