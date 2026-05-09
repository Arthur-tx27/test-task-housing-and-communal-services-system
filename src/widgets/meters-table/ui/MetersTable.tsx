import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/shared/lib/hooks/useRootStore';
import { DeleteButton } from '@/features/delete-meter/ui/DeleteButton';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import { EmptyState } from '@/shared/ui/EmptyState';
import {
  TableWrapper,
  ScrollContainer,
  StyledTable,
  Thead,
  Th,
  Tr,
  Td,
  TypeCell,
  TypeContent,
  TypeIcon,
  ActionsCell,
} from './MetersTable.styles';

const COLUMNS = [
  '№',
  'Тип',
  'Дата установки',
  'Автоматический',
  'Текущие показания',
  'Адрес',
  'Примечание',
  '',
] as const;

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
  const { meters, offset, isLoading, error } = store.metersStore;
  const { areasMap } = store.areasStore;

  const showLoader = isLoading && meters.length === 0;
  const showError = error !== null;
  const showEmpty = !isLoading && !error && meters.length === 0;

  return (
    <TableWrapper>
      {showLoader && <Loader />}
      {showError && <ErrorMessage message={error} />}
      {showEmpty && <EmptyState />}

      {!showLoader && !showError && !showEmpty && (
        <ScrollContainer>
          <StyledTable>
            <Thead>
              <tr>
                {COLUMNS.map((col) => (
                  <Th key={col}>{col}</Th>
                ))}
              </tr>
            </Thead>
            <tbody>
              {meters.map((meter, index) => {
                const area = areasMap.get(meter.areaId);
                const address = area
                  ? `${area.house}, кв. ${area.apartment}`
                  : '';

                return (
                  <Tr key={meter.id}>
                    <Td>{index + 1 + offset}</Td>
                    <TypeCell>
                      <TypeContent>
                        <TypeIcon
                          src={TYPE_ICONS[meter._type] ?? ''}
                          alt=""
                        />
                        {TYPE_LABELS[meter._type] ?? meter._type}
                      </TypeContent>
                    </TypeCell>
                    <Td>{formatDate(meter.installation_date)}</Td>
                    <Td>{meter.is_automatic ? 'Да' : 'Нет'}</Td>
                    <Td>{meter.initial_values[0]}</Td>
                    <Td>{address}</Td>
                    <Td>{meter.description}</Td>
                    <ActionsCell>
                      <DeleteButton meterId={meter.id} />
                    </ActionsCell>
                  </Tr>
                );
              })}
            </tbody>
          </StyledTable>
        </ScrollContainer>
      )}
    </TableWrapper>
  );
});
