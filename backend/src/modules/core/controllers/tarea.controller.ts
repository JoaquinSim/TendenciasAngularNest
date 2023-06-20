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
import { CreateTareaDto, UpdateTareaDto } from '@core/dto';
import { TareaService } from '@core/services';
import { TareaEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Tareas')
@Controller('Tarea')
export class TareaController {
  constructor(private TareaService: TareaService) {}

  @ApiOperation({ summary: 'Catalogue Tarea' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.TareaService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catalogue Tarea`,
      title: `Catalogue`,
    };
  }

  @ApiOperation({ summary: 'Create Tarea' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateTareaDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.TareaService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Tarea was created',
      title: 'Tarea Created',
    };
  }

  @ApiOperation({ summary: 'Find All Tarea' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.TareaService.findAll();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Find all Tarea',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find Tarea' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.TareaService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `Find Tarea`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'UpdateTarea Tarea' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateTareaDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.TareaService.update(id, payload);
    return {
      data: serviceResponse.data,
      message: `Tarea was updated`,
      title: `Tarea Updated`,
    };
  }

  @ApiOperation({ summary: 'Delete Tarea' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.TareaService.remove(id);
    return {
      data: serviceResponse.data,
      message: `Tarea was deleted`,
      title: `Tarea Deleted`,
    };
  }

  @ApiOperation({ summary: 'Delete All Tarea' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: TareaEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.TareaService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Tarea was deleted`,
      title: `Tarea Deleted`,
    };
  }
}
