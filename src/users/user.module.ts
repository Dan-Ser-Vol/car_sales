import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, RolesModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
