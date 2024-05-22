import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'Workshops' })
@Unique(['name'])
export class Workshop {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  teacher: string;

  @Column({ type: 'varchar', nullable: false })
  teacherPhone: string;

  @Column({ type: 'varchar', nullable: false })
  photo: string;

  @Column({ type: 'varchar', nullable: false })
  timeStart: string;

  @Column({ type: 'varchar', nullable: false })
  duration: string;

  @Column({ type: 'varchar', nullable: true })
  dateStart: string;

  @Column({ type: 'varchar', nullable: true })
  dateEnd: string;

  @Column({ type: 'varchar', nullable: false })
  cost: string;

  @Column({ type: 'simple-array', nullable: false })
  days: string[];

  @Column({ type: 'text', nullable: false })
  description: string;
}
