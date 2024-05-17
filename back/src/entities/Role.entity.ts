import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User.entity';

@Entity({ name: 'Roles' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false })
  role: string;

  @ManyToMany(() => User, (user) => user.role)
  usuarios: User[];
}
