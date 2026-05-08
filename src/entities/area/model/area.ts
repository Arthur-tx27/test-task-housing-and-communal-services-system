import { types } from 'mobx-state-tree';

export const AreaModel = types.model('Area', {
  id: types.identifier,
  house: types.string,
  str_number_full: types.string,
  apartment: types.string,
});
