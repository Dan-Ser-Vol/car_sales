import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  async create(@Body() data: CreateRoleDto) {
    return this.roleService.create(data);
  }

  @Get('/:value')
  async getByValue(@Param('value') value: string) {
    return this.roleService.getByValue(value);
  }
}
