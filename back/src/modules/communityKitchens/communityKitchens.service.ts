import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommunityKitchensRepository } from './communityKitchens.repository';
import { CommunityKitchens } from 'src/entities/CommunityKitchens.entity';
import { CommunityKitchensDto } from 'src/dtos/CommunityKitchens.dto';

@Injectable()
export class CommunityKitchensService {
  constructor(
    private readonly communityKitchensRepository: CommunityKitchensRepository,
  ) {}

  async getAllCommunityKitchens(
    limit: number,
    page: number,
  ): Promise<{ data: CommunityKitchens[]; total: number }> {
    const allCommunityKitchens =
      await this.communityKitchensRepository.getAllCommunityKitchens(
        limit,
        page,
      );
    if (allCommunityKitchens.data.length === 0) {
      throw new NotFoundException(
        'No se encontraron merenderos en esta pagina',
      );
    } else {
      return allCommunityKitchens;
    }
  }

  async getCommunityKitchens(id: string): Promise<CommunityKitchens> {
    const communityKitchensById: CommunityKitchens | null =
      await this.communityKitchensRepository.getCommunityKitchens(id);
    if (!communityKitchensById) {
      throw new NotFoundException('No se encontro el merendero');
    }
    return communityKitchensById;
  }

  async updateCommunityKitchens(
    id: string,
    communityKitchensData: Partial<CommunityKitchensDto>,
  ) {
    const communityKitchensUpdated =
      await this.communityKitchensRepository.updateCommunityKitchens(
        id,
        communityKitchensData,
      );
    if (communityKitchensUpdated.affected === 0) {
      throw new NotFoundException(
        'No se encontró el merendero que intentabas editar',
      );
    } else {
      return communityKitchensUpdated;
    }
  }

  async createCommunityKitchens(
    communityKitchens: CommunityKitchensDto,
  ): Promise<CommunityKitchens> {
    try {
      return await this.communityKitchensRepository.createCommunityKitchens(
        communityKitchens,
      );
    } catch (error) {
      if (
        (error as any).message?.includes('unicidad') ||
        (error as any).message?.includes('unique') ||
        (error as any).message?.includes('duplicate key')
      ) {
        throw new ConflictException(
          'Ya existe un merendero con el mismo nombre',
        );
      } else {
        throw error;
      }
    }
  }

  async deleteCommunityKitchens(id: string) {
    const communityKitchensDeleted =
      await this.communityKitchensRepository.deleteCommunityKitchens(id);
    if (communityKitchensDeleted.affected === 0) {
      throw new NotFoundException(
        'El merendero que intentabas eliminar no se encontró en la base de datos',
      );
    }
    return communityKitchensDeleted;
  }
}
