import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bike', { schema: 'core' })
export class BikeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'mark', comment: 'Marca de la bicicleta' })
  mark: string;
  @Column('date', { name: 'creatioin', comment: 'Fecha de la bicicleta' })
  creation: string;
  @Column('int', { name: 'price', comment: 'Precio de la bicicleta' })
  price: number;
  @Column('boolean', {
    name: 'disponibility',
    comment: 'Disponibilidad',
  })
  disponibility: boolean;
}
