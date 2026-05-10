import { renderWithProviders, createTestStore } from '@/shared/lib/test/renderWithProviders';
import { MetersTable } from './MetersTable';
import { createTestMeter, createTestArea } from '@/shared/lib/test/fixtures';

describe('MetersTable снапшот', () => {
  it('отрисовывает таблицу с тестовыми данными', () => {
    const store = createTestStore();
    store.metersStore.totalCount = 2;
    store.metersStore.meters.push(
      createTestMeter({
        id: '1',
        _type: 'ColdWaterAreaMeter',
        installation_date: '2024-05-10',
        is_automatic: true,
        initial_values: [100],
        description: '',
        areaId: 'a1',
      })
    );
    store.areasStore.areasMap.set(
      'a1',
      createTestArea({
        id: 'a1',
        str_number_full: 'кв. 12',
        house: {
          address: 'ул. Мира, 5',
          id: 'house-a1',
          fias_addrobjs: [],
        },
      })
    );

    const { asFragment } = renderWithProviders(<MetersTable />, { store });
    expect(asFragment()).toMatchSnapshot();
  });
});
