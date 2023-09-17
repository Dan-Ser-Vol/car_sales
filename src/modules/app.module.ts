import { Module } from '@nestjs/common';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfiguration } from '../config/database/type-orm-configuration';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { AccountsModule } from './accounts/accounts.module';
import { CarPostModule } from './carPost/carPost.module';
import { PostsModule } from './posts/posts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmConfiguration.config),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    UserModule,
    AuthModule,
    RolesModule,
    AccountsModule,
    CarPostModule,
    PostsModule,
    PassportModule,
    JwtModule,
  ],
})
export class AppModule {}
