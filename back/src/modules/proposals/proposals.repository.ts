import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProposalsDto } from 'src/dtos/Proposals.dto';
import { Proposals } from 'src/entities/Proposals.entity';
import { User } from 'src/entities/User.entity';
import { LessThan, Not, Repository } from 'typeorm';

@Injectable()
export class ProposalsRepository {
  constructor(
    @InjectRepository(Proposals)
    private proposalsRepository: Repository<Proposals>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllProposals(
    limit: number,
    page: number,
    filter?: string,
  ): Promise<{ data: Proposals[]; total: number }> {
    const [data, total] = await this.proposalsRepository.findAndCount({
      where: filter ? { status: filter } : {},
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user'],
    });

    return { data, total };
  }

  getProposals(id: string): Promise<Proposals> {
    return this.proposalsRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
  }

  updateProposals(id: string, newStatus: string) {
    return this.proposalsRepository.update(id, { status: newStatus });
  }

  async createProposals(
    id: string,
    proposals: ProposalsDto,
  ): Promise<Proposals> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const newProposals = this.proposalsRepository.create({
      ...proposals,
      user: user,
    });
    return await this.proposalsRepository.save(newProposals);
  }

  deleteProposals(id: string) {
    return this.proposalsRepository.delete(id);
  }

  deleteAllProposals(deleteOneMonthAgo: Date) {
    console.log(deleteOneMonthAgo);
    return this.proposalsRepository.delete({
      date: LessThan(deleteOneMonthAgo),
      status: Not('PENDING'),
    });
  }
}
