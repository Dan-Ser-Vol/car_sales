import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { EJwtPayload } from './interfaces/auth.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
  ) {}

  async singIn(payload: EJwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
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

  async verify(token: string): Promise<EJwtPayload> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      console.log(new Date().toISOString(), token);
      throw new UnauthorizedException();
    }
  }
}
