import { Injectable, NotFoundException } from '@nestjs/common';
import { PartnerRepository } from './partner.repository';
import { Partner } from 'src/entities/Partner.entity';
import { Subscription } from 'src/entities/Subscription.entity';

@Injectable()
export class PartnerService {
  constructor(private readonly partnerRepository: PartnerRepository) {}

  async getAllPartners(
    limit: number,
    page: number,
  ): Promise<{ data: Partner[]; total: number }> {
    const allPartners = await this.partnerRepository.getAllPartners(
      limit,
      page,
    );
    if (allPartners.data.length === 0) {
      throw new NotFoundException('No se encontraron patrocinadores');
    }
    return allPartners;
  }

  async getOnePartner(id: string): Promise<Partner> {
    const partnerById: Partner | null =
      await this.partnerRepository.getOnePartner(id);
    if (!partnerById) {
      throw new NotFoundException('Socio no encontrado');
    }
    return partnerById;
  }

  async createPartner(
    userId: string,
    subscription: Subscription,
  ): Promise<Partner> {
    return await this.partnerRepository.createPartner(userId, subscription);
  }

  deletePartner(id: string) {
    return this.partnerRepository.deletePartner(id);
  }
}
