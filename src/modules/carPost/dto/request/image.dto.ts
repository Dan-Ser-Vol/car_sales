import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class ImageDto {
  @ApiProperty({
    example: 'taz.png',
    description: 'This is name of an image ',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 'taz.png',
    description: 'Add an image using form-data! ',
  })
  @IsString()
  @IsOptional()
  image: string;
}
