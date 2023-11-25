import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from '@webeleon/nestjs-redis';

import { CommonConfigModule } from '../../config/database/config.module';
import { CommonConfigService } from '../../config/database/configuration.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
    }),
    JwtModule.registerAsync({
      imports: [CommonConfigModule],
      useFactory: async (commonConfigService: CommonConfigService) => ({
        secret: commonConfigService.jwt_secret,
        signOptions: {
          expiresIn: commonConfigService.jwt_expires_in,
        },
      }),
      inject: [CommonConfigService],
    }),
    RedisModule.forRootAsync({
      imports: [CommonConfigModule],
      useFactory: async (commonConfigService: CommonConfigService) => {
        return {
          url: commonConfigService.redis_url,
        };
      },
      inject: [CommonConfigService],
    }),
  ],
  exports: [PassportModule, JwtModule, RedisModule],
})
export class AuthConfigModule {}
