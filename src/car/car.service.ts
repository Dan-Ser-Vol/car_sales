// cars.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CreateCarDto, PublicCarData } from './dto/car.dto';
import { CarQueryDto } from '../common/query/car.query.dto';
import { paginateRawAndEntities } from 'nestjs-typeorm-paginate';
import { PaginatedDto } from '../common/pagination/response';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    const car = this.carRepository.create(createCarDto);
    return this.carRepository.save(car);
  }

  // async updateCar(id: number, updateCarDto: UpdateCarDto) {
  //   const car = await this.carRepository.findOne(id);
  //   if (!car) {
  //     console.log(updateCarDto);
  //   }
  //
  //   // Update car properties
  //
  //   return this.carRepository.save(car);
  // }

  async getAll(query: CarQueryDto): Promise<PaginatedDto<PublicCarData>> {
    query.sort = query.sort || 'id';
    query.order = query.order || 'ASC';
    const options = {
      page: query.page || 1,
      limit: query.limit || 20,
    };

    const queryBuilder = this.carRepository.createQueryBuilder('cars');

    if (query.search) {
      queryBuilder.where('"title" IN(:...search)', {
        search: query.search.split(','),
      });
    }

    queryBuilder.orderBy(`"${query.sort}"`, query.order as 'ASC' | 'DESC');

    const [pagination, rawResults] = await paginateRawAndEntities(
      queryBuilder,
      options,
    );

    return {
      page: pagination.meta.currentPage,
      totalPages: pagination.meta.totalPages,
      countItems: pagination.meta.totalItems,
      entities: rawResults as PublicCarData[],
    };
  }
}
