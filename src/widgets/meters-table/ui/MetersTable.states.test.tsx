import {
  renderWithProviders,
  createTestStore,
} from '@/shared/lib/test/renderWithProviders';
import { MetersTable } from '@/widgets/meters-table/ui/MetersTable';
import { screen } from '@testing-library/react';

describe('Состояния MetersTable', () => {
  it('рендерит Loader при isLoading и пустом списке', () => {
    const store = createTestStore();
    store.metersStore.isLoading = true;
    store.metersStore.meters.clear();

    const { getByTestId } = renderWithProviders(<MetersTable />, { store });

    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('рендерит ErrorMessage при ошибке', () => {
    const store = createTestStore();
    store.metersStore.error = 'Сетевая ошибка';
    store.metersStore.meters.clear();

    renderWithProviders(<MetersTable />, { store });

    expect(screen.getByText('Сетевая ошибка')).toBeInTheDocument();
  });

  it('рендерит EmptyState при пустом списке без загрузки', () => {
    const store = createTestStore();
    store.metersStore.error = null;
    store.metersStore.isLoading = false;
    store.metersStore.meters.clear();

    renderWithProviders(<MetersTable />, { store });

    expect(screen.getByText('Нет данных')).toBeInTheDocument();
  });
});
