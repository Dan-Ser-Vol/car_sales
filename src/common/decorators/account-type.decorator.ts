import { SetMetadata } from '@nestjs/common';

import { AccountTypeEnum } from '../../modules/user/enum/account-type.enum';

export const ACCOUNT_TYPE_KEY = 'accountType';
export const AccountTypeDecorator = (...accountType: AccountTypeEnum[]) =>
  SetMetadata(ACCOUNT_TYPE_KEY, accountType);
