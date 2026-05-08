import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/shared/lib/hooks/useRootStore';
import { MetersTable } from '@/widgets/meters-table/ui/MetersTable';
import { Pagination } from '@/features/pagination/ui/Pagination';

export const MetersListPage = observer(function MetersListPage() {
  const store = useRootStore();

  useEffect(() => {
    store.loadMetersWithAddresses();
  }, [store]);

  return (
    <div>
      <h1>Список счётчиков</h1>
      <MetersTable />
      <Pagination />
    </div>
  );
});
