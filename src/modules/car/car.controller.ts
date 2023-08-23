// cars.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateCarDto, PublicCarData } from './dto/car.dto';
import { CarService } from './car.service';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { CarQueryDto } from '../../common/query/car.query.dto';
import {ApiPaginatedResponse, PaginatedDto} from '../../common/pagination/response';

// @UseGuards(AuthGuard('bearer'))
@ApiTags('cars')
@ApiExtraModels(PublicCarData, PaginatedDto)
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    return await this.carService.create(createCarDto);
  }

  //
  // @Put(':id')
  // updateCar(@Body() updateCarDto: UpdateCarDto, @Param('id') id: number) {
  //   return this.carService.updateCar(id, updateCarDto);
  // }
@ApiPaginatedResponse('entities', PublicCarData)
  @Get()
  async getAll(@Query() query: CarQueryDto) {
    return await this.carService.getAll(query);
  }
}
