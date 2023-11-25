import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from '../../database/entities/role.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthConfigModule } from '../auth-config/auth-config.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([RoleEntity, UserEntity]),
    AuthConfigModule,
  ],
  providers: [RoleService, UserService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
