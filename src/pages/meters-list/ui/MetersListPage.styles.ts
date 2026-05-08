import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1440px;
  margin: 0 auto;
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fonts.sizeXl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;
