import { useState, type MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/shared/lib/hooks/useRootStore';
import {
  PaginationContainer,
  PageButton,
  EllipsisButton,
  DropdownPopup,
  DropdownBackdrop,
} from './Pagination.styles';

const PAGE_SIZE = 20;

function getPageNumbers(
  current: number,
  total: number
): (number | 'ellipsis')[] {
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

function getEllipsisRange(
  items: (number | 'ellipsis')[],
  index: number,
  total: number
): { from: number; to: number } | null {
  if (items[index] !== 'ellipsis') return null;

  let left = 0;
  for (let i = index - 1; i >= 0; i--) {
    if (typeof items[i] === 'number') {
      left = items[i] as number;
      break;
    }
  }

  let right = total + 1;
  for (let i = index + 1; i < items.length; i++) {
    if (typeof items[i] === 'number') {
      right = items[i] as number;
      break;
    }
  }

  return { from: left + 1, to: right - 1 };
}

interface OpenEllipsisState {
  index: number;
  from: number;
  to: number;
  rect: DOMRect;
}

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
