import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User.entity';

@Entity({ name: 'Proposals' })
export class Proposals {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'date', nullable: false, default: () => 'CURRENT_DATE' })
  date: Date;

  @Column({ type: 'varchar', default: 'PENDING', nullable: false })
  status: string;

  @ManyToOne(() => User, (user) => user.proposals)
  user: User;
}
