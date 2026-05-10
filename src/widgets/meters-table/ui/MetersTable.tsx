import { observer } from 'mobx-react-lite';
import { useMetersTable } from '../model/useMetersTable';
import { DeleteButton } from '@/features/delete-meter/ui/DeleteButton';
import { Pagination } from '@/features/pagination/ui/Pagination';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import { EmptyState } from '@/shared/ui/EmptyState';
import { COLUMNS, COL_WIDTH } from '@/shared/constants/meterTypes';
import { SCROLL_CONTAINER_CLASS } from '@/shared/constants/cssClasses';
import {
  TableWrapper,
  ScrollContainer,
  StyledThead,
  Th,
  StyledTable,
  BottomBar,
  Tr,
  Td,
  TypeCell,
  TypeContent,
  TypeIcon,
  ActionsCell,
} from './MetersTable.styles';

export const MetersTable = observer(function MetersTable() {
  const { scrollRef, showLoader, showError, showEmpty, rows, isLoading, error } =
    useMetersTable();

  return (
    <TableWrapper>
      {showLoader && <Loader />}
      {showError && <ErrorMessage message={error!} />}
      {showEmpty && <EmptyState />}

      {!showLoader && !showError && !showEmpty && (
        <ScrollContainer ref={scrollRef} className={SCROLL_CONTAINER_CLASS}>
          <StyledTable>
            <StyledThead>
              <tr>
                {COLUMNS.map((col) => (
                  <Th key={col.label} $width={col.width}>
                    {col.label}
                  </Th>
                ))}
              </tr>
            </StyledThead>
            <tbody>
              {rows.map((row) => (
                <Tr key={row.key} $disabled={isLoading}>
                  <Td $width={COL_WIDTH[0]}>{row.number}</Td>
                  <TypeCell $width={COL_WIDTH[1]}>
                    <TypeContent>
                      <TypeIcon src={row.typeIcon} alt="" />
                      {row.typeLabel}
                    </TypeContent>
                  </TypeCell>
                  <Td $width={COL_WIDTH[2]}>{row.date}</Td>
                  <Td $width={COL_WIDTH[3]}>{row.auto}</Td>
                  <Td $width={COL_WIDTH[4]}>{row.value}</Td>
                  <Td $width={COL_WIDTH[5]}>{row.address}</Td>
                  <Td $width={COL_WIDTH[6]} $muted>
                    {row.description}
                  </Td>
                  <ActionsCell $width={COL_WIDTH[7]}>
                    <DeleteButton meterId={row.meterId} />
                  </ActionsCell>
                </Tr>
              ))}
            </tbody>
          </StyledTable>
        </ScrollContainer>
      )}

      <BottomBar>
        <Pagination />
      </BottomBar>
    </TableWrapper>
  );
});
