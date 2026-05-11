import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/app/providers/useRootStore';
import { MetersTable } from '@/widgets/meters-table/ui/MetersTable';
import { PageContainer, PageTitle } from './MetersListPage.styles';

export const MetersListPage = observer(function MetersListPage() {
  const store = useRootStore();

  useEffect(() => {
    store.loadMetersWithAddresses();
  }, [store]);

  return (
    <PageContainer>
      <PageTitle>Список счётчиков</PageTitle>
      <MetersTable />
    </PageContainer>
  );
});
