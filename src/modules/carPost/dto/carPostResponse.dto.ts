import { PickType } from '@nestjs/swagger';
import { BaseCarPostDto } from './carPost.dto';

export class CarPostResponseDto extends PickType(BaseCarPostDto, [
  'brand',
  'model',
  'age',
  'engineType',
  'mileage',
  'bodyType',
  'status',
  'price',
  'currency',
  'sold',
  'color',
  'region',
  'description',
  'image',
]) {}
