import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipodocumentos')
export class TipoDocumentos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false, name: 'nombredocumento' })
  Nombre: string;

  @Column({ nullable: false, name: 'isactive' })
  IsActive: boolean;
}