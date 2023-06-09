import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuario', { schema: 'core' })
export class InformationStudentEntity {
  @PrimaryGeneratedColumn('uuid')
  idUsuario: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'fecha de creación de usuario'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'fecha de actualización de usuario'
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'fecha de eliminación de usuario'
  })
  deletedAt: Date;
/*
  @OneToOne(() => StudentEntity)
  student: StudentEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_executed_practice' })
  isExecutedPractice: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_executed_community' })
  isExecutedCommunity: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_disability' })
  isDisability: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_lost_Gratuity' })
  isLostGratuity: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_subject_repeat' })
  isSubjectRepeat: CatalogueEntity;
*/
  /*
  // COLUMNS
  */

  @Column ({
    name: 'cedula',
    type: 'numeric',
    comment: 'Escribir su numero de cedula',
  })
  cedula: number

  @Column ({
    name: 'nombre',
    type: 'varchar',
    comment: 'Escribir su nombre. Ej: Joselito'
  })
  nombre:string

  @Column ({
    name: 'apellido',
    type: 'varchar',
    comment: 'Escriba su Apellido. Ej: Perez',
  })
  apellido:string

  @Column ({
    name: 'semestre',
    type: 'varchar',
    comment: 'Especifique la carrea en la que esta',
  })
  semestre: string

  @Column ({
    name: 'carrera',
    type: 'varchar',
    comment: 'Especifique la carrera en la que esta'
  })
  carrera: string

  @Column ({
    name: 'correo',
    type: 'varchar',
    comment: 'Escriba su coreo',
  })
  correo: string

  @Column({
    name: 'estado',
    type: 'boolean',
    comment: 'Especifique su estado. Ej: Activo'
  })
  estado: boolean

  @Column ({
    name: 'tipoUsuario',
    type: 'varchar',
    comment: 'Especifique que tipo de usuario es. Ej: Administrador, Candidato, Votante'
  })
  tipousuario: string

  @Column ({
    name: 'clave',
    type: 'varchar',
    comment: 'Especifique su password de seguridad'
  })
  clave: string

  @Column ({
    name: 'estadoVoto',
    type: 'boolean',
    comment: 'Especificar el voto. Ej: Valido, Nulo, Blanco'
  })
  estadoVoto: boolean

}
