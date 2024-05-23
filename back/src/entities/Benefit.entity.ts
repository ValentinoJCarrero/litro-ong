import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'Benefits' })
@Unique(['name', 'benefits'])
export class Benefit {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  logo: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  benefits: string;

  @Column({ type: 'date', nullable: true })
  benefitEndDate?: Date;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
