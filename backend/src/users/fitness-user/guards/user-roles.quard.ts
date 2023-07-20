import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/types/user-role.enum';
import { ROLES_KEY } from '../decorators/user-roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private iwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Пользователь не авторизован',
          },
          HttpStatus.FORBIDDEN,
        );
      }
      const user = this.iwtService.verify(token);
      req.user = user;
      return requiredRoles.includes(user.userRole);
    } catch (e) {
      {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Пользователь не авторизован',
          },
          HttpStatus.FORBIDDEN,
        );
      }
    }
  }
}
