export interface AddressParts {
  house: { address: string };
  str_number_full: string;
}

export function formatAddress(area: AddressParts | undefined): string {
  if (!area) return '';
  return `${area.house.address}, ${area.str_number_full}`;
}
