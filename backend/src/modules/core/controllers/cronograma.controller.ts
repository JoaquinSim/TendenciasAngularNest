import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateCronogramaDto, UpdateCronogramaDto } from '@core/dto';
import { CronogramaService } from '@core/services';
import { CronogramaEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Cronogramas')
@Controller('cronograma')
export class CronogramaController {
  constructor(private CronogramaService: CronogramaService) {}

  @ApiOperation({ summary: 'Catalogue Cronograma' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.CronogramaService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catalogue Cronograma`,
      title: `Catalogue`,
    };
  }

  @ApiOperation({ summary: 'Create Cronograma' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateCronogramaDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.CronogramaService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Cronograma was created',
      title: 'Cronograma Created',
    };
  }

  @ApiOperation({ summary: 'Find All Cronograma' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.CronogramaService.findAll();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Find all Cronograma',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find Cronograma' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.CronogramaService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `Find Cronograma`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update Cronograma' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateCronogramaDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.CronogramaService.update(id, payload);
    return {
      data: serviceResponse.data,
      message: `Cronograma was updated`,
      title: `Cronograma Updated`,
    };
  }

  @ApiOperation({ summary: 'Delete Cronograma' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.CronogramaService.remove(id);
    return {
      data: serviceResponse.data,
      message: `Cronograma was deleted`,
      title: `Cronograma Deleted`,
    };
  }

  @ApiOperation({ summary: 'Delete All Cronograma' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: CronogramaEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.CronogramaService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Cronograma was deleted`,
      title: `Cronograma Deleted`,
    };
  }
}
