import { Controller, Get, OnModuleInit, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(private readonly appService: AppService) {}
  onModuleInit() {
    this.seeder();
  }
  @Get('seeder')
  seeder(): Promise<string> {
    return this.appService.seeder();
  }
}
