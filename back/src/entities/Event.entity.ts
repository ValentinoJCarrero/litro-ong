import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Volunteer } from './Volunteer.entity';

@Entity({ name: 'Events' })
@Unique(['title', 'date'])
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  subtitle: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'date', nullable: false })
  date: string;

  @Column({ type: 'time', nullable: false })
  timeStart: string;

  @Column({ type: 'time', nullable: false })
  timeEnd: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  primaryImage: string;

  @Column({ type: 'varchar', nullable: false })
  secondaryImage: string;

  @ManyToMany(() => Volunteer, (volunteer) => volunteer.events, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({ name: 'Volunteer_at_event' })
  volunteer?: Volunteer[];
}
