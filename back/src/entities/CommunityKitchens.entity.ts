import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'Community_Kitchens' })
@Unique(['name'])
export class CommunityKitchens {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  holder: string;

  @Column({ type: 'time', nullable: false })
  kidsNumber: string;

  @Column({ type: 'simple-array', nullable: false })
  days: string[];

  @Column({ type: 'varchar', nullable: false })
  time: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  photo: string;
}
