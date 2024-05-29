import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/entities/Card.entity';
import { Partner } from 'src/entities/Partner.entity';
import { Role } from 'src/entities/Role.entity';
import { Subscription } from 'src/entities/Subscription.entity';

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
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
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
    return this.partnerRepository.findOne({
      where: { id: id },
      relations: { user: true, cardData: true, subscription: true },
    });
  }

  async createPartner(
    userId: string,
    subscription: Subscription,
  ): Promise<Partner> {
    const queryRunner =
      this.partnerRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const userFound = await this.userRepository.findOne({
        where: { id: userId },
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

      const newSubscription = this.subscriptionRepository.create({
        transaction_id: subscription.transaction_id,
        status: subscription.status,
        url: subscription.url,
        amount: subscription.amount,
        next_payment_date: subscription.next_payment_date,
        payment_method: subscription.payment_method,
      });
      const savedSubscription =
        await this.subscriptionRepository.save(newSubscription);

      const partnerCreated = this.partnerRepository.create({
        user: userFound,
        subscription: savedSubscription,
      });
      const savedPartner = await this.partnerRepository.save(partnerCreated);

      const newCard = this.cardRepository.create({
        dni: userFound.dni,
        holder: userFound.fullName,
        expiration: subscription.next_payment_date,
        paymentMethod: subscription.payment_method,
        paymentStatus: subscription.status,
        partner: savedPartner,
      });
      const savedCard = await this.cardRepository.save(newCard);

      savedPartner.cardData = savedCard;
      savedSubscription.partner = savedPartner;

      await this.partnerRepository.save(savedPartner);
      await this.subscriptionRepository.save(savedSubscription);
      await this.userRepository.save(userFound);

      await queryRunner.commitTransaction();
      return savedPartner;
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
