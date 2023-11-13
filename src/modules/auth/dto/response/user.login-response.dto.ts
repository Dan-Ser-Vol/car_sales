import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { IToken } from '../../../../common/interface/token.interface';

export class UserLoginResponseDto {
  @ApiProperty()
  @IsString()
  token: IToken;
}
