import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false, name: 'correo' })
  Correo: string;

  @Column({ length: 255, nullable: false, name: 'clave' })
  Clave: string;

  @Column({ nullable: false, name: 'isactive' })
  IsActive: boolean;
}
