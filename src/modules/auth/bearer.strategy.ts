import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { Strategy } from 'passport-http-bearer';

import { UserEntity } from '../../database/entities/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    @InjectRedisClient()
    readonly redisClient: RedisClient,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(token: string): Promise<UserEntity> {
    let user = null;
    try {
      if (!(await this.redisClient.exists(token))) {
        throw new UnauthorizedException();
      }
      await this.jwtService.verifyAsync(token);
      const tokenPayload = this.jwtService.decode(token);
      user = await this.authService.validateUser(tokenPayload);
    } catch (err) {
      Logger.error(err);
      throw new UnauthorizedException();
    }
    return user;
  }
}
