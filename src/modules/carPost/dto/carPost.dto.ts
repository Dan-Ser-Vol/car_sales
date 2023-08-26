import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  Min,
  Max,
  IsBoolean, IsOptional,
} from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { CarPostBodyTypeEnum } from '../enum/carPost-bodyType.enum';
import { StatusCarEnum } from '../enum/carPost-status.enum';
import { CurrencyEnum } from '../enum/carPost-currency.enum';
import { EngineType } from '../enum/carPost-engineType.enum';
import { Transform } from 'class-transformer';

export class BaseCarPostDto {
  @ApiProperty({ example: 'Mazda', description: 'The brand of the car' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: '6 sport', description: 'The model of the car' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    example: 2022,
    description: 'The year of manufacture of the car',
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1930)
  @Max(new Date().getFullYear())
  @Transform(({ value }) => {
    return Number(value);
  })
  age: number;

  @ApiProperty({
    example: 'green',
    description: 'The color of the car',
  })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    example: EngineType.PETROL,
    description: 'Type of the engine',
    enum: EngineType,
    default: EngineType.PETROL,
  })
  engineType: EngineType;

  @ApiProperty({ example: 50000, description: 'The mileage of the car' })
  @Transform(({ value }) => {
    return Number(value);
  })
  @Min(0)
  mileage: number;

  @ApiProperty({
    enum: CarPostBodyTypeEnum,
    description: 'The body type of the car',
  })
  @IsEnum(CarPostBodyTypeEnum)
  @IsNotEmpty()
  bodyType: CarPostBodyTypeEnum;

  @ApiProperty({ enum: StatusCarEnum, description: 'The status of the car' })
  @IsEnum(StatusCarEnum)
  @IsNotEmpty()
  status: StatusCarEnum;

  @ApiProperty({ example: 25000, description: 'The price of the car' })
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  price: number;

  @ApiProperty({ enum: CurrencyEnum, description: 'The currency of the price' })
  @IsEnum(CurrencyEnum)
  @IsNotEmpty()
  currency: CurrencyEnum;

  @ApiProperty({ example: false, description: 'Whether the car is sold' })
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  sold: boolean;

  @ApiProperty({ example: 'Berlin', description: 'The region of the car' })
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty({
    example: 'fsfdfssgdwewe8r2w3r8.png',
    description: 'The image of the car',
  })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({
    example: 'This Audi A3 is a compact luxury sedan manufactured...',
    description: 'Detailed description of the car',
  })
  @IsString()
  description: string;
}

export class CreateCarPostDto extends PickType(BaseCarPostDto, [
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

export class UpdateCarDto extends PickType(BaseCarPostDto, [
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

export class ResponseCarDto extends PickType(BaseCarPostDto, [
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
