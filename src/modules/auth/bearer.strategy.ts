import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { Strategy } from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    @InjectRedisClient() private redisClient: RedisClient,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY || 'Extra_Difficult_Secret_Key',
    });
  }

  async validate(token): Promise<User> {
    let user: User;
    try {
      if (!(await this.redisClient.exists(token))) {
        throw new UnauthorizedException();
      }
      const payload = await this.jwtService.verify(token);
      user = await this.authService.isUserExist(payload);
    } catch (e) {
      console.log(new Date().toISOString(), token);
      throw new UnauthorizedException();
    }
    return user;
  }
}
