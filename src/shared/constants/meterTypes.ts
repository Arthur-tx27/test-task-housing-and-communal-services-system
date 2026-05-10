export interface ColumnDef {
  label: string;
  width: string;
}

export const COLUMNS: ColumnDef[] = [
  { label: '№', width: '48px' },
  { label: 'Тип', width: '120px' },
  { label: 'Дата установки', width: '160px' },
  { label: 'Автоматический', width: '128px' },
  { label: 'Текущие показания', width: '146px' },
  { label: 'Адрес', width: '430px' },
  { label: 'Примечание', width: '304px' },
  { label: '', width: '64px' },
];

export const COL_WIDTH = COLUMNS.map((c) => c.width);

export const TYPE_LABELS: Record<string, string> = {
  ColdWaterAreaMeter: 'ХВС',
  HotWaterAreaMeter: 'ГВС',
};

export const TYPE_ICONS: Record<string, string> = {
  ColdWaterAreaMeter: '/icons/hvs.svg',
  HotWaterAreaMeter: '/icons/gvs.svg',
};
