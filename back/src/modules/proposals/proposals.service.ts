import { Injectable, NotFoundException } from '@nestjs/common';
import { ProposalsRepository } from './proposals.repository';
import { Proposals } from 'src/entities/Proposals.entity';
import { ProposalsDto } from 'src/dtos/Proposals.dto';

@Injectable()
export class ProposalsService {
  constructor(private readonly proposalsRepository: ProposalsRepository) {}

  async getAllProposals(
    limit: number,
    page: number,
  ): Promise<{ data: Proposals[]; total: number }> {
    const allProposals = await this.proposalsRepository.getAllProposals(
      limit,
      page,
    );
    if (allProposals.data.length === 0) {
      throw new NotFoundException(
        'No se encontraron propuestas en esta pagina',
      );
    } else {
      return allProposals;
    }
  }

  async getProposals(id: string): Promise<Proposals> {
    const proposalsById: Proposals | null =
      await this.proposalsRepository.getProposals(id);
    if (!proposalsById) {
      throw new NotFoundException('No se encontro la propuesta');
    }
    return proposalsById;
  }

  async updateProposals(id: string, proposalsData: Partial<ProposalsDto>) {
    const proposalsUpdated = await this.proposalsRepository.updateProposals(
      id,
      proposalsData,
    );
    if (proposalsUpdated.affected === 0) {
      throw new NotFoundException(
        'No se encontró la propuesta que intentabas editar',
      );
    } else {
      return proposalsUpdated;
    }
  }

  async createProposals(proposals: ProposalsDto): Promise<Proposals> {
    return await this.proposalsRepository.createProposals(proposals);
  }

  async deleteProposals(id: string) {
    const proposalsDeleted = await this.proposalsRepository.deleteProposals(id);
    if (proposalsDeleted.affected === 0) {
      throw new NotFoundException(
        'La propuesta que intentabas eliminar no se encontró en la base de datos',
      );
    }
    return proposalsDeleted;
  }
}
