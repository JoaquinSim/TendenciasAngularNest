import { PartialType } from '@nestjs/swagger';
import { CreateBikeDto } from './create-bike.dto';

export class UpdateBiketDto extends PartialType(CreateBikeDto) {}
