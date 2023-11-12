import { CarPostDetailsResponseDto } from '../../../carPost/dto/response/carPost-details-response.dto';
import { RoleResponseDto } from '../../../role/dto/response/role-response.dto';
import { AccountTypeEnum } from '../../enum/account-type.enum';
import { BanStatusEnum } from '../../enum/ban-status.enum';

export class UserDetailsResponseDto {
  id: string;
  username: string;
  email: string;
  phone: string;
  accountType: AccountTypeEnum.BASIC;
  posts: CarPostDetailsResponseDto[];
  roles: RoleResponseDto[];
  banned: BanStatusEnum;
  password: string;
  token?: string;
  updatedAt: Date;
  createdAt: Date;
}
