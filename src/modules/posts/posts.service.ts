import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/user.entity';
import { Post } from './posts.entity';
import { PostResponseDto } from './dto/post-response.dto';
import { FileService } from '../file/file.service';
import { CreatePostRequestDto } from './dto/create-post.dto';
import { UpdatePostRequestDto } from './dto/post-update-request.dto';
import {UserService} from "../users/user.service";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly fileService: FileService,
    private readonly userService: UserService,
  ) {}

  async getAllPosts(data): Promise<Post[]> {
    return await this.postRepository.find(data);
  }

  async createPost(
    data: CreatePostRequestDto,
    image: any,
  ): Promise<PostResponseDto> {
    const fileName = await this.fileService.createFile(image);
    // const author = await this.userService.findUserById({
    //   where: { id: data.authorId },
    // });
    // if (!author) {
    //   throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    // }
    const post = await this.postRepository.create({
      ...data,
      image: fileName,
    });

    return await this.postRepository.save(post);
  }
  //
  // async updatePost(
  //   postId: number,
  //   data: UpdatePostRequestDto,
  // ): Promise<PostResponseDto> {
  //   const findPost = await this.findPostById(postId);
  //
  //   if (!findPost) {
  //     throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
  //   }
  //
  //   await this.postRepository.update(
  //     { id: +postId },
  //     {
  //       title: data.title,
  //       content: data.content,
  //     },
  //   );
  //
  //   return await this.findPostById(postId);
  // }
  //
  // async deletePost(postId: number) {
  //   const post = await this.findPostById(postId);
  //
  //   if (!post) {
  //     throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  //   }
  //
  //   await this.postRepository.remove(post);
  // }
  //
  // async findPostById(postId: number): Promise<Post> {
  //   const post = await this.postRepository.findOne({ where: { id: postId } });
  //
  //   if (!post) {
  //     throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  //   }
  //
  //   return post;
  // }
}
