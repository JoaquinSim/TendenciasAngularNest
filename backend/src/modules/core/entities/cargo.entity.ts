import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cargo', { schema: 'core' })
export class CatalogueEntity {
  @PrimaryGeneratedColumn('uuid')
  idCargo: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del cargo',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la ultima actualizacion del cargo',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion del cargo',
  })
  deletedAt: Date;

  @ManyToOne(() => CatalogueEntity, (category) => category.children)
  parent: CatalogueEntity;

  @OneToMany(() => CatalogueEntity, (category) => category.parent)
  children: CatalogueEntity[];

  /*
  // COLUMS
  */
  @Column({
    name: 'nombreCargo',
    type: 'varchar',
    comment: 'Nombre del cargo. Ej: ',
  })
  nombreCargo: string;

  @Column({
    name: 'descripcionCargo',
    type: 'varchar',
    comment: 'Descripcion del cargo en el que se encuentra. Ej. Presidente, Secretario'
  })
  descripcionCargo: string;
}
