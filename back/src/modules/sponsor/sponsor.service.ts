import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SponsorRepository } from './sponsor.repository';
import { SponsorDto } from 'src/dtos/Sponsor.dto';
import { Sponsor } from 'src/entities/Sponsor';

@Injectable()
export class SponsorService {
  constructor(private readonly sponsorRepository: SponsorRepository) {}

  async getAllSponsors(
    limit: number,
    page: number,
  ): Promise<{ data: Sponsor[]; total: number }> {
    const allSponsors = await this.sponsorRepository.getAllSponsors(
      limit,
      page,
    );
    if (allSponsors.data.length === 0) {
      throw new NotFoundException('No se encontraron patrocinadores');
    }
    return allSponsors;
  }

  async getOneSponsor(id: string): Promise<Sponsor> {
    const sponsorById: Sponsor | null =
      await this.sponsorRepository.getOneSponsor(id);
    if (!sponsorById) {
      throw new NotFoundException('Patrocinador no encontrado');
    }
    return sponsorById;
  }

  async createSponsor(sponsor: SponsorDto): Promise<Sponsor> {
    try {
      return await this.sponsorRepository.createSponsor(sponsor);
    } catch (error) {
      if ((error as any).message?.includes('unicidad')) {
        throw new ConflictException('Ya existe un patrocinador con ese nombre');
      }
      throw error;
    }
  }

  deleteSponsor(id: string) {
    return this.sponsorRepository.deleteSponsor(id);
  }
}
