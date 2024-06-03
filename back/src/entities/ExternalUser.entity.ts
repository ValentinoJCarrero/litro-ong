import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity({ name:'external_users' })
export class ExternalUser {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();            

    @Column({type: 'varchar', nullable: false})
    email: string;
}
