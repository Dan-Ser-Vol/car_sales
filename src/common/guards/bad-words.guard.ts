import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import badWordsFilter from 'bad-words';
import { Observable } from 'rxjs';

@Injectable()
export class BadWordsGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    if (this.containsBadWords(body)) {
      const badWord = this.containsBadWords(body);
      throw new HttpException(
        `Access denied due to bad words: ${badWord}`,
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }

  private containsBadWords(body: any): boolean {
    const filter = new badWordsFilter();
    for (const key in body) {
      if (typeof body[key] === 'string' && filter.isProfane(body[key])) {
        return body[key];
      }
    }
    return false;
  }
}
