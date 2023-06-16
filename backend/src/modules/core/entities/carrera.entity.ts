import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CareerEntity, CatalogueEntity } from '@core/entities';

@Entity('carrera', { schema: 'core' })
export class CurriculumEntity {
  @PrimaryGeneratedColumn('uuid')
  idCarrera: string;

  @CreateDateColumn({
    name: 'ended_At',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera',
  })
  endedAt: Date;

  @CreateDateColumn({
    name: 'started_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera',
  })
  startedAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAT: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAT: Date;

  @ManyToOne(() => CareerEntity, { nullable: false })
  career: CareerEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: false })
  state: CatalogueEntity;

  /*
  // COLUMS 
  */
 @Column({
  name: 'codigo',
  type: 'int',
  Comment: 'Codigo que tiene la carrera'
 })
 codigo: string

 @Column({
  name: 'nombre',
  type: 'varchar',
  Comment: 'Nombre de la carrera Ej. Desarrollo de Software'
 })
 nombre: string
}
