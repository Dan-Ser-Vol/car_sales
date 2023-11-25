import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forFeature([UserEntity, RoleEntity, RoleService]),
    AuthConfigModule,
    RoleModule,
  ],
  providers: [AuthService, BearerStrategy, RoleService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
