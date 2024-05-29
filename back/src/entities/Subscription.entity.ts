import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Partner } from './Partner.entity';

@Entity({ name: 'subscriptions' })
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false })
  transaction_id: string;

  @Column({ type: 'varchar', nullable: false })
  status: string;

  @Column({ type: 'varchar', nullable: false })
  url: string;

  @Column({ type: 'varchar', nullable: false })
  amount: number;

  @Column({ type: 'varchar', nullable: false })
  next_payment_date: string;

  @Column({ type: 'varchar', nullable: false })
  payment_method: string;

  @OneToOne(() => Partner, (partner) => partner.subscription, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  partner: Partner;
}
