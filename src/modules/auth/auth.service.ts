import {
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
import { CreateLoginSocialDto, CreateUserDto } from '../users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';
import { OAuth2Client } from 'google-auth-library';
import { IToken } from './interfaces/token.interface';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
    public readonly roleService: RolesService,
  ) {}

  async register(data: CreateUserDto): Promise<User> {
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
    return await this.userRepository.save(user);
  }

  async login(data: CreateUserDto): Promise<IToken> {
    try {
      return await this.validateUser(data);
    } catch (e) {
      throw new HttpException("User isn't register", HttpStatus.UNAUTHORIZED);
    }
  }

  async loginSocial(data: CreateLoginSocialDto): Promise<IToken> {
    try {
      const oAuthClient = new OAuth2Client(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
      );

      const result = oAuthClient.verifyIdToken({ idToken: data.accessToken });

      const tokenPayload = (await result).getPayload();

      const token = this.singIn({ id: Number(tokenPayload.sub) });
      return { token };
    } catch (e) {
      throw new HttpException('Google auth failed', HttpStatus.UNAUTHORIZED);
    }
  }

  singIn(payload: EJwtPayload): string {
    return this.jwtService.sign(payload);
  }

  private async validateUser(data: CreateUserDto): Promise<IToken> {
    const user = await this.getByEmail(data.email);
    const isMatch = await this.compareHash(data.password, user.password);
    if (user && isMatch) {
      const token = this.singIn({
        id: Number(user.id),
        email: user.email,
        roles: user.roles,
      });
      return { token };
    }
    throw new UnauthorizedException('Incorrect password or email');
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
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

  async getByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  // private async verifyToken(token: string): Promise<EJwtPayload> {
  //   try {
  //     return this.jwtService.verify(token);
  //   } catch (e) {
  //     console.log(new Date().toISOString(), token);
  //     throw new UnauthorizedException();
  //   }
  // }
}
