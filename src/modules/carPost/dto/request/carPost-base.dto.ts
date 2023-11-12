import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { UserEntity } from '../../../../database/entities/user.entity';
import { BodyTypeEnum } from '../../enum/body-type.enum';
import { CarBrandsEnum } from '../../enum/car-brands.enum';
import { CurrencyEnum } from '../../enum/currensy.enum';
import { StatusCarEnum } from '../../enum/status.enum';

export class CarPostBaseDto {
  @IsString()
  id: string;

  @ApiProperty({
    example: 'Audi',
    description: 'The brand of the car',
    enum: CarBrandsEnum,
  })
  @IsNotEmpty()
  brand: CarBrandsEnum;

  @ApiProperty({ example: 'Q7', description: 'The model of the car' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 2017, description: 'The year of the car' })
  @IsNumber()
  @Min(1960)
  @Max(new Date().getFullYear())
  @IsOptional()
  year: number;

  @ApiProperty({
    example: 'taz.png',
    description: 'The image of the car',
  })
  @IsString()
  @IsArray()
  @IsOptional()
  image: string[];

  @ApiProperty({ example: 50000, description: 'The mileage of the car' })
  @IsInt()
  @Min(0)
  @IsOptional()
  mileage: number;

  @ApiProperty({
    enum: BodyTypeEnum,
    default: BodyTypeEnum.WAGON,
    description: 'The body type of the car',
  })
  @IsEnum(BodyTypeEnum)
  @IsOptional()
  bodyType: BodyTypeEnum;

  @ApiProperty({
    enum: StatusCarEnum,
    default: StatusCarEnum.USED,
    description: 'The status of the car',
  })
  @IsEnum(StatusCarEnum)
  @IsOptional()
  status: StatusCarEnum;

  @ApiProperty({ example: 20000, description: 'The price of the car' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    enum: CurrencyEnum,
    default: CurrencyEnum.USD,
    description: 'The currency of the car price',
  })
  @IsEnum(CurrencyEnum)
  @IsOptional()
  currency: CurrencyEnum;

  @ApiProperty({ example: false, description: 'Whether the car is sold' })
  @IsBoolean()
  @IsOptional()
  sold: boolean;

  @ApiProperty({ example: 'Paris', description: 'The region of the car' })
  @IsString()
  @IsOptional()
  region: string;

  @ApiProperty({
    example: 'This Audi Q7 is a compact luxury car manufactured...',
    description: 'Detailed description of the car',
  })
  @IsString()
  @IsOptional()
  description: string;

  user: UserEntity;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
