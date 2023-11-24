import { SetMetadata } from '@nestjs/common';

import { UserRoleEnum } from '../../modules/role/enum/user-role.enum';

export const ROLES_KEY = 'roles';
export const RolesDecorator = (...roles: UserRoleEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
