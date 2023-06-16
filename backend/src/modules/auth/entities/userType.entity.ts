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

@Entity('user_type', { schema: 'core' })
export class UserTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id_userType: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del tipo de usuario',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del tipo de usuario',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion del tipo de usuario',
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
    name: 'type_user_name',
    comment: 'Nombre del tipo de usuario',
  })
  typeUserName: string;

  @Column({
    type: 'varchar',
    name: 'task_description',
    comment: 'Descripcion del tipo de usuario',
  })
  typeUserDescription: string;
}
