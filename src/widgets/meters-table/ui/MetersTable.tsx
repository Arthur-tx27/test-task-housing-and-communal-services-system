import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/shared/lib/hooks/useRootStore';
import { DeleteButton } from '@/features/delete-meter/ui/DeleteButton';
import { Pagination } from '@/features/pagination/ui/Pagination';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import { EmptyState } from '@/shared/ui/EmptyState';
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

interface ColumnDef {
  label: string;
  width: string;
}

const COLUMNS: ColumnDef[] = [
  { label: '№', width: '48px' },
  { label: 'Тип', width: '120px' },
  { label: 'Дата установки', width: '160px' },
  { label: 'Автоматический', width: '128px' },
  { label: 'Текущие показания', width: '146px' },
  { label: 'Адрес', width: '430px' },
  { label: 'Примечание', width: '304px' },
  { label: '', width: '64px' },
];

const COL_WIDTH = COLUMNS.map((c) => c.width);

const TYPE_LABELS: Record<string, string> = {
  ColdWaterAreaMeter: 'ХВС',
  HotWaterAreaMeter: 'ГВС',
};

const TYPE_ICONS: Record<string, string> = {
  ColdWaterAreaMeter: '/icons/hvs.svg',
  HotWaterAreaMeter: '/icons/gvs.svg',
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU');
}

export const MetersTable = observer(function MetersTable() {
  const store = useRootStore();
  const { meters, displayOffset, isLoading, error } = store.metersStore;
  const { areasMap } = store.areasStore;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo?.({ top: 0, behavior: 'smooth' });
  }, [displayOffset]);

  const showLoader = isLoading && meters.length === 0;
  const showError = error !== null;
  const showEmpty = !isLoading && !error && meters.length === 0;

  return (
    <TableWrapper>
      {showLoader && <Loader />}
      {showError && <ErrorMessage message={error} />}
      {showEmpty && <EmptyState />}

      {!showLoader && !showError && !showEmpty && (
        <ScrollContainer ref={scrollRef} className="scroll-container">
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
              {meters.map((meter, index) => {
                const area = areasMap.get(meter.areaId);
                const address = area
                  ? `${area.house.address}, ${area.str_number_full}`
                  : '';

                return (
                  <Tr key={meter.id} $disabled={isLoading}>
                    <Td $width={COL_WIDTH[0]}>{index + 1 + displayOffset}</Td>
                    <TypeCell $width={COL_WIDTH[1]}>
                      <TypeContent>
                        <TypeIcon src={TYPE_ICONS[meter._type] ?? ''} alt="" />
                        {TYPE_LABELS[meter._type] ?? meter._type}
                      </TypeContent>
                    </TypeCell>
                    <Td $width={COL_WIDTH[2]}>
                      {formatDate(meter.installation_date)}
                    </Td>
                    <Td $width={COL_WIDTH[3]}>
                      {meter.is_automatic ? 'Да' : 'Нет'}
                    </Td>
                    <Td $width={COL_WIDTH[4]}>{meter.initial_values[0]}</Td>
                    <Td $width={COL_WIDTH[5]}>{address}</Td>
                    <Td $width={COL_WIDTH[6]} $muted>
                      {meter.description}
                    </Td>
                    <ActionsCell $width={COL_WIDTH[7]}>
                      <DeleteButton meterId={meter.id} />
                    </ActionsCell>
                  </Tr>
                );
              })}
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
