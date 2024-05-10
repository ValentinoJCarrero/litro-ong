import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'Volunteers' })
export class Volunteer {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  // @Column()
  // userId: User

  @Column({ type: 'varchar', nullable: false })
  availableDays: string;

  @Column({ type: 'varchar', nullable: false })
  startHours: string;

  @Column({ type: 'varchar', nullable: false })
  endHours: string;

  @Column({ type: 'varchar', nullable: false })
  volunteerSince: Date;

  // @Column({ type: 'varchar', nullable: false })
  // eventId: event[];
}
