import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateBikeDto {
  @IsString({ message: 'El campo debe ser de tipo string' })
  mark: string;

  @IsNumber({}, { message: 'El campo userId debe ser un numero' })
  @IsPositive({ message: 'El campo userId debe ser un entero positivo' })
  price: number;

  @IsNumber({}, { message: 'studentId Tiene que ser de tipo numero' })
  @IsPositive({ message: 'studentId debe ser un entero positivo' })
  creation: string;

  @IsNumber({}, { message: 'studentId Tiene que ser de tipo numero' })
  @IsPositive({ message: 'studentId debe ser un entero positivo' })
  disponibility: boolean;
}
