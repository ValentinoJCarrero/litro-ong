import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from 'src/entities/Donation.entity';

import { Repository } from 'typeorm';

@Injectable()
export class DonationRepository {
  constructor(
    @InjectRepository(Donation)
    private DonationRepository: Repository<Donation>,
  ) {}

  getAllDonations(page: number, limit: number): Promise<Donation[]> {
    return this.DonationRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getDonation(id: string): Promise<Donation> {
    return await this.DonationRepository.findOne({ where: { id } });
  }

  registerDonation(donation, id): Donation | PromiseLike<Donation> {
    console.log(id);
    return this.DonationRepository.save(donation);
  }
}
