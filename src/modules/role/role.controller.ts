import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
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
import { CreateRoleDto } from './dto/request/create-role.dto';
import { RoleValueDto } from './dto/request/role-value.dto';
import { RoleResponseDto } from './dto/response/role-response.dto';
import { UserRoleEnum } from './enum/user-role.enum';
import { RoleService } from './role.service';

@ApiTags('Roles')
@Controller('roles')
@ApiBearerAuth()
@UseGuards(AuthGuard(), RolesGuard)
@RolesDecorator(UserRoleEnum.ADMIN, UserRoleEnum.MANAGER)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Create new role' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: RoleResponseDto,
  })
  @Post()
  create(@Body() dto: CreateRoleDto): Promise<RoleResponseDto> {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: RoleResponseDto,
  })
  @Get('/:value')
  getByValue(@Param('value') value: RoleValueDto): Promise<RoleResponseDto> {
    return this.roleService.getRoleByValue(value);
  }

  @ApiOperation({ summary: 'Add new role to user' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @Post('/:userId')
  async addRoleById(
    @Param('userId') userId: string,
    @Body() role: CreateRoleDto,
  ): Promise<string> {
    await this.roleService.addRoleToUserBy(userId, role);
    return `The role ${role.value} has been added`;
  }

  @ApiOperation({ summary: ' Delete the role' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @Delete('delete/:value')
  async deleteUser(@Param('value') value: RoleValueDto): Promise<string> {
    try {
      await this.roleService.deleteRoleByValue(value);
      return `The role ${value} has been deleted `;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
