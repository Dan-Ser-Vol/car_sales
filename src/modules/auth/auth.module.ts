import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';
import { User } from '../users/user.entity';
import { RolesModule } from '../roles/roles.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '@webeleon/nestjs-redis';

@Module({
  imports: [
    RolesModule,
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
      session: false,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY || 'Secret',
        signOptions: {
          expiresIn: process.env.JWT_EXP || '24h',
        },
        verifyOptions: {
          clockTolerance: 60,
          maxAge: process.env.JWT_EXP || '24h',
        },
      }),
    }),
    RedisModule.forRoot({
      url: 'redis://localhost:6379',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BearerStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
