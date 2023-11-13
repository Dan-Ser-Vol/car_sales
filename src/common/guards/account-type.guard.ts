import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ACCOUNT_TYPE_KEY } from '../decorators/account-type.decorator';

@Injectable()
export class AccountTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let userTypeAllowed = this.reflector.get<string[]>(
      ACCOUNT_TYPE_KEY,
      context.getHandler(),
    );
    if (!userTypeAllowed) {
      userTypeAllowed = this.reflector.get<string[]>(
        ACCOUNT_TYPE_KEY,
        context.getClass(),
      );
      if (!userTypeAllowed) {
        return true;
      }
    }
    const user = request.user;

    if (!userTypeAllowed.includes(user.accountType)) {
      throw new HttpException(
        'Access denied! Because you have basic account!',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
