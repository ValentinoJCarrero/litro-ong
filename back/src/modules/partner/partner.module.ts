import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from 'src/entities/Partner.entity';
import { PartnerController } from './partner.controller';
import { PartnerRepository } from './partner.repository';
import { PartnerService } from './partner.service';
import { User } from 'src/entities/User.entity';
import { Card } from 'src/entities/Card.entity';
import { Role } from 'src/entities/Role.entity';
import { Subscription } from 'src/entities/Subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partner, User, Role, Card, Subscription]),
  ],
  controllers: [PartnerController],
  providers: [PartnerService, PartnerRepository],
})
export class PartnerModule {}
