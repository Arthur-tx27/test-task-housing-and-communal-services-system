import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/shared/lib/hooks/useRootStore';
import { MetersTable } from '@/widgets/meters-table/ui/MetersTable';
import { Pagination } from '@/features/pagination/ui/Pagination';
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
      <Pagination />
    </PageContainer>
  );
});
