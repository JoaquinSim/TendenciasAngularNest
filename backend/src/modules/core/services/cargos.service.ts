import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  // CreateCargoDto,
  // UpdateCargoDto,
  // FilterCargoDto,
  PaginationDto,
} from '@core/dto';
import { CargoEntity } from '@core/entities';
import { InstitutionsService, CataloguesService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { any } from 'joi';

@Injectable()
export class CargosService {
  constructor(
    @Inject(RepositoryEnum.CARGO_REPOSITORY)
    private cargoRepository: Repository<CargoEntity>,
    private institutionService: InstitutionsService,
    private cataloguesService: CataloguesService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.cargoRepository.findAndCount({
      relations: ['IdCargo', 'nombre', 'cargo'],
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
    const newCargo = this.cargoRepository.create(payload);

    // newCareer.institution = await this.institutionService.findOne(
    //   payload.institution.id,
    // );

    newCargo.modality = await this.cataloguesService.findOne(
      payload.modality.id,
    );

    newCargo.state = await this.cataloguesService.findOne(payload.state.id);

    //newCandidato.type = await this.cataloguesService.findOne(payload.type.id);

    const cargoCreated = await this.cargoRepository.save(newCargo);

    return { data: cargoCreated };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.cargoRepository.findAndCount({
      relations: ['IdCargo', 'nombre', 'cargo'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const cargo = await this.cargoRepository.findOne({
      relations: ['IdCargo', 'nombre', 'cargo'],
      where: {
        id,
      },
    });

    if (!cargo) {
      throw new NotFoundException(`El cargo con ID:  ${id} no se encontro`);
    }
    return { data: cargo };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const cargo = await this.cargoRepository.findOneBy({ id });
    if (!cargo) {
      throw new NotFoundException(`el cargo con id:  ${id} no se encontro`);
    }
    this.cargoRepository.merge(cargo, payload);
    const cargoUpdated = await this.cargoRepository.save(cargo);
    return { data: cargoUpdated };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const cargo = await this.cargoRepository.findOneBy({ id });

    if (!cargo) {
      throw new NotFoundException(`El cargo con ID:  ${id} no se encontro`);
    }

    const cargoDeleted = await this.cargoRepository.softRemove(cargo);

    return { data: cargoDeleted };
  }

  async removeAll(payload: CargoEntity[]): Promise<ServiceResponseHttpModel> {
    const cargoDeleted = await this.cargoRepository.softRemove(payload);
    return { data: cargoDeleted };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CargoEntity>
      | FindOptionsWhere<CargoEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ idCargo: ILike(`%${search}%`) });
      where.push({ nombre: ILike(`%${search}%`) });
      where.push({ cargo: ILike(`%${search}%`) });
    }

    const response = await this.cargoRepository.findAndCount({
      relations: ['IdCargo', 'nombre', 'cargo'],
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
