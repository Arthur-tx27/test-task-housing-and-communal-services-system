import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --scrollbar-thumb-color: ${({ theme }) => theme.colors.textMuted};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fonts.sizeSm};
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.backgroundMain};
    line-height: 1.4;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  }

  th {
    text-align: left;
    font-weight: 500;
  }

  img {
    display: inline-block;
    vertical-align: middle;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    padding: 0;
  }

  button:disabled {
    cursor: not-allowed;
  }
`;
