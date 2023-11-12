import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleEntity } from '../../database/entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { CommonConfigModule } from '../../config/database/config.module';
import { CommonConfigService } from '../../config/database/configuration.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserEntity } from '../../database/entities/user.entity';

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
