import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
`;

const Icon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surfaceHeader};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizeMd};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export function EmptyState() {
  return (
    <Container>
      <Icon>—</Icon>
      <Message>Нет данных</Message>
    </Container>
  );
}
