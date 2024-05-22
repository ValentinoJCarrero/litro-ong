import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BenefitDto } from 'src/dtos/Benefit.dto';
import { Benefit } from 'src/entities/Benefit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BenefitRepository {
  constructor(
    @InjectRepository(Benefit) private benefitRepository: Repository<Benefit>,
  ) {}

  async getAllBenefits(
    limit: number,
    page: number,
  ): Promise<{ data: Benefit[]; total: number }> {
    const [data, total] = await this.benefitRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  getOneBenefit(id: string): Promise<Benefit> {
    return this.benefitRepository.findOne({ where: { id: id } });
  }

  createBenefit(benefit: BenefitDto) {
    return this.benefitRepository.save(benefit);
  }

  deleteBenefit(id: string) {
    return this.benefitRepository.delete(id);
  }
}
