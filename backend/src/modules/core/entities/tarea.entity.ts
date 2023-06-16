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

@Entity('task', { schema: 'core' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id_task: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la tarea',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la tarea',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion de la tarea',
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
    name: 'task_name',
    comment: 'Nombre de la tarea',
  })
  taskName: string;

  @Column({
    type: 'varchar',
    name: 'task_description',
    comment: 'Descripcion de la tarea',
  })
  taskDescription: string;
}
