import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SponsorDto } from 'src/dtos/Sponsor.dto';
import { Sponsor } from 'src/entities/Sponsor';
import { Repository } from 'typeorm';

@Injectable()
export class SponsorRepository {
  constructor(
    @InjectRepository(Sponsor) private sponsorRepository: Repository<Sponsor>,
  ) {}
  async getAllSponsors(
    limit: number,
    page: number,
  ): Promise<{ data: Sponsor[]; total: number }> {
    const [data, total] = await this.sponsorRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }
  getOneSponsor(id: string): Promise<Sponsor> {
    return this.sponsorRepository.findOne({ where: { id: id } });
  }
  createSponsor(sponsor: SponsorDto) {
    return this.sponsorRepository.save(sponsor);
  }
  deleteSponsor(id: string) {
    return this.sponsorRepository.delete(id);
  }
}
