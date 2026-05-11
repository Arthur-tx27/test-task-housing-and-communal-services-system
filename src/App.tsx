import { ThemeProvider } from 'styled-components';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { MetersListPage } from '@/pages/meters-list/ui/MetersListPage';
import { theme } from '@/app/styles/theme';
import { GlobalStyles } from '@/app/styles/GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StoreProvider>
        <MetersListPage />
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
