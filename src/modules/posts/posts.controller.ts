import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostRequestDto } from './dto/create-post.dto';
import { RolesGuard } from '../auth/roles.guard';
import { PostResponseDto } from './dto/post-response.dto';
import { Roles } from '../auth/roles-auth.decorator';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  // @ApiOperation({ summary: 'Get all posts' })
  // @Get()
  // @UseInterceptors(FileInterceptor('image'))
  // getAllPosts(@Body() data: CreatePostRequestDto) {
  //   return this.postService.getAllPosts(data);
  // }

  @ApiOperation({ summary: 'Create post' })
  // @Roles('ADMIN', 'MANAGER', 'SELLER')
  // @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @Body() data: CreatePostRequestDto,
    @UploadedFile() image,
  ): Promise<PostResponseDto> {
    return this.postService.createPost(data, image);
  }
  //
  // @ApiOperation({ summary: 'Update post' })
  // @Roles('ADMIN', 'MANAGER', 'SELLER')
  // // @UseGuards(RolesGuard)
  // @Patch(':postId')
  // updatePost(
  //   @Param('postId', ParseIntPipe) postId: number,
  //   @Body() data: CreatePostRequestDto,
  // ): Promise<PostResponseDto> {
  //   return this.postService.updatePost(postId, data);
  // }
  //
  // @ApiOperation({ summary: 'Delete post' })
  // @Roles('ADMIN', 'MANAGER')
  // @UseGuards(RolesGuard)
  // @Delete(':postId')
  // async deleteCar(@Param('postId', ParseIntPipe) postId: number) {
  //   await this.postService.deletePost(postId);
  //
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'Post deleted successfully',
  //   };
  // }
}
