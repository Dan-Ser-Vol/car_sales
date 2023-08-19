import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import {BanUserDto} from "./dto/ban-user.dto";

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Add role' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('/role')
  async addRole(@Body() data: AddRoleDto) {
    return this.userService.addRole(data);
  }

  @ApiOperation({ summary: 'banned user' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('/ban')
  async ban(@Body() data: BanUserDto) {
    return this.userService.ban(data);
  }
}
