import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'News' })
@Unique(['title'])
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  subtitle: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'varchar', nullable: false })
  date: string;
}
