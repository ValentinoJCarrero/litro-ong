/**	Nombre	Email	Password	Direccion	Telefono	Roles	[id_roles] */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Volunteer } from './Volunteer.entity';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @Column({ type: 'varchar', nullable: false })
  dni: string;

  @Column({ type: 'varchar', nullable: false })
  birthDate: Date;

  @OneToOne(() => Volunteer, (volunteer) => volunteer.user)
  @JoinColumn()
  volunteerData?: Volunteer;

  // @Column()
  // roles:
}
