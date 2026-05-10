import styled from 'styled-components';

export const StyledDeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.dangerBg};
  color: ${({ theme }) => theme.colors.dangerColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, visibility 0.15s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.dangerBgHover};
    color:${({ theme }) => theme.colors.dangerColorHover};
  }

  &:disabled {
    background: none;
    color: ${({theme}) => theme.colors.textDisabled}
  }
`;

export const TrashIcon = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  background: currentColor;
  mask: url('/icons/trash.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/trash.svg') center / contain no-repeat;
`;
