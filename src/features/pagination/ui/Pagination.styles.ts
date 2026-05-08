import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.surface : theme.colors.textDark};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.textPrimary : theme.colors.surface};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.textPrimary : theme.colors.borderInput};
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.textSecondary};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const Ellipsis = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  color: ${({ theme }) => theme.colors.textMuted};
`;
