import { SetMetadata } from '@nestjs/common';

import { BanStatusEnum } from '../../modules/user/enum/ban-status.enum';

export const BAN_KEY = 'banned';
export const BanDecorator = (...banned: BanStatusEnum[]) =>
  SetMetadata(BAN_KEY, banned);
