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

@ApiTags('Posts')
@Controller()
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Create post' })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createPost(@Body() data, @UploadedFile() image) {
    console.log(image);
    return this.postService.createPost(data, image);
  }
}
