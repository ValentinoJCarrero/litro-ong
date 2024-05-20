import { Module } from '@nestjs/common';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { DonationRepository } from './donation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Donation } from 'src/entities/Donation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Donation])],
  controllers: [DonationController],
  providers: [DonationService, DonationRepository],
})
export class DonationModule {}
