import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Volunteer } from './Volunteer.entity';
import { Role } from './Role.entity';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  //@Column({ type: 'varchar', nullable: false })
  //address: string;
  //
  //@Column({ type: 'varchar', nullable: false })
  //phone: string;
  //
  //@Column({ type: 'varchar', nullable: false })
  //dni: string;
  //
  //@Column({ type: 'varchar', nullable: false })
  //birthDate: Date;

  @OneToOne(() => Volunteer, (volunteer) => volunteer.user, {
    cascade: true,
  })
  @JoinColumn()
  volunteerData: Volunteer;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  role: Role[];
}
