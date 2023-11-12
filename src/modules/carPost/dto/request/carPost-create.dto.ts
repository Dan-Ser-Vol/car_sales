import { PickType } from '@nestjs/swagger';

import { CarPostBaseDto } from './carPost-base.dto';

export class CarPostCreateDto extends PickType(CarPostBaseDto, [
  'brand',
  'model',
  'year',
  'image',
  'mileage',
  'bodyType',
  'status',
  'price',
  'currency',
  'sold',
  'region',
  'description',
]) {}
