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
  getAllSponsors(limit: number, page: number): Promise<Sponsor[]> {
    return this.sponsorRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
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
