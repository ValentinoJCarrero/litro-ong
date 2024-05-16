import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('devs')
  getDevs(): string {
    return this.appService.getDevs();
  }
}
