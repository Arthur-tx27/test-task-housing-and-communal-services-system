import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/shared/lib/hooks/useRootStore';
import { PaginationContainer, PageButton, Ellipsis } from './Pagination.styles';

const PAGE_SIZE = 20;

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];

  if (current <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i);
    pages.push('ellipsis');
    pages.push(total);
  } else if (current >= total - 3) {
    pages.push(1);
    pages.push('ellipsis');
    for (let i = total - 4; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push('ellipsis');
    for (let i = current - 1; i <= current + 1; i++) pages.push(i);
    pages.push('ellipsis');
    pages.push(total);
  }

  return pages;
}

export const Pagination = observer(function Pagination() {
  const store = useRootStore();
  const { offset, totalCount, isLoading } = store.metersStore;

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = offset / PAGE_SIZE + 1;
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  function goToPage(page: number) {
    if (page === currentPage || page < 1 || page > totalPages) return;
    store.metersStore.offset = (page - 1) * PAGE_SIZE;
    store.loadMetersWithAddresses();
  }

  if (totalPages <= 1) return null;

  return (
    <PaginationContainer>
      {pageNumbers.map((item, index) =>
        item === 'ellipsis' ? (
          <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>
        ) : (
          <PageButton
            key={item}
            type="button"
            $active={item === currentPage}
            disabled={isLoading}
            onClick={() => goToPage(item)}
          >
            {item}
          </PageButton>
        )
      )}
    </PaginationContainer>
  );
});
