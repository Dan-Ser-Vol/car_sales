import { RoleResponseDto } from '../../../role/dto/response/role-response.dto';
import { CarPostDetailsResponseDto } from '../../../carPost/dto/response/carPost-details-response.dto';

export class UserDetailsResponseDto {
  id: string;
  username: string;
  email: string;
  cars: CarPostDetailsResponseDto[];
  roles: RoleResponseDto[];
  token?: string;
  createdAt: Date;
}
