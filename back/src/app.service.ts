import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getDevs(): string {
    const devs = 'Valentino - Nicolas - Julián - Simón - Miguel - Luca'

    return `Respuesta desde /devs. 
    ${devs}`;
  }
}
