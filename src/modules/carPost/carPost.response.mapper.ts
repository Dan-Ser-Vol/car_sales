import { IList } from '../../common/interface/list.interface';
import { CarPostEntity } from '../../database/entities/carPost.entity';
import { CarPostBaseDto } from './dto/request/carPost-base.dto';
import { PostListQueryRequestDto } from './dto/request/post-list-query.request.dto';
import { CarPostDetailsResponseDto } from './dto/response/carPost-details-response.dto';

export class CarPostResponseMapper {
  static toDetailsListDto(data: CarPostEntity[]): any {
    return data.map(this.toDetailsDto);
  }

  static toListDto(
    data: IList<CarPostEntity>,
    query: PostListQueryRequestDto,
  ): any {
    return {
      data: data.entities.map(this.toListItemDto),
      total: data.total,
      ...query,
    };
  }

  static toListItemDto(data: CarPostEntity): CarPostDetailsResponseDto {
    return {
      id: data.id,
      brand: data.brand,
      model: data.model,
      year: data.year,
      image: data.image,
      mileage: data.mileage,
      bodyType: data.bodyType,
      status: data.status,
      price: data.price,
      currency: data.currency,
      sold: data.sold,
      region: data.region,
      description: data.description,
      user: data.user,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toDetailsDto(data: CarPostBaseDto): CarPostDetailsResponseDto {
    return {
      id: data.id,
      brand: data.brand,
      model: data.model,
      year: data.year,
      image: data.image,
      mileage: data.mileage,
      bodyType: data.bodyType,
      status: data.status,
      price: data.price,
      currency: data.currency,
      sold: data.sold,
      region: data.region,
      description: data.description,
      user: data.user,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
