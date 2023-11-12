import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserResponseMapper } from './user.response.mapper';
import { UserUpdateRequestDto } from './dto/request/user.update-request.dto';
import { UserUpdateResponseDto } from './dto/response/user.update-response.dto';
import { UserListQueryRequestDto } from './dto/request/user-list-query.request.dto';
import { UserListResponseDto } from './dto/response/user.list-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDetailsResponseDto } from './dto/response/user.details-response.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard())
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

  @ApiOperation({ summary: 'Get user by id' })
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

  @ApiOperation({ summary: 'update user by id' })
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

  @ApiOperation({ summary: 'Delete user by id' })
  @Delete('delete/:userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    try {
      await this.userService.deleteUser(userId);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
