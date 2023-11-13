import { RoleEntity } from '../../database/entities/role.entity';
import { RoleResponseDto } from './dto/response/role-response.dto';

export class RoleResponseMapper {
  static toDetailsListDto(data: RoleEntity[]): RoleResponseDto[] {
    return data.map(this.toDetailsDto);
  }

  static toDetailsDto(data: RoleEntity): RoleResponseDto {
    return {
      value: data.value,
      description: data.description,
    };
  }
}
