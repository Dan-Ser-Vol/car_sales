import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonConfigModule } from '../../config/database/config.module';
import { CommonConfigService } from '../../config/database/configuration.service';
import { RoleEntity } from '../../database/entities/role.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([RoleEntity, UserEntity]),
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
  ],
  providers: [RoleService, UserService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
