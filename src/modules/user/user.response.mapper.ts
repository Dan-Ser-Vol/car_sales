import { IList } from '../../common/interface/list.interface';
import { UserEntity } from '../../database/entities/user.entity';
import { CarPostResponseMapper } from '../carPost/carPost.response.mapper';
import { RoleResponseMapper } from '../role/role.response.mapper';
import { UserListQueryRequestDto } from './dto/request/user-list-query.request.dto';
import { UserDetailsResponseDto } from './dto/response/user.details-response.dto';
import {
  UserListItemResponseDto,
  UserListResponseDto,
} from './dto/response/user.list-response.dto';

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
      phone: data.phone,
      roles: data.roles
        ? RoleResponseMapper.toDetailsListDto(data.roles)
        : null,
      posts: data.posts
        ? CarPostResponseMapper.toDetailsListDto(data.posts)
        : null,
      accountType: data.accountType,
      banned: data.banned,
      token: data.token,
      password: data.password,
      updatedAt: data.updatedAt,
      createdAt: data.createdAt,
    };
  }
}
