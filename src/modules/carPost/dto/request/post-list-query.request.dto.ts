import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '../../../../common/dto/pagination.query.dto';
import { OrderEnum } from '../../../../common/enum/order.enum';
import { PostListOrderFieldEnum } from '../../enum/post-list-order-field.enum';

export class PostListQueryRequestDto extends PaginationQueryDto {
  @IsEnum(OrderEnum)
  @IsOptional()
  order?: OrderEnum = OrderEnum.ASC;

  @IsEnum(PostListOrderFieldEnum)
  @IsOptional()
  orderBy?: PostListOrderFieldEnum = PostListOrderFieldEnum.createdAt;

  @Transform(({ value }) => value.toLowerCase())
  @IsString()
  @IsOptional()
  search?: string;
}
