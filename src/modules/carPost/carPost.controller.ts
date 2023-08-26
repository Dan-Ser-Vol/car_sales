// cars.controller.ts
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCarPostDto, ResponseCarDto } from './dto/carPost.dto';
import { CarPostService } from './carPost.service';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { PaginatedDto } from '../../common/pagination/response';
import { CarPostResponseDto } from './dto/carPostResponse.dto';
import { FileInterceptor } from '@nestjs/platform-express';

// @UseGuards(AuthGuard('bearer'))
@ApiTags('cars posts')
@ApiExtraModels(ResponseCarDto, PaginatedDto)
@Controller('posts')
export class CarPostController {
  constructor(private readonly carPostService: CarPostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() data: CreateCarPostDto,
    @UploadedFile() image,
  ): Promise<CarPostResponseDto> {
    console.log(image);
    return await this.carPostService.create(data, image);
  }

  //
  // @Put(':id')
  // updateCar(@Body() updateCarDto: UpdateCarDto, @Param('id') id: number) {
  //   return this.carService.updateCar(id, updateCarDto);
  // }
  // @ApiPaginatedResponse('entities', ResponseCarDto)
  // @Get()
  // async getAll(@Query() query: CarQueryDto) {
  //   return await this.carPostService.getAll(query);
  // }
}
