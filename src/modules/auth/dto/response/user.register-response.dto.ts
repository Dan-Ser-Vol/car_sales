import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { UserRoleEnum } from '../../../role/enum/user-role.enum';
import { RoleResponseDto } from '../../../role/dto/response/role-response.dto';
import { CarPostDetailsResponseDto } from '../../../carPost/dto/response/carPost-details-response.dto';

export class UserRegisterResponseDto {
  @ApiProperty()
  @IsNumber()
  id: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  cars: CarPostDetailsResponseDto[];

  @ApiProperty()
  @IsString()
  @IsEnum(UserRoleEnum)
  roles: RoleResponseDto[];

  @ApiProperty()
  @IsDate()
  createdAt: Date;
}
