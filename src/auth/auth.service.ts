import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { EJwtPayload } from './interfaces/auth.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
    public readonly roleService: RolesService,
  ) {}

  async register(@Body() data: CreateUserDto): Promise<string> {
    const candidate = await this.getByEmail(data.email);
    if (candidate) {
      throw new HttpException(
        'This user already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(data.password, 5);
    const user = this.userRepository.create({
      ...data,
      password: hashPassword,
    });
    await this.userRepository.save(user);

    const role = await this.roleService.getByValue('USER');
    user.roles = [role];
    await this.userRepository.save(user);

    return this.singIn({ id: +user.id, email: user.email });
  }

  async login(data: CreateUserDto) {
    const user = await this.validateUser(data);
    return this.singIn({ id: Number(user.id), email: user.email });
  }

  async singIn(payload: EJwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }

  private async validateUser(data: CreateUserDto) {
    const user = await this.getByEmail(data.email);
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (user && isMatch) {
      return user;
    }
    throw new UnauthorizedException('Incorrect password or email');
  }

  async validate(data: EJwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: Number(data.id),
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private async verifyToken(token: string): Promise<EJwtPayload> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      console.log(new Date().toISOString(), token);
      throw new UnauthorizedException();
    }
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }
}
