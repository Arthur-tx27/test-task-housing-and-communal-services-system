import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export function Loader() {
  return (
    <Container data-testid="loader">
      <Spinner />
    </Container>
  );
}
