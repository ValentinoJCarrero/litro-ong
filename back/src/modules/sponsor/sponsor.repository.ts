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
  getAllSponsors(): Promise<Sponsor[]> {
    return this.sponsorRepository.find();
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
