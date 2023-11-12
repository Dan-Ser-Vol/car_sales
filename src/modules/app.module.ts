import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfiguration } from '../config/database/type-orm-configuration';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { CarPostModule } from './carPost/carPost.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmConfiguration.config),
    UserModule,
    AuthModule,
    RoleModule,
    CarPostModule,
    FilesModule,
  ],
})
export class AppModule {}
