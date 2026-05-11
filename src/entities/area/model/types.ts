export interface HouseDTO {
  address: string;
  id: string;
  fias_addrobjs: string[];
}

export interface AreaDTO {
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
  house: HouseDTO;
}
