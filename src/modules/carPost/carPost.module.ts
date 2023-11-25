import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarPostEntity } from '../../database/entities/carPost.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthConfigModule } from '../auth-config/auth-config.module';
import { FilesModule } from '../files/files.module';
import { UserModule } from '../user/user.module';
import { CarPostController } from './carPost.controller';
import { CarPostRepository } from './carPost.repository';
import { CarPostService } from './carPost.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarPostEntity]),
    AuthConfigModule,
    UserModule,
    FilesModule,
  ],
  controllers: [CarPostController],
  providers: [CarPostService, CarPostRepository],
  exports: [CarPostService, CarPostRepository],
})
export class CarPostModule {}
