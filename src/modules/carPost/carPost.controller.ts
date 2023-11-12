import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AccountTypeDecorator } from '../../common/decorators/account-type.decorator';
import { RolesDecorator } from '../../common/decorators/role.decorator';
import { AccountTypeGuard } from '../../common/guards/account-type.guard';
import { RolesGuard } from '../../common/guards/role.guard';
import { UserRoleEnum } from '../role/enum/user-role.enum';
import { AccountTypeEnum } from '../user/enum/account-type.enum';
import { CarPostResponseMapper } from './carPost.response.mapper';
import { CarPostService } from './carPost.service';
import { CarPostCreateDto } from './dto/request/carPost-create.dto';
import { CarPostUpdateDto } from './dto/request/carPost-update.dto';
import { ImageDto } from './dto/request/image.dto';
import { PostListQueryRequestDto } from './dto/request/post-list-query.request.dto';
import { CarPostDetailsResponseDto } from './dto/response/carPost-details-response.dto';

@ApiTags('Cars Post')
@ApiBearerAuth()
@UseGuards(AuthGuard(), RolesGuard, AccountTypeGuard)
@Controller('posts')
export class CarPostController {
  constructor(private carPostService: CarPostService) {}

  @RolesDecorator(UserRoleEnum.SELLER, UserRoleEnum.ADMIN, UserRoleEnum.MANAGER)
  @ApiOperation({ summary: 'Create new post' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: CarPostDetailsResponseDto,
  })
  @Post('create')
  async createCar(
    @Request() req: any,
    @Body() data: CarPostCreateDto,
  ): Promise<CarPostDetailsResponseDto> {
    try {
      const result = await this.carPostService.createPost(data, req.user.id);
      return CarPostResponseMapper.toDetailsDto(result);
    } catch (err) {
      console.log(err);
    }
  }

  @RolesDecorator(
    UserRoleEnum.BUYER,
    UserRoleEnum.SELLER,
    UserRoleEnum.ADMIN,
    UserRoleEnum.MANAGER,
  )
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: CarPostDetailsResponseDto,
  })
  @Get()
  async getAllPost(
    @Query() query: PostListQueryRequestDto,
  ): Promise<CarPostDetailsResponseDto> {
    try {
      const result = await this.carPostService.getAll(query);
      return CarPostResponseMapper.toListDto(result, query);
    } catch (err) {
      throw new HttpException(err.massege, HttpStatus.BAD_REQUEST);
    }
  }

  @RolesDecorator(UserRoleEnum.SELLER, UserRoleEnum.ADMIN, UserRoleEnum.MANAGER)
  @AccountTypeDecorator(AccountTypeEnum.PREMIUM)
  @ApiOperation({ summary: 'Add an image to the post' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: CarPostDetailsResponseDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  @Post('image/:postId')
  async addImageToPost(
    @Param('postId') postId: string,
    @UploadedFile() image: ImageDto,
  ): Promise<CarPostDetailsResponseDto> {
    try {
      const result = await this.carPostService.addImageToPost(postId, image);
      return CarPostResponseMapper.toDetailsDto(result);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @RolesDecorator(UserRoleEnum.SELLER, UserRoleEnum.ADMIN, UserRoleEnum.MANAGER)
  @AccountTypeDecorator(AccountTypeEnum.PREMIUM)
  @ApiOperation({ summary: 'Delete an image to the post' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
  })
  @Delete('image/:postId')
  async DeleteImageToPost(
    @Param('postId') postId: string,
    @Body('image') image: ImageDto,
  ): Promise<void> {
    try {
      await this.carPostService.deleteImageFromPost(postId, image);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @RolesDecorator(
    UserRoleEnum.BUYER,
    UserRoleEnum.SELLER,
    UserRoleEnum.ADMIN,
    UserRoleEnum.MANAGER,
  )
  @ApiOperation({ summary: 'Get post by id' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: CarPostDetailsResponseDto,
  })
  @Get(':postId')
  async getPostById(
    @Param('postId') postId: string,
  ): Promise<CarPostDetailsResponseDto> {
    try {
      const result = await this.carPostService.getCarPostById(postId);
      return CarPostResponseMapper.toDetailsDto(result);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @RolesDecorator(
    UserRoleEnum.BUYER,
    UserRoleEnum.SELLER,
    UserRoleEnum.ADMIN,
    UserRoleEnum.MANAGER,
  )
  @ApiOperation({ summary: 'Get post by user id' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: CarPostDetailsResponseDto,
  })
  @Get('user/:userId')
  async getPostByUserId(
    @Param('userId') userId: string,
  ): Promise<CarPostDetailsResponseDto[]> {
    try {
      const result = await this.carPostService.getCarPostByUserId(userId);
      return CarPostResponseMapper.toDetailsListDto(result);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @RolesDecorator(UserRoleEnum.SELLER, UserRoleEnum.ADMIN)
  @ApiOperation({ summary: 'Update car post by id' })
  @ApiResponse({
    status: 200,
    description: 'The post has been updated',
    type: CarPostDetailsResponseDto,
  })
  @Put('update/:postId')
  async updateCarPost(
    @Param('postId') postId: string,
    @Body() body: CarPostUpdateDto,
  ): Promise<CarPostDetailsResponseDto> {
    try {
      const result = await this.carPostService.updateCarPost(postId, body);
      return CarPostResponseMapper.toDetailsDto(result);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @RolesDecorator(UserRoleEnum.SELLER, UserRoleEnum.ADMIN)
  @ApiOperation({ summary: 'Delete car post by id' })
  @ApiResponse({
    status: 200,
    description: 'The post has been deleted',
    type: CarPostDetailsResponseDto,
  })
  @Delete(':postId')
  async deleteCar(@Param('postId') postId: string): Promise<void> {
    try {
      await this.carPostService.deleteCarPostById(postId);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
