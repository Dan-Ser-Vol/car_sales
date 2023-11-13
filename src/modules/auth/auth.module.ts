import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@webeleon/nestjs-redis';

import { CommonConfigModule } from '../../config/database/config.module';
import { CommonConfigService } from '../../config/database/configuration.service';
import { RoleEntity } from '../../database/entities/role.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';

@Module({
  imports: [
    RedisModule,
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
    }),
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    RedisModule.forRootAsync({
      imports: [CommonConfigModule],
      useFactory: async (commonConfigService: CommonConfigService) => {
        return {
          url: commonConfigService.redis_url,
        };
      },
      inject: [CommonConfigService],
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
    RoleModule,
  ],
  providers: [AuthService, BearerStrategy, RoleService],
  controllers: [AuthController],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
