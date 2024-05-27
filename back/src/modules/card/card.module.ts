import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/entities/Card.entity';
import { CardRepository } from './card.repository';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CardController],
  providers: [CardService, CardRepository],
})
export class CardModule {}
