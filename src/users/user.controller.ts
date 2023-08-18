import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('users')
// @UseGuards(AuthGuard())
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getAll() {
    return this.userService.getAll();
  }
}
