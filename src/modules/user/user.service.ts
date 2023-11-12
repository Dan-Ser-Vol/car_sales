import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from '../../database/entities/user.entity';
import { UserUpdateRequestDto } from './dto/request/user.update-request.dto';
import { UserListQueryRequestDto } from './dto/request/user-list-query.request.dto';
import { IList } from '../../common/interface/list.interface';
import { UserCreateRequestDto } from './dto/request/user.create-request.dto';

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

  public async saveUser(user: UserCreateRequestDto): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  public async findUserOrException(userId: string): Promise<UserEntity> {
    const findUser = await this.userRepository.findOneBy({ id: userId });
    if (!findUser) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return findUser;
  }
}
