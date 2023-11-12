import { SetMetadata } from '@nestjs/common';

export const ACCOUNT_TYPE_KEY = 'accountType';
export const AccountTypeDecorator = (...accountType: string[]) =>
  SetMetadata(ACCOUNT_TYPE_KEY, accountType);
