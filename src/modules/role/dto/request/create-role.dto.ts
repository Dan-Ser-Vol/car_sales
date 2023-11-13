import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'ADMIN',
    description: 'Role value',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    example: 'Administrator role',
    description: 'Role description',
  })
  @IsString()
  @IsOptional()
  description: string;
}
