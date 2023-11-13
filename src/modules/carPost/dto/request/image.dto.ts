import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ImageDto {
  @ApiProperty({
    example: 'taz.png',
    description: 'This is name of an image ',
  })
  @IsString()
  @IsOptional()
  image: string;
}
