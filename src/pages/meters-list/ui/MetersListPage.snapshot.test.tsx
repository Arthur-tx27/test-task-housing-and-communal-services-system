import { renderWithProviders, createTestStore } from '@/shared/lib/test/renderWithProviders';
import { MetersTable } from '@/widgets/meters-table/ui/MetersTable';
import { MetersListPage } from '@/pages/meters-list/ui/MetersListPage';
import { MeterModel } from '@/entities/meter/model/meter';
import { AreaModel } from '@/entities/area/model/area';

describe('Снапшот-тесты', () => {
  it('снапшот MetersTable с тестовыми данными', () => {
    const store = createTestStore();
    store.metersStore.totalCount = 2;
    store.metersStore.meters.push(
      MeterModel.create({
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
      AreaModel.create({
        id: 'a1',
        number: 1,
        str_number: '1',
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

  it('снапшот MetersListPage с мок-стором', () => {
    const store = createTestStore();
    store.metersStore.meters.push(
      MeterModel.create({
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
      AreaModel.create({
        id: 'a1',
        number: 1,
        str_number: '1',
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
