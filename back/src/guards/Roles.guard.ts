import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/entities/Role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles) {
      throw new UnauthorizedException('No estás autorizado. Acceso denegado');
    }

    const verifyRole = () =>
      requiredRoles.some((role) =>
        user.roles.some((userRole) => userRole.role === role),
      );
    const valid: boolean = user && user.roles && verifyRole();

    if (!valid) {
      throw new UnauthorizedException('No estas autorizado. Acceso denegado');
    }

    return valid;
  }
}
