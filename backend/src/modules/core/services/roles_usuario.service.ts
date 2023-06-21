import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  // CreateCargoDto,
  // UpdateCargoDto,
  // FilterCargoDto,
  PaginationDto,
} from '@core/dto';
import { Roles_UsuarioEntity } from '@core/entities';
import { InstitutionsService, CataloguesService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { any } from 'joi';

@Injectable()
export class Roles_UsuarioService {
  constructor(
    @Inject(RepositoryEnum.ROLES_USUARIO_REPOSITORY)
    private roles_usuarioRepository: Repository<Roles_UsuarioEntity>,
    private institutionService: InstitutionsService,
    private cataloguesService: CataloguesService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.roles_usuarioRepository.findAndCount({
      relations: ['IdRoles_Usuario', 'nombre', 'roles_usuario'],
      take: 1000,
    });

    return {
      pagination: {
        totalItems: response[1],
        limit: 10,
      },
      data: response[0],
    };
  }

  async create(payload: any): Promise<ServiceResponseHttpModel> {
    const newRoles_Usuario = this.roles_usuarioRepository.create(payload);

    // newCareer.institution = await this.institutionService.findOne(
    //   payload.institution.id,
    // );

    newRoles_Usuario.modality = await this.cataloguesService.findOne(
      payload.modality.id,
    );

    newRoles_Usuario.state = await this.cataloguesService.findOne(payload.state.id);

    //newCandidato.type = await this.cataloguesService.findOne(payload.type.id);

    const roles_usuarioCreated = await this.roles_usuarioRepository.save(newRoles_Usuario);

    return { data: roles_usuarioCreated };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.roles_usuarioRepository.findAndCount({
      relations: ['IdRoles_Usuario', 'nombre', 'roles_usuario'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const roles_usuario = await this.roles_usuarioRepository.findOne({
      relations: ['IdRoles_Usuario', 'nombre', 'roles_usuario'],
      where: {
        id,
      },
    });

    if (!roles_usuario) {
      throw new NotFoundException(`El rol_usuario con ID:  ${id} no se encontro`);
    }
    return { data: roles_usuario };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const roles_usuario = await this.roles_usuarioRepository.findOneBy({ id });
    if (!roles_usuario) {
      throw new NotFoundException(`el rol_usuario con id:  ${id} no se encontro`);
    }
    this.roles_usuarioRepository.merge(roles_usuario, payload);
    const roles_usuarioUpdated = await this.roles_usuarioRepository.save(roles_usuario);
    return { data: roles_usuarioUpdated };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const roles_usuario = await this.roles_usuarioRepository.findOneBy({ id });

    if (!roles_usuario) {
      throw new NotFoundException(`El rol_usuario con ID:  ${id} no se encontro`);
    }

    const roles_usuarioDeleted = await this.roles_usuarioRepository.softRemove(roles_usuario);

    return { data: roles_usuarioDeleted };
  }

  async removeAll(payload: Roles_UsuarioEntity[]): Promise<ServiceResponseHttpModel> {
    const roles_usuarioDeleted = await this.roles_usuarioRepository.softRemove(payload);
    return { data: roles_usuarioDeleted };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<Roles_UsuarioEntity>
      | FindOptionsWhere<Roles_UsuarioEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ idRoles_Usuario: ILike(`%${search}%`) });
      where.push({ nombre: ILike(`%${search}%`) });
      where.push({ roles_usuario: ILike(`%${search}%`) });
    }

    const response = await this.roles_usuarioRepository.findAndCount({
      relations: ['IdRoles_Usuario', 'nombre', 'roles_usuario'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      pagination: { limit, totalItems: response[1] },
      data: response[0],
    };
  }
}