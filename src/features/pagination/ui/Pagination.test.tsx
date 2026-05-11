import { renderWithProviders, createTestStore } from '@/shared/lib/test/renderWithProviders';
import { Pagination } from './Pagination';
import { screen, fireEvent } from '@testing-library/react';

describe('Pagination', () => {
  it('не рендерится если страниц <= 1', () => {
    const store = createTestStore();
    store.metersStore.totalCount = 10;

    const { container } = renderWithProviders(<Pagination />, { store });
    expect(container.innerHTML).toBe('');
  });

  it('рендерит кнопки страниц', () => {
    const store = createTestStore();
    store.metersStore.totalCount = 100;
    store.metersStore.offset = 0;

    renderWithProviders(<Pagination />, { store });

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('активная кнопка — первая при offset=0', () => {
    const store = createTestStore();
    store.metersStore.totalCount = 100;
    store.metersStore.offset = 0;

    renderWithProviders(<Pagination />, { store });

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('1');
    expect(buttons[0]).not.toBeDisabled();
  });

  it('клик по кнопке меняет offset и вызывает loadMetersWithAddresses', () => {
    const store = createTestStore();
    store.metersStore.totalCount = 100;
    store.metersStore.offset = 0;

    const loadSpy = jest.spyOn(store, 'loadMetersWithAddresses');

    renderWithProviders(<Pagination />, { store });

    fireEvent.click(screen.getByText('2'));

    expect(store.metersStore.offset).toBe(20);
    expect(loadSpy).toHaveBeenCalled();
  });

  it('disabled при isLoading', () => {
    const store = createTestStore();
    store.metersStore.totalCount = 100;
    store.metersStore.isLoading = true;

    renderWithProviders(<Pagination />, { store });

    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});
