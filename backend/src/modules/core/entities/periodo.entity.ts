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

@Entity('period', { schema: 'core' })
export class PeriodEntity {
  @PrimaryGeneratedColumn('uuid')
  id_period: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de el periodo lectivo',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de el periodo lectivo',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion de el periodo lectivo',
  })
  deletedAt: Date;
  /*
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
*/
  @Column({
    type: 'varchar',
    name: 'period_name',
    comment: 'nombre del periodo lectivo',
  })
  periodName: string;

  @Column({
    type: 'date',
    name: 'start_date',
    comment: 'Fecha de inicio del periodo lectivo',
  })
  startDate: Date;

  @Column({
    type: 'date',
    name: 'end_date',
    comment: 'Fecha fin del periodo lectivo',
  })
  endDate: Date;

  @Column({
    type: 'boolean',
    name: 'state',
    comment: 'Estado del periodo',
  })
  state: boolean;
}
