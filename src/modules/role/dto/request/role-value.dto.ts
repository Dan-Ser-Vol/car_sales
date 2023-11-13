import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RoleValueDto {
  @ApiProperty({
    example: 'ADMIN or BUYER',
  })
  @IsString()
  value: string;
}
