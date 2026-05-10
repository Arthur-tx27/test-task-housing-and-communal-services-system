import { MeterModel } from '../model/meter';
import type { MeterDTO } from '../model/types';

export function mapMeterFromDto(dto: MeterDTO) {
  return MeterModel.create({
    id: dto.id,
    _type: dto._type[0],
    installation_date: dto.installation_date,
    is_automatic: dto.is_automatic ?? false,
    initial_values: dto.initial_values,
    description: dto.description ?? '',
    areaId: dto.area.id,
  });
}
