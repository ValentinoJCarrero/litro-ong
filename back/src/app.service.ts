import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDevs(): string {
    const devs = 'Valentinito - Nicolas - Julián - Simón - Miguel - Luca';

    return `Respuesta desde /devs. 
    ${devs}`;
  }
}
