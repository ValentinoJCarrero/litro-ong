import { Module } from '@nestjs/common';
import { SubsController } from './subs.controller';
import { SubsService } from './subs.service';
import { PartnerService } from '../partner/partner.service';
import { PartnerRepository } from '../partner/partner.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from 'src/entities/Partner.entity';
import { User } from 'src/entities/User.entity';
import { Role } from 'src/entities/Role.entity';
import { Card } from 'src/entities/Card.entity';
import { Subscription } from 'src/entities/Subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partner, User, Role, Card, Subscription]),
  ],
  controllers: [SubsController],
  providers: [SubsService, PartnerService, PartnerRepository],
})
export class SubsModule {}
