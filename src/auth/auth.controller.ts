import { Body, Controller, Post } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user.dto';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 200, type: User })
  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return await this.authService.register(data);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: User })
  @Post('login')
  async login(@Body() data: CreateUserDto) {
    return await this.authService.login(data);
  }
}
