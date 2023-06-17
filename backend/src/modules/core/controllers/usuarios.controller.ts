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
import {
  //CreateUsuarioDto,
  //FilterUsuarioDto,
  //UpdateUsuarioDto,
} from '@core/dto';
import { UsuarioEntity } from '@core/entities';
import { UsuarioService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Information Students')
@Controller('information-students')
export class InformationStudentsController {
  constructor(private usuarioService: UsuarioService) { }

  @ApiOperation({ summary: 'Usuario Creado' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.usuarioService.create(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'Usuario Creado',
      title: 'Creado con Exito',
    };
  }

  @ApiOperation({ summary: 'Lista de Usuarios' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.usuarioService.findAll(
      params,
    );
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Exito',
    };
  }

  @ApiOperation({ summary: 'Ver Usuarios' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.usuarioService.findOne(id);
    return {
      data: serviceResponse.data,
      message: `show ${id}`,
      title: `Exito`,
    };
  }

  @ApiOperation({ summary: 'Actualizar Usuario' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.usuarioService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Usuario Actualizado ${id}`,
      title: `Usuario Actualizado con Exito`,
    };
  }

  @ApiOperation({ summary: 'Eliminar Usuario' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.usuarioService.remove(id);
    return {
      data: serviceResponse.data,
      message: `Usuario Eliminado ${id}`,
      title: `Usuario Eliminado con Exito`,
    };
  }
}
