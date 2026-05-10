import { renderWithProviders, createTestStore } from '@/shared/lib/test/renderWithProviders';
import { MetersListPage } from '@/pages/meters-list/ui/MetersListPage';
import { createTestMeter, createTestArea } from '@/shared/lib/test/fixtures';

describe('Интеграционный тест', () => {
  it('полный сценарий: загрузка данных → отображение таблицы', () => {
    const store = createTestStore();

    store.metersStore.totalCount = 3;
    store.metersStore.offset = 0;

    store.metersStore.meters.push(
      createTestMeter({
        id: '1',
        _type: 'ColdWaterAreaMeter',
        installation_date: '2024-01-15',
        is_automatic: true,
        initial_values: [100],
        description: 'метр 1',
        areaId: 'a1',
      }),
      createTestMeter({
        id: '2',
        _type: 'HotWaterAreaMeter',
        installation_date: '2024-03-20',
        is_automatic: false,
        initial_values: [200],
        description: 'метр 2',
        areaId: 'a2',
      }),
      createTestMeter({
        id: '3',
        _type: 'ColdWaterAreaMeter',
        installation_date: '2024-06-10',
        is_automatic: true,
        initial_values: [300],
        description: 'метр 3',
        areaId: 'a1',
      })
    );

    store.areasStore.areasMap.set(
      'a1',
      createTestArea({
        id: 'a1',
        str_number_full: 'кв. 10',
        house: {
          address: 'пр. Ленина, 1',
          id: 'house-a1',
          fias_addrobjs: [],
        },
      })
    );
    store.areasStore.areasMap.set(
      'a2',
      createTestArea({
        id: 'a2',
        number: 2,
        str_number: '2',
        str_number_full: 'кв. 20',
        house: {
          address: 'пр. Ленина, 2',
          id: 'house-a2',
          fias_addrobjs: [],
        },
      })
    );

    const { container } = renderWithProviders(<MetersListPage />, { store });

    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);

    const cells = rows[0].querySelectorAll('td');
    expect(cells[0].textContent).toBe('1');
    expect(cells[1].textContent).toContain('ХВС');
    expect(cells[3].textContent).toBe('Да');
    expect(cells[4].textContent).toBe('100');
    expect(cells[5].textContent).toContain('пр. Ленина, 1, кв. 10');
  });
});
