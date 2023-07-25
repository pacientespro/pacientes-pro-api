import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('tipoprofesiones')
export class TipoProfesiones{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false, name: 'nombreprofesion' })
  Nombre: string;

  @Column({ nullable: false, name: 'isactive' })
  IsActive: boolean;

}