import { StoreProvider } from '@/app/providers/StoreProvider';
import { MetersListPage } from '@/pages/meters-list/ui/MetersListPage';

function App() {
  return (
    <StoreProvider>
      <MetersListPage />
    </StoreProvider>
  );
}

export default App;
