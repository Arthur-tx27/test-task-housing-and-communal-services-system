import styled, { css } from 'styled-components';
import { DELETE_BUTTON_CLASS } from '@/shared/constants/cssClasses';

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

export const ScrollContainer = styled.div`
  overflow: auto;
  min-height: 0;
  flex: 1;
`;

export const StyledThead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 2;
  `;

export const Th = styled.th<{ $width?: string }>`
  height: 32px;
  width: ${({ $width }) => $width || 'auto'};
  padding: 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  font-weight: ${({ theme }) => theme.fonts.weightMedium};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surfaceHeader};
  text-align: left;
  white-space: nowrap;
  vertical-align: middle;

`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const BottomBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  height: 48px;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

export const Tr = styled.tr<{ $disabled?: boolean }>`
  height: ${({ theme }) => theme.table.rowHeight};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;


  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }

  &:hover .${DELETE_BUTTON_CLASS} {
    opacity: 1;
    visibility: visible;
  }

  ${({ $disabled, theme }) =>
    $disabled &&
    css`
      color: ${theme.colors.textDisabled};
      cursor: default;
      pointer-events: none;

      ${Td}, ${TypeCell}, ${TypeContent}, ${ActionsCell} {
        color: ${theme.colors.textDisabled};
      }

      ${TypeIcon} {
        opacity: 0.4;
      }

      &:hover {
        background: ${theme.colors.surface};
      }
    `}
`;

export const Td = styled.td<{ $width?: string, $muted?: boolean }>`
  height: ${({ theme }) => theme.table.rowHeight};
  width: ${({ $width }) => $width || 'auto'};
  padding: 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  font-weight: ${({ theme }) => theme.fonts.weightRegular};
  color: ${({ theme, $muted }) => $muted ? theme.colors.textMuted : theme.colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  vertical-align: middle;
`;

export const TypeCell = styled(Td)``;

export const TypeContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TypeIcon = styled.img`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

export const ActionsCell = styled(Td)`
  text-align: center;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;
