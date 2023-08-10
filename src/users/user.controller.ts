import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@UseGuards(AuthGuard())
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return await this.userService.create(userDto);
  }

  @UseGuards(AuthGuard())
  @Get()
  async getAll() {
    return this.userService.getAll();
  }
}
