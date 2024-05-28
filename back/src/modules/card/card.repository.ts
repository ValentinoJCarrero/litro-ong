import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/entities/Card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardRepository {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
  ) {}

  async getAllCards(
    limit: number,
    page: number,
  ): Promise<{ data: Card[]; total: number }> {
    const [data, total] = await this.cardRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: { partner: { user: true } },
    });
    return { data, total };
  }

  getOneCard(id: string): Promise<Card> {
    return this.cardRepository.findOne({ where: { id: id } });
  }

  createCard(cardData) {
    return this.cardRepository.save(cardData);
  }

  deleteCard(id: string) {
    return this.cardRepository.delete(id);
  }
}
