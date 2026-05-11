import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg};
  margin: 0 auto;
  overflow: hidden;
`;

export const PageTitle = styled.h1`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.fonts.sizeXl};
  font-weight: ${({ theme }) => theme.fonts.weightMedium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;
