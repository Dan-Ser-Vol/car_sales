// create-car.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsNumber()
  // @IsPositive()
  // year: number;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // brand: string;
  //
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // model: string;
  //
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // color: string;
}

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class PublicCarData {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}
