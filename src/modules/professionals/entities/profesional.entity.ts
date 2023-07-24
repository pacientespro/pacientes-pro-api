import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('profesionales')
export class Profesionales {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false, name: 'nombres' })
  Nombres: string;

  @Column({ length: 255, nullable: false, name: 'apellidos' })
  Apellidos: string;

  @Column({nullable: false, name: 'idtipodocumento' })
  IdTipoDocumento: number;

  @Column({ length: 50, nullable: false, name: 'documento' })
  Documento: string;

  @Column({ nullable: false, name: 'idprofesion' })
  IdProfesion: number;

  @Column({ nullable: false, name: 'idusuario' })
  IdUsuario: number;

  @Column({nullable: false, name: 'idstatus' })
  IdStatus: number;

  @Column({ nullable: false, name: 'isdeleted' })
  IsDeleted: boolean;

  @Column({ nullable: false, name: 'create_dt', type: 'timestamp' })
  Create_dt: Date;
}
