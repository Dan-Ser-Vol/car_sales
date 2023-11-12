import { SetMetadata } from '@nestjs/common';

export const BAN_KEY = 'banned';
export const BanDecorator = (...banned: string[]) =>
  SetMetadata(BAN_KEY, banned);
