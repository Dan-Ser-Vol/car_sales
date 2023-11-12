import { UserEntity } from '../../database/entities/user.entity';
import {
  UserListItemResponseDto,
  UserListResponseDto,
} from './dto/response/user.list-response.dto';
import { IList } from '../../common/interface/list.interface';
import { UserListQueryRequestDto } from './dto/request/user-list-query.request.dto';
import { UserDetailsResponseDto } from './dto/response/user.details-response.dto';
import { RoleResponseMapper } from '../role/role.response.mapper';
import { CarPostResponseMapper } from '../carPost/carPost.response.mapper';

export class UserResponseMapper {
  static toListDto(
    data: IList<UserEntity>,
    query: UserListQueryRequestDto,
  ): UserListResponseDto {
    return {
      data: data.entities.map(this.toListItemDto),
      total: data.total,
      ...query,
    };
  }

  static toListItemDto(data: UserEntity): UserListItemResponseDto {
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      createdAt: data.createdAt,
    };
  }

  static toDetailsDto(data: UserEntity): UserDetailsResponseDto {
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      roles: data.roles
        ? RoleResponseMapper.toDetailsListDto(data.roles)
        : null,
      cars: data.posts
        ? CarPostResponseMapper.toDetailsListDto(data.posts)
        : null,
      token: data.token,
      createdAt: data.createdAt,
    };
  }
}
