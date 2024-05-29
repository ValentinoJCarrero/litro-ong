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
import { Subscription } from './Subscription.entity';

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

  @OneToOne(() => Card, (card) => card.partner, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cardData: Card;

  @OneToOne(() => Subscription, (subscription) => subscription.partner, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  subscription: Subscription;

  @Column({ type: 'date', nullable: false, default: () => 'CURRENT_DATE' })
  associateSince: Date;
}
