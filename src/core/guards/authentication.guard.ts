import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    let request: Request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }

    let token = request.headers.authorization.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      // @ts-ignore
      request.user = this.jwtService.verify(token);
      return true;
    } catch (exc) {
      return false;
    }
  }
}
