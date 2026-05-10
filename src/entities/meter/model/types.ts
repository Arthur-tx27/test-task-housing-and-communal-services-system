export interface MeterDTO {
  id: string;
  _type: string[];
  installation_date: string;
  is_automatic: boolean | null;
  initial_values: number[];
  description: string;
  area: {
    id: string;
  };
}
