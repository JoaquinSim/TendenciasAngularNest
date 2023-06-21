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
//import { CatalogueEntity, InstitutionEntity } from '@core/entities';

@Entity('roles_usuario', { schema: 'core' })
export class Roles_UsuarioEntity {
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
  @Column('string', {
    name: 'id_roles_usuario',
    comment: 'Id del rol del usuario',
  })
  id_roles_usuario: string;

  @Column('string', {
    name: 'id_usuario',
    comment: 'Id del usuario',
  })
  id_usuario: string;

  @Column('string', {
    name: 'id_rol',
    comment: 'Id del rol',
  })
  id_rol: string;
}
