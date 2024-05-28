import { Injectable, NotFoundException } from '@nestjs/common';
import { CardRepository } from './card.repository';
import { Card } from 'src/entities/Card.entity';

@Injectable()
export class CardService {
  constructor(private readonly cardRepository: CardRepository) {}

  async getAllCards(
    limit: number,
    page: number,
  ): Promise<{ data: Card[]; total: number }> {
    const allCards = await this.cardRepository.getAllCards(limit, page);
    if (allCards.data.length === 0) {
      throw new NotFoundException('No se encontraron tarjetas');
    }
    return allCards;
  }

  async getOneCard(id: string): Promise<Card> {
    const cardById: Card | null = await this.cardRepository.getOneCard(id);
    if (!cardById) {
      throw new NotFoundException('Tarjeta no encontrada');
    }
    return cardById;
  }

  async createCard(CardData): Promise<Card> {
    return await this.cardRepository.createCard(CardData);
  }

  deleteCard(id: string) {
    return this.cardRepository.deleteCard(id);
  }
}
