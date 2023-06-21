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
import { CreateCareerDto, UpdateCareerDto, FilterCareerDto } from '@core/dto';
import { RolesService } from '@core/services';
import { roles-listEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) { }

  @ApiOperation({ summary: 'Catalogue Roles' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rolesService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catalogue Roles`,
      title: `Catalogue Roles`,
    };
  }

  @ApiOperation({ summary: 'Create Roles' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCareerDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rolesService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Rol creado con Exito',
      title: 'Rol Creado',
    };
  }

  @ApiOperation({ summary: 'Find All Roles' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterCareerDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rolesService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Encuentra todos los Roles',
      title: 'Encontrado con Exito',
    };
  }

  @ApiOperation({ summary: 'Find Roles' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rolesService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `Encontrar Roles`,
      title: `Exito`,
    };
  }

  @ApiOperation({ summary: 'Update Roles' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateCareerDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rolesService.update(id, payload);
    return {
      data: serviceResponse.data,
      message: `El rol fue Actualizado`,
      title: `Rol Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Delete Rol' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.rolesService.remove(id);
    return {
      data: serviceResponse.data,
      message: `Rol Eliminado`,
      title: `Rol Eliminado`,
    };
  }
}
