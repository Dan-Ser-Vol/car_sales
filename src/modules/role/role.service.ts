import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../database/entities/role.entity';
import { CreateRoleDto } from './dto/request/create-role.dto';
import { RoleResponseDto } from './dto/response/role-response.dto';
import { RoleValueDto } from './dto/request/role-value.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../../database/entities/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createRole(dto: CreateRoleDto): Promise<RoleResponseDto> {
    const findRole = await this.getRoleByValue(dto.value);

    if (findRole) {
      throw new HttpException(
        'Such role already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const role = await this.roleRepository.create(dto);
    return await this.roleRepository.save(role);
  }

  async getRoleByValue(value): Promise<RoleEntity> {
    return await this.roleRepository.findOne({ where: { value } });
  }

  async addRoleToUserBy(userId: string, newRole: CreateRoleDto): Promise<void> {
    const role = await this.getRoleByValue(newRole.value);
    if (!role) {
      throw new NotFoundException(`Role with value ${newRole} not found`);
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { roles: true },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    if (role && user) {
      user.roles = [...user.roles, role];
    }
    await this.userRepository.save(user);
  }

  async deleteRoleByValue(value: RoleValueDto): Promise<void> {
    const role = await this.getRoleByValue(value);

    if (!role) {
      throw new NotFoundException(`Role with value ${value} not found`);
    }
    await this.roleRepository.remove(role);
  }
}
