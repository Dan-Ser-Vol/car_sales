import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { IList } from '../../common/interface/list.interface';
import { UserEntity } from '../../database/entities/user.entity';
import { UserUpdateRequestDto } from './dto/request/user.update-request.dto';
import { UserListQueryRequestDto } from './dto/request/user-list-query.request.dto';
import { BanStatusEnum } from './enum/ban-status.enum';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getAll(
    query: UserListQueryRequestDto,
  ): Promise<IList<UserEntity>> {
    return await this.userRepository.getAll(query);
  }

  public async getById(userId: string): Promise<UserEntity> {
    await this.findUserOrException(userId);
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: { posts: true, roles: true },
    });
  }

  public async updateUser(
    userId: string,
    data: UserUpdateRequestDto,
  ): Promise<UserEntity> {
    const findUser = await this.findUserOrException(userId);
    await this.userRepository.merge(findUser, data);
    return this.userRepository.save(findUser);
  }

  public async deleteUser(userId: string): Promise<void> {
    const findUser = await this.findUserOrException(userId);
    await this.userRepository.remove(findUser);
  }

  public async banStatus(userId: string, status: string): Promise<UserEntity> {
    const user = await this.findUserOrException(userId);
    try {
      switch (status) {
        case 'active':
          user.banned = BanStatusEnum.ACTIVE;
          break;
        case 'inactive':
          user.banned = BanStatusEnum.INACTIVE;
          break;
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.save(user);
    return user;
  }

  public async findUserOrException(userId: string): Promise<UserEntity> {
    const findUser = await this.userRepository.findOneBy({ id: userId });
    if (!findUser) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return findUser;
  }
}
