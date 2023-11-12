import { Module } from '@nestjs/common';
import { CarPostController } from './carPost.controller';
import { CarPostService } from './carPost.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarPostRepository } from './carPost.repository';
import { AuthModule } from '../auth/auth.module';
import { CarPostEntity } from '../../database/entities/carPost.entity';
import { UserModule } from '../user/user.module';
import { FilesModule } from '../files/files.module';
import { FilesService } from '../files/files.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarPostEntity]),
    AuthModule,
    UserModule,
    FilesModule,
  ],
  controllers: [CarPostController],
  providers: [CarPostService, CarPostRepository, FilesService],
  exports: [CarPostService, CarPostRepository],
})
export class CarPostModule {}
