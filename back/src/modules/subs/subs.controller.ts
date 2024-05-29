import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SubsService } from './subs.service';

@Controller('subs')
export class SubsController {
  constructor(private readonly subsService: SubsService) {}

  @Get()
  getAllSubscriptions(offset = 0, limit = 10) {
    return this.subsService.getAllSubscriptions(offset, limit);
  }

  @Get(':id')
  getSubscriptionById(@Param('id') id) {
    return this.subsService.getSubscriptionById(id);
  }

  @Post()
  uploadSubscription(@Query('subId') subId, @Query('userId') userId) {
    return this.subsService.uploadSubscription(subId, userId);
  }

  @Post('create')
  createSubscription(@Body() body) {
    return this.subsService.createSubscription(body.email);
  }
}
