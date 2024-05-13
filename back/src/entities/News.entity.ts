import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'News' })
@Unique(['title'])
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 40, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  subtitle: string;

  //@Column({ type: 'varchar', nullable: false })
  //primaryImage: string;

  //@Column({ type: 'varchar', nullable: true })
  //secondaryImage: string;

  //@Column({ type: 'varchar', nullable: true })
  //tertiaryImage: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'date', nullable: false, default: () => 'CURRENT_DATE' })
  date: Date;
}
