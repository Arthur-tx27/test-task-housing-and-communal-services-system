import { get } from '@/shared/api/client';
import type { AreaDTO } from '../model/types';

const cache = new Map<string, AreaDTO>();

export function clearCache(): void {
  cache.clear();
}

export async function fetchAreasByIds(ids: string[]): Promise<AreaDTO[]> {
  const uniqueIds = [...new Set(ids)];
  const unknownIds = uniqueIds.filter((id) => !cache.has(id));

  if (unknownIds.length > 0) {
    const response = await get<{ results: AreaDTO[] }>('/areas/', {
      id__in: unknownIds,
    });

    response.results.forEach((area) => {
      cache.set(area.id, area);
    });
  }

  return uniqueIds
    .map((id) => cache.get(id))
    .filter((area): area is AreaDTO => area !== undefined);
}
