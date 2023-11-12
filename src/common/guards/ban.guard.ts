import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { BAN_KEY } from '../decorators/ban.decorator';

@Injectable()
export class BanUserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let userTypeAllowed = this.reflector.get<string[]>(
      BAN_KEY,
      context.getHandler(),
    );
    if (!userTypeAllowed) {
      userTypeAllowed = this.reflector.get<string[]>(
        BAN_KEY,
        context.getClass(),
      );
      if (!userTypeAllowed) {
        return true;
      }
    }
    const user = request.user;

    if (!userTypeAllowed.includes(user.banned)) {
      throw new HttpException(
        'Access denied. You have been banned by the administrator!',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
