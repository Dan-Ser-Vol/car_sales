import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';
import { AuthService } from '../auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    private readonly roleService: RolesService,
  ) {}

  async create(data: CreateUserDto): Promise<string> {
    try {
      const findUser = await this.userRepository.findOne({
        where: {
          email: data.email,
        },
      });

      if (findUser) {
        throw new HttpException(
          'Such user already exist!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = this.userRepository.create({ ...data });
      await this.userRepository.save(user);

      const role = await this.roleService.getByValue('USER');
      user.roles = [role];
      await this.userRepository.save(user);

      return this.authService.singIn({ id: +user.id, email: user.email });
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['roles'],
    });
  }
}
