import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { UserLoginDto } from './dto/request/user.login-request.dto';
import { IToken } from '../../common/interface/token.interface';
import * as bcrypt from 'bcrypt';
import { UserRegisterRequestDto } from './dto/request/user.register-request.dto';
import { RoleService } from '../role/role.service';
import { UserRoleEnum } from '../role/enum/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly roleService: RoleService,
    @InjectRedisClient()
    private readonly redisClient: RedisClient,
    private readonly jwtService: JwtService,
  ) {}

  public async register(dto: UserRegisterRequestDto): Promise<UserEntity> {
    const findUser = await this.userRepository.findOneBy({
      email: dto.email,
    });
    if (findUser) {
      throw new HttpException(
        'User already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const role = await this.roleService.getRoleByValue(UserRoleEnum.BUYER);
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const newUser = await this.userRepository.create({
      ...dto,
      roles: [role],
      password: hashPassword,
    });
    const token = this.signIn({ email: newUser.email });
    await this.redisClient.setEx(token, 10000, token);
    newUser.token = token;
    return await this.userRepository.save(newUser);
  }

  public async login(data: UserLoginDto): Promise<IToken> {
    try {
      const findUser = await this.userRepository.findOne({
        where: { email: data.email },
      });
      await this.comparePassword(data.password, findUser.password);
      const token = this.signIn({ email: findUser.email });
      await this.redisClient.setEx(token, 1000000, token);
      return { token };
    } catch (err) {
      throw new HttpException(
        'Email or password is wrong!',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  public signIn(data: any): string {
    return this.jwtService.sign(data);
  }

  public async validateUser(data): Promise<UserEntity> {
    const findUser = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
      relations: { roles: true, posts: true },
    });

    if (!findUser) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return findUser;
  }

  public async decode(token: string): Promise<any> {
    try {
      return this.jwtService.decode(token);
    } catch (err) {
      Logger.error(err);
    }
  }
  public async comparePassword(
    newPassword: string,
    oldPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(newPassword, oldPassword);
  }
}
