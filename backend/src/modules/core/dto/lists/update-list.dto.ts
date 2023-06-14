import { PartialType } from '@nestjs/mapped-types';
import { CreateListDto } from '@core/dto';

export class UpdateListDto extends PartialType(CreateListDto) {}
