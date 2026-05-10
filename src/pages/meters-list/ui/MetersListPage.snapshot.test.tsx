import { renderWithProviders, createTestStore } from '@/shared/lib/test/renderWithProviders';
import { MetersListPage } from '@/pages/meters-list/ui/MetersListPage';
import { createTestMeter, createTestArea } from '@/shared/lib/test/fixtures';

describe('MetersListPage снапшот', () => {
  it('отрисовывает страницу с мок-стором', () => {
    const store = createTestStore();
    store.metersStore.meters.push(
      createTestMeter({
        id: '1',
        _type: 'ColdWaterAreaMeter',
        installation_date: '2024-01-01',
        is_automatic: false,
        initial_values: [0],
        description: '',
        areaId: 'a1',
      })
    );
    store.areasStore.areasMap.set(
      'a1',
      createTestArea({
        id: 'a1',
        str_number_full: 'кв. 1',
        house: {
          address: 'ул. Тестовая, 1',
          id: 'house-a1',
          fias_addrobjs: [],
        },
      })
    );
    store.metersStore.totalCount = 1;

    const { asFragment } = renderWithProviders(<MetersListPage />, { store });
    expect(asFragment()).toMatchSnapshot();
  });
});
