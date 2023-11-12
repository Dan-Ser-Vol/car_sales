import { PickType } from '@nestjs/swagger';

import { CarPostBaseDto } from '../request/carPost-base.dto';

export class CarPostDetailsResponseDto extends PickType(CarPostBaseDto, [
  'id',
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
  'createdAt',
  'user',
  'updatedAt',
]) {}
