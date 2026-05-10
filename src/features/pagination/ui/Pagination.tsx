import { useState, type MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/app/providers/useRootStore';
import { PAGE_SIZE } from '@/shared/constants/pagination';
import { getPageNumbers, getEllipsisRange } from '../model/pagination.utils';
import type { OpenEllipsisState } from '../model/types';
import {
  PaginationContainer,
  PageButton,
  EllipsisButton,
  DropdownPopup,
  DropdownBackdrop,
} from './Pagination.styles';

export const Pagination = observer(function Pagination() {
  const store = useRootStore();
  const { offset, totalCount, isLoading } = store.metersStore;

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = offset / PAGE_SIZE + 1;
  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const [openEllipsis, setOpenEllipsis] = useState<OpenEllipsisState | null>(
    null
  );

  function goToPage(page: number) {
    if (page === currentPage || page < 1 || page > totalPages) return;
    store.metersStore.setOffset((page - 1) * PAGE_SIZE);
    store.loadMetersWithAddresses();
    setOpenEllipsis(null);
  }

  function handleEllipsisClick(e: MouseEvent<HTMLButtonElement>, index: number) {
    const range = getEllipsisRange(pageNumbers, index, totalPages);
    if (!range) return;

    if (openEllipsis?.index === index) {
      setOpenEllipsis(null);
    } else {
      setOpenEllipsis({
        index,
        ...range,
        rect: e.currentTarget.getBoundingClientRect(),
      });
    }
  }

  if (totalPages <= 1) return null;

  const ellipsisPages: number[] = [];
  if (openEllipsis) {
    for (let p = openEllipsis.from; p <= openEllipsis.to; p++) {
      ellipsisPages.push(p);
    }
  }

  return (
    <PaginationContainer>
      {pageNumbers.map((item, index) =>
        item === 'ellipsis' ? (
          <EllipsisButton
            key={`ellipsis-${index}`}
            type="button"
            onClick={(e) => handleEllipsisClick(e, index)}
          >
            ...
          </EllipsisButton>
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

      {openEllipsis && (
        <>
          <DropdownBackdrop onClick={() => setOpenEllipsis(null)} />
          <DropdownPopup
            style={{
              top: openEllipsis.rect.top - 8,
              left:
                openEllipsis.rect.left + openEllipsis.rect.width / 2,
              transform: 'translateX(-50%) translateY(-100%)',
            }}
          >
            {ellipsisPages.map((p) => (
              <PageButton
                key={p}
                type="button"
                $active={p === currentPage}
                disabled={isLoading}
                onClick={() => goToPage(p)}
              >
                {p}
              </PageButton>
            ))}
          </DropdownPopup>
        </>
      )}
    </PaginationContainer>
  );
});
