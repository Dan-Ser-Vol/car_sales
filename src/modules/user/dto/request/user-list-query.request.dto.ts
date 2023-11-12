import { OrderEnum } from '../../../../common/enum/order.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserListOrderFieldEnum } from '../../enum/user-list-order-field.enum';
import { PaginationQueryDto } from '../../../../common/dto/pagination.query.dto';
import { Transform } from 'class-transformer';

export class UserListQueryRequestDto extends PaginationQueryDto {
  @IsEnum(OrderEnum)
  @IsOptional()
  order?: OrderEnum = OrderEnum.ASC;

  @IsEnum(UserListOrderFieldEnum)
  @IsOptional()
  orderBy?: UserListOrderFieldEnum = UserListOrderFieldEnum.createdAt;

  @Transform(({ value }) => value.toLowerCase())
  @IsString()
  @IsOptional()
  search?: string;
}
