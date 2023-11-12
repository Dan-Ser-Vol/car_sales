import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
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
import { CarPostService } from './carPost.service';
import { CarPostCreateDto } from './dto/request/carPost-create.dto';
import { CarPostDetailsResponseDto } from './dto/response/carPost-details-response.dto';

@ApiTags('Cars Post')
@ApiBearerAuth()
@UseGuards(AuthGuard(), RolesGuard)
@RolesDecorator(UserRoleEnum.SELLER, UserRoleEnum.ADMIN)
@Controller('post')
export class CarPostController {
  constructor(private carPostService: CarPostService) {}

  @ApiOperation({ summary: 'Create new post' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: CarPostDetailsResponseDto,
  })
  @Post('create')
  async createCar(
    @Request() req: any,
    @Body() data: CarPostCreateDto,
  ): Promise<CarPostDetailsResponseDto> {
    try {
      return await this.carPostService.createPost(data, req.user.id);
    } catch (err) {
      console.log(err);
    }
  }

  // @UseInterceptors(FileInterceptor('image'))
  // @Post()
  // async addImageToPost(Body()postId:string , @UploadedFile() image: Express.Multer.File) {
  //   console.log(image);
  //   return await this.carPostService.addImageToPost(image, postId);
  // }

  // @ApiOperation({ summary: 'Get car by id' })
  // @Get(':carId')
  // async getCarById(
  //   @Param('carId') carId: string,
  // ): Promise<CarPostDetailsResponseDto> {
  //   try {
  //     const result = await this.carService.getCarById(carId);
  //     return CarPostResponseMapper.toDetailsDto(result);
  //   } catch (err) {
  //     throw new HttpException(err.message, HttpStatus.NOT_FOUND);
  //   }
  // }
  //
  // @ApiOperation({ summary: 'Update car by id' })
  // @Put(':carId')
  // async updateCar(
  //   @Param('carId') carId: string,
  //   @Body() body: CarPostUpdateDto,
  // ): Promise<CarPostDetailsResponseDto> {
  //   try {
  //     const result = await this.carService.updateCar(carId, body);
  //     return CarPostResponseMapper.toDetailsDto(result);
  //   } catch (err) {
  //     throw new HttpException(err.message, HttpStatus.NOT_FOUND);
  //   }
  // }
  //
  // @ApiOperation({ summary: 'Delete car by id' })
  // @Delete(':carId')
  // async deleteCar(@Param('carId') carId: string): Promise<void> {
  //   try {
  //     await this.carService.deleteCar(carId);
  //   } catch (err) {
  //     throw new HttpException(err.message, HttpStatus.NOT_FOUND);
  //   }
  // }
}
