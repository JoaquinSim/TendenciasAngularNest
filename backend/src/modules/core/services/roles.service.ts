import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  // CreateCargoDto,
  // UpdateCargoDto,
  // FilterCargoDto,
  PaginationDto,
} from '@core/dto';
import { RolesEntity } from '@core/entities';
import { InstitutionsService, CataloguesService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { any } from 'joi';

@Injectable()
export class RolesService {
  constructor(
    @Inject(RepositoryEnum.ROLES_REPOSITORY)
    private rolesRepository: Repository<RolesEntity>,
    private institutionService: InstitutionsService,
    private cataloguesService: CataloguesService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.rolesRepository.findAndCount({
      relations: ['IdRole', 'nombre', 'role'],
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
    const newRoles = this.rolesRepository.create(payload);

    // newCareer.institution = await this.institutionService.findOne(
    //   payload.institution.id,
    // );

    newRoles.modality = await this.cataloguesService.findOne(
      payload.modality.id,
    );

    newRoles.state = await this.cataloguesService.findOne(payload.state.id);

    //newCandidato.type = await this.cataloguesService.findOne(payload.type.id);

    const rolesCreated = await this.rolesRepository.save(newRoles);

    return { data: rolesCreated };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.rolesRepository.findAndCount({
      relations: ['IdRoles', 'nombre', 'roles'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const roles = await this.rolesRepository.findOne({
      relations: ['IdRoles', 'nombre', 'roles'],
      where: {
        id,
      },
    });

    if (!roles) {
      throw new NotFoundException(`El rol con ID:  ${id} no se encontro`);
    }
    return { data: roles };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const roles = await this.rolesRepository.findOneBy({ id });
    if (!roles) {
      throw new NotFoundException(`el rol con id:  ${id} no se encontro`);
    }
    this.rolesRepository.merge(roles, payload);
    const rolesUpdated = await this.rolesRepository.save(roles);
    return { data: rolesUpdated };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const roles = await this.rolesRepository.findOneBy({ id });

    if (!roles) {
      throw new NotFoundException(`El rol con ID:  ${id} no se encontro`);
    }

    const rolesDeleted = await this.rolesRepository.softRemove(roles);

    return { data: rolesDeleted };
  }

  async removeAll(payload: RolesEntity[]): Promise<ServiceResponseHttpModel> {
    const rolesDeleted = await this.rolesRepository.softRemove(payload);
    return { data: rolesDeleted };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<RolesEntity>
      | FindOptionsWhere<RolesEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ idRoles: ILike(`%${search}%`) });
      where.push({ nombre: ILike(`%${search}%`) });
      where.push({ roles: ILike(`%${search}%`) });
    }

    const response = await this.rolesRepository.findAndCount({
      relations: ['IdRoles', 'nombre', 'roles'],
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