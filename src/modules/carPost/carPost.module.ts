import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarPostEntity } from '../../database/entities/carPost.entity';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';
import { FilesService } from '../files/files.service';
import { UserModule } from '../user/user.module';
import { CarPostController } from './carPost.controller';
import { CarPostRepository } from './carPost.repository';
import { CarPostService } from './carPost.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarPostEntity]),
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
    }),
    AuthModule,
    UserModule,
    FilesModule,
  ],
  controllers: [CarPostController],
  providers: [CarPostService, CarPostRepository, FilesService],
  exports: [CarPostService, CarPostRepository],
})
export class CarPostModule {}
