import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerDto } from 'src/dtos/Partner.dto';
import { Card } from 'src/entities/Card.entity';
import { Partner } from 'src/entities/Partner.entity';
import { Role } from 'src/entities/Role.entity';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartnerRepository {
  constructor(
    @InjectRepository(Partner) private partnerRepository: Repository<Partner>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Card) private cardRepository: Repository<Card>,
  ) {}

  async getAllPartners(
    limit: number,
    page: number,
  ): Promise<{ data: Partner[]; total: number }> {
    const [data, total] = await this.partnerRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: { user: true, cardData: true },
    });
    return { data, total };
  }

  getOnePartner(id: string): Promise<Partner> {
    return this.partnerRepository.findOne({ where: { id: id } });
  }

  async createPartner(partner: PartnerDto): Promise<Partner> {
    const queryRunner =
      this.partnerRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const userFound = await this.userRepository.findOne({
        where: { email: partner.email },
        relations: { role: true },
      });

      if (!userFound) {
        throw new NotFoundException('Usuario no encontrado');
      }
      const rolePartner = await this.roleRepository.findOne({
        where: { role: 'Partner' },
      });

      if (!rolePartner) {
        throw new NotFoundException('Rol no encontrado');
      }
      userFound.role = [...userFound.role, rolePartner];

      const partnerCreated = await this.partnerRepository.save({
        user: userFound,
      });

      const newCard = this.cardRepository.create({
        dni: userFound.dni,
        holder: userFound.fullName,
        expiration: '01/25',
        paymentMethod: 'credito',
        paymentStatus: 'APPROVED',
        partner: partnerCreated,
      });

      await this.cardRepository.save(newCard);

      await this.userRepository.save(userFound);

      await queryRunner.commitTransaction();
      return partnerCreated;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  deletePartner(id: string) {
    return this.partnerRepository.delete(id);
  }
}
