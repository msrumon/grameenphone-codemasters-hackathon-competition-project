import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AppGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.get('Authorization')?.split(' ')[1];

    if (!token || !verify(token, process.env.JWT_SECRET)) {
      return false;
    }

    return true;
  }
}
