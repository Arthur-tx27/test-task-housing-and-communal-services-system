import styled from 'styled-components';

export const TableWrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surfaceHeader};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  color: ${({ theme }) => theme.colors.textSecondary};

  & > span:first-child {
    padding-left: ${({ theme }) => theme.spacing.xl};
  }
`;

export const FilterLabel = styled.span<{ $width?: string }>`
  flex: ${({ $width }) => ($width ? 'none' : '1')};
  width: ${({ $width }) => $width || 'auto'};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ScrollContainer = styled.div`
  overflow-y: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const Thead = styled.thead`
  & > tr > th {
    position: sticky;
    top: 0;
    z-index: 2;
  }
`;

export const Th = styled.th<{ $width?: string }>`
  height: ${({ theme }) => theme.table.headerHeight};
  width: ${({ $width }) => $width || 'auto'};
  padding: 0 ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
  vertical-align: middle;

  &:first-child {
    padding-left: ${({ theme }) => theme.spacing.xl};
  }
`;

export const Tr = styled.tr`
  height: ${({ theme }) => theme.table.rowHeight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }

  &:nth-child(odd) {
    background: ${({ theme }) => theme.colors.surface};
  }

  &:hover .delete-button {
    opacity: 1;
    visibility: visible;
  }
`;

export const Td = styled.td<{ $width?: string }>`
  height: ${({ theme }) => theme.table.rowHeight};
  width: ${({ $width }) => $width || 'auto'};
  padding: 0 ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;

  &:first-child {
    padding-left: ${({ theme }) => theme.spacing.xl};
  }
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
  padding: 0 ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;
