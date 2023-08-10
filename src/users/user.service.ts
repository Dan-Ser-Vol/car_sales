import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';
import { AuthService } from '../auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
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

      return this.authService.singIn({ id: +user.id, email: user.email });
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
