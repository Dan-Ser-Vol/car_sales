// cars.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarPostDto, ResponseCarDto } from './dto/carPost.dto';
import { CarQueryDto } from '../../common/query/car.query.dto';
import { paginateRawAndEntities } from 'nestjs-typeorm-paginate';
import { PaginatedDto } from '../../common/pagination/response';
import { CarPost } from './carPost.entity';
import { FileService } from '../file/file.service';
import { UserService } from '../users/user.service';
import { CarPostResponseDto } from './dto/carPostResponse.dto';

@Injectable()
export class CarPostService {
  constructor(
    @InjectRepository(CarPost)
    private readonly carPostRepository: Repository<CarPost>,
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  async create(
    data: CreateCarPostDto,
    image: any,
  ): Promise<CarPostResponseDto> {
    const fileName = await this.fileService.createFile(image);
    console.log(fileName);
    const post = this.carPostRepository.create({ ...data, image: fileName });
    return this.carPostRepository.save(post);
  }

  // async updateCar(id: number, updateCarDto: UpdateCarDto) {
  //   const carPost = await this.carRepository.findOne(id);
  //   if (!carPost) {
  //     console.log(updateCarDto);
  //   }
  //
  //   // Update carPost properties
  //
  //   return this.carRepository.save(carPost);
  // }

  // async getAll(query: CarQueryDto): Promise<PaginatedDto<ResponseCarDto>> {
  //   query.sort = query.sort || 'id';
  //   query.order = query.order || 'ASC';
  //   const options = {
  //     page: query.page || 1,
  //     limit: query.limit || 20,
  //   };
  //
  //   const queryBuilder = this.carRepository.createQueryBuilder('cars');
  //
  //   if (query.search) {
  //     queryBuilder.where('"title" IN(:...search)', {
  //       search: query.search.split(','),
  //     });
  //   }
  //
  //   queryBuilder.orderBy(`"${query.sort}"`, query.order as 'ASC' | 'DESC');
  //
  //   const [pagination, rawResults] = await paginateRawAndEntities(
  //     queryBuilder,
  //     options,
  //   );
  //
  //   return {
  //     page: pagination.meta.currentPage,
  //     totalPages: pagination.meta.totalPages,
  //     countItems: pagination.meta.totalItems,
  //     entities: rawResults as ResponseCarDto[],
  //   };
  // }
}
