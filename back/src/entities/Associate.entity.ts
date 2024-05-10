import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'Associates' })
export class Associate {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  // @Column()
  // userId: User

  @Column({ type: 'varchar', nullable: false })
  dni: string;

  //@Column()
  //card : Card

  @Column({ type: 'varchar', nullable: false })
  associateSince: Date;
}
