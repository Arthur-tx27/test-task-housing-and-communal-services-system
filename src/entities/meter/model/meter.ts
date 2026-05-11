import { types } from 'mobx-state-tree';

export const MeterModel = types.model('Meter', {
  id: types.identifier,
  _type: types.string,
  installation_date: types.string,
  is_automatic: types.maybeNull(types.boolean),
  initial_values: types.array(types.number),
  description: types.string,
  areaId: types.string,
  address: types.maybe(types.string),
});
