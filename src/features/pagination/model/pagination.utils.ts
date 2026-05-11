import {
  PAGINATION_MAX_VISIBLE,
  PAGINATION_CENTER_RADIUS,
  PAGINATION_LEFT_SLICE,
  PAGINATION_RIGHT_SLICE,
  PAGINATION_RIGHT_THRESHOLD_OFFSET,
  PAGINATION_SMALL_THRESHOLD,
} from '@/shared/constants/pagination';

export function getPageNumbers(
  current: number,
  total: number
): (number | 'ellipsis')[] {
  if (total <= PAGINATION_MAX_VISIBLE) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];

  if (current <= PAGINATION_SMALL_THRESHOLD) {
    for (let i = 1; i <= PAGINATION_LEFT_SLICE; i++) pages.push(i);
    pages.push('ellipsis');
    pages.push(total);
  } else if (current >= total - PAGINATION_RIGHT_THRESHOLD_OFFSET) {
    pages.push(1);
    pages.push('ellipsis');
    for (let i = total - PAGINATION_RIGHT_SLICE; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push('ellipsis');
    for (let i = current - PAGINATION_CENTER_RADIUS; i <= current + PAGINATION_CENTER_RADIUS; i++) pages.push(i);
    pages.push('ellipsis');
    pages.push(total);
  }

  return pages;
}

export function getEllipsisRange(
  items: (number | 'ellipsis')[],
  index: number,
  total: number
): { from: number; to: number } | null {
  if (items[index] !== 'ellipsis') return null;

  let left = 0;
  for (let i = index - 1; i >= 0; i--) {
    if (typeof items[i] === 'number') {
      left = items[i] as number;
      break;
    }
  }

  let right = total + 1;
  for (let i = index + 1; i < items.length; i++) {
    if (typeof items[i] === 'number') {
      right = items[i] as number;
      break;
    }
  }

  return { from: left + 1, to: right - 1 };
}
