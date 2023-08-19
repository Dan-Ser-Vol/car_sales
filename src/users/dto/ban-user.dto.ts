import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ example: '2', description: 'User ID' })
  @IsNumber()
  readonly userId: number;

  @ApiProperty({ example: 'ADMIN', description: "User's  banned" })
  @IsString()
  readonly banReason: string;
}
