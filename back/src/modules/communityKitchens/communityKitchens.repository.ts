import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityKitchensDto } from 'src/dtos/CommunityKitchens.dto';
import { CommunityKitchens } from 'src/entities/CommunityKitchens.entity';

import { Repository } from 'typeorm';

@Injectable()
export class CommunityKitchensRepository {
  constructor(
    @InjectRepository(CommunityKitchens)
    private communityKitchensRepository: Repository<CommunityKitchens>,
  ) {}

  async getAllCommunityKitchens(
    limit: number,
    page: number,
  ): Promise<{ data: CommunityKitchens[]; total: number }> {
    const [data, total] = await this.communityKitchensRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  getCommunityKitchens(id: string): Promise<CommunityKitchens> {
    return this.communityKitchensRepository.findOne({
      where: { id: id },
    });
  }

  updateCommunityKitchens(
    id: string,
    communityKitchensData: Partial<CommunityKitchens>,
  ) {
    return this.communityKitchensRepository.update(id, communityKitchensData);
  }

  createCommunityKitchens(
    communityKitchens: CommunityKitchensDto,
  ): Promise<CommunityKitchens> {
    return this.communityKitchensRepository.save(communityKitchens);
  }

  deleteCommunityKitchens(id: string) {
    return this.communityKitchensRepository.delete(id);
  }
}
