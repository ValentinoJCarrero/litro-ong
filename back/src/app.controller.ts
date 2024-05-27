import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  onModuleInit() {
    this.seeder();
  }
  @Get('seeder')
  seeder(): Promise<string> {
    return this.appService.seeder();
  }
}
