import { renderWithProviders, createTestStore } from '@/shared/lib/test/renderWithProviders';
import { DeleteButton } from './DeleteButton';
import { screen, fireEvent } from '@testing-library/react';

describe('DeleteButton', () => {
  it('при клике вызывает deleteMeter в сторе', () => {
    const store = createTestStore();
    const deleteSpy = jest.spyOn(store, 'deleteMeter');

    renderWithProviders(<DeleteButton meterId="123" />, { store });

    const button = screen.getByRole('button', { hidden: true });
    fireEvent.click(button);

    expect(deleteSpy).toHaveBeenCalledWith('123');
  });

  it('disabled при isLoading=true', () => {
    const store = createTestStore();
    store.metersStore.isLoading = true;

    renderWithProviders(<DeleteButton meterId="123" />, { store });

    const button = screen.getByRole('button', { hidden: true });
    expect(button).toBeDisabled();
  });
});
