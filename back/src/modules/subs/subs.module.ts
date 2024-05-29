import { Module } from '@nestjs/common';
import { SubsController } from './subs.controller';
import { SubsService } from './subs.service';
import { PartnerModule } from '../partner/partner.module';

@Module({
  imports: [PartnerModule],
  controllers: [SubsController],
  providers: [SubsService],
})
export class SubsModule {}
