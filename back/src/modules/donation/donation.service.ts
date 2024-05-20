import { Injectable } from '@nestjs/common';
import { DonationRepository } from './donation.repository';

import { Donation } from 'src/entities/Donation.entity';

@Injectable()
export class DonationService {
  constructor(private readonly donationRepository: DonationRepository) {}
  async getAllDonations(page: number, limit: number): Promise<Donation[]> {
    return await this.donationRepository.getAllDonations(page, limit);
  }

  async getDonation(id: string): Promise<Donation> {
    return await this.donationRepository.getDonation(id);
  }

  registerDonation(donation: any, id: string) {
    return this.donationRepository.registerDonation(donation, id);
  }
}
