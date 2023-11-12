import { PickType } from '@nestjs/swagger';

import { CarPostBaseDto } from './carPost-base.dto';

export class CarPostUpdateDto extends PickType(CarPostBaseDto, [
  'brand',
  'model',
  'year',
  'mileage',
  'bodyType',
  'status',
  'price',
  'currency',
  'sold',
  'region',
  'description',
]) {}
