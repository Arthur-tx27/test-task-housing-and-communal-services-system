import { useEffect, useRef } from 'react';
import { type Instance } from 'mobx-state-tree';
import type { RootStore } from '@/entities/root/model/rootStore';
import { formatDate } from '@/shared/lib/formatDate';
import { formatAddress } from '@/shared/lib/formatAddress';
import {
  TYPE_LABELS,
  TYPE_ICONS,
} from '@/shared/constants/meterTypes';

export interface TableRow {
  key: string;
  meterId: string;
  number: number;
  typeIcon: string;
  typeLabel: string;
  date: string;
  auto: string;
  value: number;
  address: string;
  description: string;
}

export function useMetersTable(store: Instance<typeof RootStore>) {
  const { meters, displayOffset, isLoading, error } = store.metersStore;
  const { areasMap } = store.areasStore;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo?.({ top: 0, behavior: 'smooth' });
  }, [displayOffset]);

  const showLoader = isLoading && meters.length === 0;
  const showError = error !== null;
  const showEmpty = !isLoading && !error && meters.length === 0;

  const rows: TableRow[] = meters.map((meter, index) => {
    const area = areasMap.get(meter.areaId);
    return {
      key: meter.id,
      meterId: meter.id,
      number: index + 1 + displayOffset,
      typeIcon: TYPE_ICONS[meter._type] ?? '',
      typeLabel: TYPE_LABELS[meter._type] ?? meter._type,
      date: formatDate(meter.installation_date),
      auto: meter.is_automatic ? 'Да' : 'Нет',
      value: meter.initial_values[0],
      address: formatAddress(area),
      description: meter.description,
    };
  });

  return { scrollRef, showLoader, showError, showEmpty, rows, isLoading, error };
}
