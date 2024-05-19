import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User.entity';
import { Card } from './Card.entity';

@Entity({ name: 'partners' })
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @OneToOne(() => User, (user) => user.partnerData, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToOne(() => Card, (card) => card.partner, {})
  cardData: Card;

  @Column({ type: 'date', nullable: false })
  associateSince: Date;
}
