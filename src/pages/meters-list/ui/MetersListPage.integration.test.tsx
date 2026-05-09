import { renderWithProviders, createTestStore } from '@/shared/lib/test/renderWithProviders';
import { MetersListPage } from '@/pages/meters-list/ui/MetersListPage';
import { MeterModel } from '@/entities/meter/model/meter';
import { AreaModel } from '@/entities/area/model/area';

describe('Интеграционный тест', () => {
  it('полный сценарий: загрузка данных → отображение таблицы', () => {
    const store = createTestStore();

    store.metersStore.totalCount = 3;
    store.metersStore.offset = 0;

    store.metersStore.meters.push(
      MeterModel.create({
        id: '1',
        _type: 'ColdWaterAreaMeter',
        installation_date: '2024-01-15',
        is_automatic: true,
        initial_values: [100],
        description: 'метр 1',
        areaId: 'a1',
      }),
      MeterModel.create({
        id: '2',
        _type: 'HotWaterAreaMeter',
        installation_date: '2024-03-20',
        is_automatic: false,
        initial_values: [200],
        description: 'метр 2',
        areaId: 'a2',
      }),
      MeterModel.create({
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
      AreaModel.create({
        id: 'a1',
        house: 'пр. Ленина, 1',
        str_number_full: 'пр. Ленина, 1',
        apartment: '10',
      })
    );
    store.areasStore.areasMap.set(
      'a2',
      AreaModel.create({
        id: 'a2',
        house: 'пр. Ленина, 2',
        str_number_full: 'пр. Ленина, 2',
        apartment: '20',
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
