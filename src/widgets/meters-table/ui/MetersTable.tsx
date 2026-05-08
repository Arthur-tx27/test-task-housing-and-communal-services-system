import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/shared/lib/hooks/useRootStore';
import { DeleteButton } from '@/features/delete-meter/ui/DeleteButton';

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
  const { meters, offset } = store.metersStore;
  const { areasMap } = store.areasStore;

  return (
    <table>
      <thead>
        <tr>
          {COLUMNS.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {meters.map((meter, index) => {
          const area = areasMap.get(meter.areaId);
          const address = area
            ? `${area.house}, кв. ${area.apartment}`
            : '';

          return (
            <tr key={meter.id}>
              <td>{index + 1 + offset}</td>
              <td>
                <img
                  src={TYPE_ICONS[meter._type] ?? ''}
                  alt=""
                  width={16}
                  height={16}
                />
                {TYPE_LABELS[meter._type] ?? meter._type}
              </td>
              <td>{formatDate(meter.installation_date)}</td>
              <td>{meter.is_automatic ? 'Да' : 'Нет'}</td>
              <td>{meter.initial_values[0]}</td>
              <td>{address}</td>
              <td>{meter.description}</td>
              <td>
                <DeleteButton meterId={meter.id} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
