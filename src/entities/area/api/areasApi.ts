import { get } from '@/shared/api/client';
import type { AreaDTO } from '../model/types';

export async function fetchAreasByIds(ids: string[]): Promise<AreaDTO[]> {
  const response = await get<{ results: AreaDTO[] }>('/areas/', {
    id__in: [...new Set(ids)],
  });

  return response.results;
}
