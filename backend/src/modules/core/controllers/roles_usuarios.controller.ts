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
import { Roles_UsuarioService } from '@core/services';
import { roles_usuario-listEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Roles_Usuario')
  @Controller('roles_usuario')
export class Roles_UsuarioController {
  constructor(private roles_usuarioService: Roles_UsuarioService) { }

  @ApiOperation({ summary: 'Catalogue Roles_Usuario' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.roles_usuarioService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catalogue Roles_usuario`,
      title: `Catalogue Roles_usuario`,
    };
  }

  @ApiOperation({ summary: 'Create Roles_usuario' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCareerDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.roles_usuarioService.create(payload);

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
    const serviceResponse = await this.roles_usuarioService.findAll(params);

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
    const serviceResponse = await this.roles_usuarioService.findOne(id);

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
    const serviceResponse = await this.roles_usuarioService.update(id, payload);
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
    const serviceResponse = await this.roles_usuarioService.remove(id);
    return {
      data: serviceResponse.data,
      message: `Rol Eliminado`,
      title: `Rol Eliminado`,
    };
  }
}
