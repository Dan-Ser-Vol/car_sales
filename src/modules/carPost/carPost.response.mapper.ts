import { CarPostEntity } from '../../database/entities/carPost.entity';
import { CarPostDetailsResponseDto } from './dto/response/carPost-details-response.dto';

export class CarPostResponseMapper {
  static toDetailsListDto(data: CarPostEntity[]): CarPostDetailsResponseDto[] {
    return data.map(this.toDetailsDto);
  }

  static toListItemDto() {
    return;
  }

  static toDetailsDto(data: CarPostEntity): CarPostDetailsResponseDto {
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
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
