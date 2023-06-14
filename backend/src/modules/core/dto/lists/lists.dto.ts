import {
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  isNotEmpty,
} from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
  minLengthValidationOptions,
} from '@shared/validation';

export class ListDto {
  //   @IsNotEmpty(isNotEmptyValidationOptions())
  //   readonly nameList: InstitutionEntity;

  //   @IsNotEmpty(isNotEmptyValidationOptions())
  //   readonly modality: CatalogueEntity;

  //   @IsNotEmpty(isNotEmptyValidationOptions())
  //   readonly state: CatalogueEntity;

  //   @IsOptional()
  //   readonly type: CatalogueEntity;
  @IsNotEmpty()
  @IsString(isStringValidationOptions())
  @MinLength(3, minLengthValidationOptions())
  @MaxLength(15, maxLengthValidationOptions())
  readonly nameList: string;

  @IsString(isStringValidationOptions())
  @MinLength(3, minLengthValidationOptions())
  @MaxLength(15, maxLengthValidationOptions())
  readonly slogan: string;

  @IsString(isStringValidationOptions())
  readonly proposalList: string;

  @IsString(isStringValidationOptions())
  readonly colorList: string;

  @IsNumber()
  readonly numberList: number;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly logoList: string;

  @IsBoolean()
  readonly state: boolean;
}
