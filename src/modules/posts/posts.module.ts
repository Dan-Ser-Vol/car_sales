import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { UserModule } from '../users/user.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule, FileModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
