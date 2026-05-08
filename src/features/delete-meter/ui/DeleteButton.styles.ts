import styled from 'styled-components';

export const StyledDeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.dangerBg};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, visibility 0.15s ease;

  &:hover:not(:disabled) {
    background: #fdd5d5;
  }

  &:disabled {
    opacity: 0.3;
    visibility: visible;
  }
`;

export const TrashIcon = styled.img`
  width: 20px;
  height: 20px;
`;
