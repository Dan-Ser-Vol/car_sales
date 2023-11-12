import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { IList } from '../../common/interface/list.interface';
import { CarPostEntity } from '../../database/entities/carPost.entity';
import { PostListQueryRequestDto } from './dto/request/post-list-query.request.dto';
import { PostListOrderFieldEnum } from './enum/post-list-order-field.enum';

@Injectable()
export class CarPostRepository extends Repository<CarPostEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarPostEntity, dataSource.manager);
  }

  public async getAll(
    query: PostListQueryRequestDto,
  ): Promise<IList<CarPostEntity>> {
    const queryBuilder = this.createQueryBuilder('post');

    if (query.search) {
      queryBuilder.where(
        'LOWER(post.brand) LIKE :search OR LOWER(post.model) LIKE :search',
        {
          search: `%${query.search}%`,
        },
      );
    }

    switch (query.orderBy) {
      case PostListOrderFieldEnum.createdAt:
      case PostListOrderFieldEnum.year:
      case PostListOrderFieldEnum.price:
        queryBuilder.orderBy(`post.${query.orderBy}`, query.order);
        break;
      default:
        queryBuilder.orderBy('post.createdAt', 'DESC');
        break;
    }

    queryBuilder.take(query.limit);

    queryBuilder.skip(query.offset);

    const [entities, total] = await queryBuilder.getManyAndCount();

    return { entities, total };
  }
}
