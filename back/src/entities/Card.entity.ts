import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'Cards' })
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
}
