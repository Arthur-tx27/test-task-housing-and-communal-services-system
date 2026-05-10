import { types } from 'mobx-state-tree';
import type { HouseDTO } from './types';

export const AreaModel = types.model('Area', {
  id: types.identifier,
  number: types.number,
  str_number: types.string,
  str_number_full: types.string,
  house: types.frozen<HouseDTO>(),
});
