import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CatalogueEntity, CurriculumEntity } from '@core/entities';

@Entity('roles', { schema: 'core' })
export class RolesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;
/*
  @ManyToOne(() => CatalogueEntity, { nullable: false })
  @JoinColumn({ name: 'academic_period_id' })
  academicPeriod: CatalogueEntity;

  @ManyToOne(() => CurriculumEntity, { nullable: false })
  @JoinColumn({ name: 'curriculum_id' })
  curriculum: CurriculumEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: false })
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'type_id' })
  type: CatalogueEntity;
*/
  @Column('varchar', {
    name: 'id_roles',
    comment: 'Id de la tabla roles',
  })
  id_roles: string;

  @Column('varchar', {
    name: 'admin',
    comment: 'Rol admin',
  })
  admin: string;

  @Column('varchar', {
    name: 'candidatos',
    comment: 'Rol candidato',
  })
  candidatos: string;

  @Column('varchar', {
    name: 'votantes',
    comment: 'Rol votante',
  })
  votantes: string;

}
