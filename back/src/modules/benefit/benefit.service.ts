import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BenefitRepository } from './benefit.repository';
import { Benefit } from 'src/entities/Benefit.entity';
import { BenefitDto } from 'src/dtos/Benefit.dto';

@Injectable()
export class BenefitService {
  constructor(private readonly benefitRepository: BenefitRepository) {}
  async getAllBenefits(): Promise<Benefit[]> {
    const allBenefits: Benefit[] =
      await this.benefitRepository.getAllBenefits();
    if (allBenefits.length === 0) {
      throw new NotFoundException('No se encontraron beneficios');
    }
    return allBenefits;
  }

  async getOneBenefit(id: string): Promise<Benefit> {
    const benefitById: Benefit = await this.benefitRepository.getOneBenefit(id);
    if (!benefitById) {
      throw new NotFoundException('Beneficio no encontrado');
    }
    return benefitById;
  }

  async createBenefit(benefit: BenefitDto): Promise<Benefit> {
    try {
      return await this.benefitRepository.createBenefit(benefit);
    } catch (error) {
      if ((error as any).message?.includes('unicidad')) {
        throw new ConflictException('Ya existe un beneficio con ese nombre');
      }
      throw error;
    }
  }
  deleteBenefit(id: string) {
    return this.benefitRepository.deleteBenefit(id);
  }
}
