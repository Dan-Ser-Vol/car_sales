import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

import { UserListQueryRequestDto } from '../request/user-list-query.request.dto';

export class UserListResponseDto extends UserListQueryRequestDto {
  data: UserListItemResponseDto[];
  total: number;
}

export class UserListItemResponseDto {
  @ApiProperty()
  @IsNumber()
  id: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;
}
