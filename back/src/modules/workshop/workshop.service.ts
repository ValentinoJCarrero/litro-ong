import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WorkshopRepository } from './workshop.repository';
import { Workshop } from 'src/entities/Workshop.entity';
import { WorkshopDto } from 'src/dtos/Workshop.dto';

@Injectable()
export class WorkshopService {
  constructor(private readonly workshopRepository: WorkshopRepository) {}

  async getAllWorkshop(
    limit: number,
    page: number,
  ): Promise<{ data: Workshop[]; total: number }> {
    const allWorkshop = await this.workshopRepository.getAllWorkshop(
      limit,
      page,
    );
    if (allWorkshop.data.length === 0) {
      throw new NotFoundException('No se encontraron talleres esta pagina');
    } else {
      return allWorkshop;
    }
  }

  async getWorkshop(id: string): Promise<Workshop> {
    const workshopById: Workshop | null =
      await this.workshopRepository.getWorkshop(id);
    if (!workshopById) {
      throw new NotFoundException('No se encontro el taller');
    }
    return workshopById;
  }

  async updateWorkshop(id: string, workshopData: Partial<WorkshopDto>) {
    const workshopUpdated = await this.workshopRepository.updateWorkshop(
      id,
      workshopData,
    );
    if (workshopUpdated.affected === 0) {
      throw new NotFoundException(
        'No se encontró el taller que intentabas editar',
      );
    } else {
      return workshopUpdated;
    }
  }

  async createWorkshop(workshop: WorkshopDto): Promise<Workshop> {
    try {
      return await this.workshopRepository.createWorkshop(workshop);
    } catch (error) {
      if (
        (error as any).message?.includes('unicidad') ||
        (error as any).message?.includes('unique') ||
        (error as any).message?.includes('duplicate key')
      ) {
        throw new ConflictException('Ya existe taller con el mismo nombre');
      } else {
        throw error;
      }
    }
  }

  async deleteWorkshop(id: string) {
    const workshopDeleted = await this.workshopRepository.deleteWorkshop(id);
    if (workshopDeleted.affected === 0) {
      throw new NotFoundException(
        'El taller que intentabas eliminar no se encontró en la base de datos',
      );
    }
    return workshopDeleted;
  }
}
