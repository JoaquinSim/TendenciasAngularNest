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

@Entity('lists', { schema: 'core' })
export class ListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la lista',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la lista',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion de la lista',
  })
  deletedAt: Date;

  //   @ManyToOne(() => InstitutionEntity, {
  //     nullable: true,
  //   })
  //   @JoinColumn({ name: 'institution_id' })
  //   institution: InstitutionEntity;

  //   @ManyToOne(() => CatalogueEntity, {
  //     nullable: true,
  //   })
  //   @JoinColumn({ name: 'modality_id' })
  //   modality: CatalogueEntity;

  //   @ManyToOne(() => CatalogueEntity, {
  //     nullable: true,
  //   })
  //   @JoinColumn({ name: 'state_id' })
  //   state: CatalogueEntity;

  //   @ManyToOne(() => CatalogueEntity, {
  //     nullable: true,
  //   })
  //   @JoinColumn({ name: 'type_id' })
  //   type: CatalogueEntity;

  @Column('varchar', {
    name: 'name_list',
    comment: 'Nombre de la lista',
  })
  nameList: string;

  @Column('varchar', {
    name: 'slogan',
    comment: 'Slogan de la lista',
  })
  slogan: string;

  @Column('varchar', {
    comment: 'Propuesta de la lista',
    name: 'proposal_list',
  })
  proposalList: string;

  @Column('varchar', {
    name: 'color_list',
    comment: 'Color de la lista',
  })
  colorList: string;

  @Column('varchar', {
    name: 'logo_list',
    nullable: true,
    comment: 'Logo de la lista',
  })
  logoList: string;

  @Column('int', {
    name: 'number_list',
    comment: 'Numero de la lista',
  })
  numberList: number;

  @Column('boolean', {
    comment: 'Estado de la lista',
    name: 'state',
  })
  state: boolean;
}
