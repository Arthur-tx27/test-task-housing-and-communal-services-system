import { get, del } from '@/shared/api/client';
import type { MeterDTO } from '../model/types';

export interface MetersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: MeterDTO[];
}

export function fetchMeters(
  limit: number,
  offset: number
): Promise<MetersResponse> {
  return get<MetersResponse>('/meters/', {
    limit: String(limit),
    offset: String(offset),
  });
}

export function deleteMeter(id: string): Promise<void> {
  return del(`/meters/${id}/`);
}
