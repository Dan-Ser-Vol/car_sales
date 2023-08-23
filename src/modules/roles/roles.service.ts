import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(data: CreateRoleDto): Promise<Role> {
    const role = await this.roleRepository.create({ ...data });
    await this.roleRepository.save(role);
    return role
  }

  async getByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    console.log(role);
    return role;
  }
}
