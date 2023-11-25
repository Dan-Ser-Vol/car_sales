import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@webeleon/nestjs-redis';

import { CommonConfigModule } from '../../config/database/config.module';
import { CommonConfigService } from '../../config/database/configuration.service';
import { RoleEntity } from '../../database/entities/role.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthConfigModule } from '../auth-config/auth-config.module';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    AuthConfigModule,
    RoleModule,
  ],
  providers: [AuthService, BearerStrategy, RoleService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
