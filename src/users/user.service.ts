import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RolesService,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['roles'],
    });
  }

  async addRole(data: AddRoleDto): Promise<AddRoleDto> {
    const user = await this.userRepository.findOne({
      where: { id: Number(data.userId) },
      relations: ['roles'],
    });
    const role = await this.roleService.getByValue(data.value);
    if (role && user) {
      user.roles = [...user.roles, role];
      await this.userRepository.save(user);
      return data;
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async ban(data: BanUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: Number(data.userId) },
    });
    if (!user) {
      throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = data.banReason;
    await this.userRepository.save(user);
    return user;
  }
}
