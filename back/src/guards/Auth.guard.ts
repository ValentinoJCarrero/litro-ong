import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const tokenAuth: string | undefined = request.headers.authorization;

    if (!tokenAuth) {
      throw new UnauthorizedException('No autorizado, token no existe');
    } else if (!tokenAuth.startsWith('Bearer')) {
      throw new UnauthorizedException(
        'No autorizado, tipo de autenticación inválido',
      );
    }

    const tokenValid: string = tokenAuth.split(' ')[1];

    try {
      const secret: string = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(tokenValid, { secret });

      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);

      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('No autorizado');
    }
  }
}
