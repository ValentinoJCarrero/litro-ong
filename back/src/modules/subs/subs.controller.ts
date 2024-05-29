import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SubsService } from './subs.service';

@Controller('subs')
export class SubsController {
  constructor(private readonly subsService: SubsService) {}

  @Post()
  addSubscription(@Query('subId') subId, @Query('userId') userId) {
    return this.subsService.addSubscription(subId, userId);
  }

  @Post('create')
  createSubscription(@Body() body) {
    return this.subsService.createSubscription(body.email);
  }
}
