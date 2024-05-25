import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProposalsDto } from 'src/dtos/Proposals.dto';
import { Proposals } from 'src/entities/Proposals.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProposalsRepository {
  constructor(
    @InjectRepository(Proposals)
    private proposalsRepository: Repository<Proposals>,
  ) {}

  async getAllProposals(
    limit: number,
    page: number,
  ): Promise<{ data: Proposals[]; total: number }> {
    const [data, total] = await this.proposalsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  getProposals(id: string): Promise<Proposals> {
    return this.proposalsRepository.findOne({
      where: { id: id },
    });
  }

  updateProposals(id: string, proposalsData: Partial<ProposalsDto>) {
    return this.proposalsRepository.update(id, proposalsData);
  }

  createProposals(proposals: ProposalsDto): Promise<Proposals> {
    return this.proposalsRepository.save(proposals);
  }

  deleteProposals(id: string) {
    return this.proposalsRepository.delete(id);
  }
}
