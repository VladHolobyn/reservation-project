import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}


  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if(!token) {
      throw new UnauthorizedException("Invalid token");
    }

    try {
      const payload = this.jwtService.verify(token);
      request.userId = payload.userId;
    } catch(e) {
      Logger.error(e.message);
      throw new UnauthorizedException("Invalid token");
    }

    return true;
  }
  
}
