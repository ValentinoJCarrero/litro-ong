import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class RemoveDataSensitive implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((response) => {
        if (Array.isArray(response)) {
          response = response.map((item) => {
            this.removeSensitiveData(item);
            return item;
          });
        } else {
          if (response && typeof response === 'object') {
            this.removeSensitiveData(response);
          }
        }
        return response;
      }),
    );
  }

  private removeSensitiveData(obj: any): void {
    if (obj && typeof obj === 'object') {
      delete obj.password;

      Object.keys(obj).forEach((key) => {
        if (obj[key] && typeof obj[key] === 'object') {
          this.removeSensitiveData(obj[key]);
        }
      });
    }
  }
}
