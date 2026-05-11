import { useState, useCallback, type MouseEvent } from 'react';
import { useRootStore } from '@/app/providers/useRootStore';
import { PAGE_SIZE } from '@/shared/constants/pagination';
import { getPageNumbers, getEllipsisRange } from './pagination.utils';
import type { OpenEllipsisState } from './types';

export function usePagination() {
  const store = useRootStore();
  const { offset, totalCount, isLoading } = store.metersStore;

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = offset / PAGE_SIZE + 1;
  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const [openEllipsis, setOpenEllipsis] = useState<OpenEllipsisState | null>(
    null
  );

  const goToPage = useCallback(
    (page: number) => {
      if (page === currentPage || page < 1 || page > totalPages) return;
      store.metersStore.setOffset((page - 1) * PAGE_SIZE);
      store.loadMetersWithAddresses();
      setOpenEllipsis(null);
    },
    [store, currentPage, totalPages]
  );

  const handleEllipsisClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>, index: number) => {
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
    },
    [pageNumbers, totalPages, openEllipsis?.index]
  );

  const closeEllipsis = useCallback(() => {
    setOpenEllipsis(null);
  }, []);

  const ellipsisPages: number[] = [];
  if (openEllipsis) {
    for (let p = openEllipsis.from; p <= openEllipsis.to; p++) {
      ellipsisPages.push(p);
    }
  }

  return {
    pageNumbers,
    currentPage,
    isLoading,
    goToPage,
    openEllipsis,
    closeEllipsis,
    handleEllipsisClick,
    ellipsisPages,
    totalPages,
  };
}
