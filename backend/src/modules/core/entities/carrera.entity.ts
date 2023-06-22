import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Entity('carrera', { schema: 'core' })
export class CarreraEntity {
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

  @OneToMany(() => UsuarioEntity, { nullable: false })
/*
  @ManyToOne(() => CatalogueEntity, { nullable: false })
  state: CatalogueEntity;
*/
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
function OneToMane(arg0: () => typeof UsuarioEntity, arg1: { nullable: boolean; }): (target: CarreraEntity, propertyKey: "codigo") => void {
  throw new Error('Function not implemented.');
}

