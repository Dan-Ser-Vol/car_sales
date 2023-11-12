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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RolesDecorator } from '../../common/decorators/role.decorator';
import { RolesGuard } from '../../common/guards/role.guard';
import { UserRoleEnum } from '../role/enum/user-role.enum';
import { UserUpdateRequestDto } from './dto/request/user.update-request.dto';
import { UserListQueryRequestDto } from './dto/request/user-list-query.request.dto';
import { UserDetailsResponseDto } from './dto/response/user.details-response.dto';
import { UserListResponseDto } from './dto/response/user.list-response.dto';
import { UserUpdateResponseDto } from './dto/response/user.update-response.dto';
import { UserResponseMapper } from './user.response.mapper';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @RolesDecorator(
    UserRoleEnum.MANAGER,
    UserRoleEnum.ADMIN,
    UserRoleEnum.BUYER,
    UserRoleEnum.SELLER,
  )
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: UserListResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Get()
  async getAllUsers(
    @Query() query: UserListQueryRequestDto,
  ): Promise<UserListResponseDto> {
    try {
      const result = await this.userService.getAll(query);
      return UserResponseMapper.toListDto(result, query);
    } catch (err) {
      throw new HttpException(err.massege, HttpStatus.BAD_REQUEST);
    }
  }

  @RolesDecorator(
    UserRoleEnum.MANAGER,
    UserRoleEnum.ADMIN,
    UserRoleEnum.BUYER,
    UserRoleEnum.SELLER,
  )
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: UserDetailsResponseDto,
  })
  @Get(':userId')
  async getById(
    @Param('userId') userId: string,
  ): Promise<UserDetailsResponseDto> {
    try {
      const result = await this.userService.getById(userId);
      return UserResponseMapper.toDetailsDto(result);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @RolesDecorator(
    UserRoleEnum.MANAGER,
    UserRoleEnum.ADMIN,
    UserRoleEnum.BUYER,
    UserRoleEnum.SELLER,
  )
  @ApiOperation({ summary: 'update user by id' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: UserUpdateResponseDto,
  })
  @Put('update/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() data: UserUpdateRequestDto,
  ): Promise<UserUpdateResponseDto> {
    try {
      const result = await this.userService.updateUser(userId, data);
      return UserResponseMapper.toDetailsDto(result);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @RolesDecorator(UserRoleEnum.MANAGER, UserRoleEnum.ADMIN)
  @ApiOperation({ summary: 'Banned or unbanned user' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: UserDetailsResponseDto,
  })
  @Post('ban/:userId')
  async ban(
    @Param('userId') userId: string,
    @Body('status') status: string,
  ): Promise<UserDetailsResponseDto> {
    const result = await this.userService.banStatus(userId, status);
    return UserResponseMapper.toDetailsDto(result);
  }

  @RolesDecorator(UserRoleEnum.MANAGER, UserRoleEnum.ADMIN)
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
  })
  @Delete('delete/:userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    try {
      await this.userService.deleteUser(userId);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
