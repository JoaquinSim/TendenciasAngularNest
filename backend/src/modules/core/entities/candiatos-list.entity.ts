import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueEntity, InstitutionEntity } from '@core/entities';

@Entity('candidatos_lista', { schema: 'core' })
export class CareerEntity {
  @PrimaryGeneratedColumn('uuid')
  idCandidatoLista: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la carrera',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion de la carrera',
  })
  deletedAt: Date;

  @ManyToOne(() => InstitutionEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'institution_id' })
  institution: InstitutionEntity;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'modality_id' })
  modality: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'type_id' })
  type: CatalogueEntity;

  /*
  // COLUMS
  */
  @Column({
    name: 'id_lista',
    type: 'int',
    comment: 'Id que tiene la lista ',
  })
  id_lista: number;

  @Column({
    name: 'id_usuario',
    type: 'int',
    comment: 'Id que tiene el usuario',
  })
  id_usuario: number;

  @Column({
    name: 'id_cargo',
    type: 'int',
    comment: 'Id que tiene el cargo',
  })
  id_cargo: number;
}
