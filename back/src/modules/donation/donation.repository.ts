import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DonationDto } from 'src/dtos/Donation.dto';
import { Donation } from 'src/entities/Donation.entity';
import { User } from 'src/entities/User.entity';

import { Repository } from 'typeorm';

@Injectable()
export class DonationRepository {
  constructor(
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllDonations(
    page: number,
    limit: number,
  ): Promise<{ data: Donation[]; total: number }> {
    const [data, total] = await this.donationRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: { user: true },
    });
    return { data, total };
  }

  async getDonation(id: string): Promise<Donation> {
    return await this.donationRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async registerDonation(donation: DonationDto): Promise<Donation> {
    if (!donation.userId) {
      return await this.donationRepository.save(donation);
    } else {
      const userFound: User | null = await this.userRepository.findOneBy({
        id: donation.userId,
      });

      if (!userFound) {
        throw new NotFoundException('Usuario no encontrado');
      }
      const donationCreated = this.donationRepository.create({
        ...donation,
        user: userFound,
      });
      return await this.donationRepository.save(donationCreated);
    }
  }
}
