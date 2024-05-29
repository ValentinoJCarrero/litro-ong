import { Module } from '@nestjs/common';
import { MercadoPagoController } from './mp.controller';
import { MercadoPagoService } from './mp.service';
import { DonationService } from '../donation/donation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from 'src/entities/Donation.entity';
import { DonationRepository } from '../donation/donation.repository';
import { UsersRepository } from '../users/users.repository';
import { User } from 'src/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Donation, User])],
  controllers: [MercadoPagoController],
  providers: [
    MercadoPagoService,
    DonationService,
    DonationRepository,
    UsersRepository,
  ],
})
export class MercadoPagoModule {}
