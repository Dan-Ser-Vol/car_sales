import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarPost } from './carPost.entity';
import { CarPostController } from './carPost.controller';
import { CarPostService } from './carPost.service';
import { FileModule } from '../file/file.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CarPost]), FileModule, UserModule],
  controllers: [CarPostController],
  providers: [CarPostService],
})
export class CarPostModule {}
