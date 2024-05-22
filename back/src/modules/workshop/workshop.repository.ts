import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkshopDto } from 'src/dtos/Workshop.dto';
import { Workshop } from 'src/entities/Workshop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkshopRepository {
  constructor(
    @InjectRepository(Workshop)
    private workshopRepository: Repository<Workshop>,
  ) {}

  async getAllWorkshop(
    limit: number,
    page: number,
  ): Promise<{ data: Workshop[]; total: number }> {
    const [data, total] = await this.workshopRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  getWorkshop(id: string): Promise<Workshop> {
    return this.workshopRepository.findOne({
      where: { id: id },
    });
  }
  updateWorkshop(id: string, workshopData: Partial<WorkshopDto>) {
    return this.workshopRepository.update(id, workshopData);
  }

  createWorkshop(workshop: WorkshopDto): Promise<Workshop> {
    return this.workshopRepository.save(workshop);
  }

  deleteWorkshop(id: string) {
    return this.workshopRepository.delete(id);
  }
}
