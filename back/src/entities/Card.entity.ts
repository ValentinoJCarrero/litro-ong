import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Partner } from './Partner.entity';

@Entity({ name: 'Cards' })
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false })
  expiration: string;

  @Column({ type: 'varchar', nullable: false })
  PaymentMethod: string;

  @OneToOne(() => Partner, (partner) => partner.cardData, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  partner: Partner;
}
