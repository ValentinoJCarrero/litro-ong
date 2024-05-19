import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Event } from './Event.entity';
import { User } from './User.entity';

@Entity({ name: 'Volunteers' })
export class Volunteer {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @OneToOne(() => User, (user) => user.volunteerData, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({ type: 'varchar', nullable: false })
  availableDays: string[];

  @Column({ type: 'varchar', nullable: false })
  startHours: string;

  @Column({ type: 'varchar', nullable: false })
  endHours: string;

  @Column({ type: 'date', nullable: false, default: () => 'CURRENT_DATE' })
  volunteerSince: Date;

  @ManyToMany(() => Event, (event) => event.volunteer, {})
  events: Event[];
}
