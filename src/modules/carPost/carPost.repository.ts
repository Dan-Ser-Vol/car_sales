import { Injectable } from '@nestjs/common';
import { CarPostEntity } from '../../database/entities/carPost.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CarPostRepository extends Repository<CarPostEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarPostEntity, dataSource.manager);
  }
}
