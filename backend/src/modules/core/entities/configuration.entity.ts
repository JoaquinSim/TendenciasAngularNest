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
@Entity('configuration', { schema: 'core' })
export class ConfigurationEntity {
  @PrimaryGeneratedColumn('uuid')
  id_configuration: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del reseteo',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del reseteo',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion del reseteo',
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
    name: 'code_password',
    comment: 'Codigo de reseteo',
  })
  codePassword: string;
}
