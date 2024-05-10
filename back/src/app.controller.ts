import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  callback(@Res() res) {
    res.redirect('https://litro-ong.vercel.app');
  }

  @Get('devs')
  getDevs(): string {
    return this.appService.getDevs();
  }
}
