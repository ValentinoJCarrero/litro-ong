import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
  Unique,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Volunteer } from './Volunteer.entity';
import { Role } from './Role.entity';
import { Partner } from './Partner.entity';
import { Donation } from './Donation.entity';
import { Proposals } from './Proposals.entity';

@Entity({ name: 'Users' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false })
  fullName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  fullAddress: string;

  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @Column({ type: 'varchar', nullable: false })
  dni: string;

  @Column({ type: 'varchar', nullable: false })
  birthDate: string;

  @Column({ type: 'boolean', nullable: false })
  isSubscribed: boolean;

  @OneToOne(() => Volunteer, (volunteer) => volunteer.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  volunteerData: Volunteer;

  @OneToOne(() => Partner, (partner) => partner.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  partnerData: Partner;

  @OneToMany(() => Donation, (donation) => donation.user, {
    cascade: true,
  })
  donations: Donation[];

  @OneToMany(() => Proposals, (proposal) => proposal.user)
  proposals: Proposals[];

  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  role: Role[];
}
