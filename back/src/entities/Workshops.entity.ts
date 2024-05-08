/**Talleres	Pk	ID_Talleres	uuid		Nombre			Profesor/a			Imagen			date			descripcion		Clave	horarios	Tipo */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'Workshops' })
export class Workshops {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  teacher: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'varchar', nullable: false })
  date: string;

  @Column({ type: 'varchar', nullable: false })
  horarios: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;
}
