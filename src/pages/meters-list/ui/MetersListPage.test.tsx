import { renderWithProviders, createTestStore } from '@/shared/lib/test/renderWithProviders';
import { MetersListPage } from './MetersListPage';
import { screen } from '@testing-library/react';

describe('MetersListPage', () => {
  it('отображает заголовок', () => {
    const store = createTestStore();
    renderWithProviders(<MetersListPage />, { store });

    expect(screen.getByText('Список счётчиков')).toBeInTheDocument();
  });

  it('вызывает loadMetersWithAddresses при монтировании', () => {
    const store = createTestStore();
    const spy = jest.spyOn(store, 'loadMetersWithAddresses');

    renderWithProviders(<MetersListPage />, { store });

    expect(spy).toHaveBeenCalled();
  });
});
