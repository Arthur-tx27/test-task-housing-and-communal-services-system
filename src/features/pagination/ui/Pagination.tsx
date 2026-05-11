import { observer } from 'mobx-react-lite';
import { usePagination } from '../model/usePagination';
import {
  PaginationContainer,
  PageButton,
  DropdownPopup,
  DropdownBackdrop,
} from './Pagination.styles';

export const Pagination = observer(function Pagination() {
  const {
    pageNumbers,
    currentPage,
    isLoading,
    goToPage,
    openEllipsis,
    closeEllipsis,
    handleEllipsisClick,
    ellipsisPages,
    totalPages,
  } = usePagination();

  if (totalPages <= 1) return null;

  return (
    <PaginationContainer>
      {pageNumbers.map((item, index) =>
        item === 'ellipsis' ? (
          <PageButton
            key={`ellipsis-${index}`}
            type="button"
            $active={index === openEllipsis?.index}
            onClick={(e) => handleEllipsisClick(e, index)}
          >
            ...
          </PageButton>
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
          <DropdownBackdrop onClick={closeEllipsis} />
          <DropdownPopup
            style={{
              top: openEllipsis.rect.top - 8,
              left: openEllipsis.rect.left + openEllipsis.rect.width / 2,
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
