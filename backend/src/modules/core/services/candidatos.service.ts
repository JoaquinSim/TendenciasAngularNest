import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateCandidatosListaDto,
  UpdateCandidatoDto,
  FilterCandidatoListaDto,
  PaginationDto,
} from '@core/dto';
import { CandidatosEntity } from '@core/entities';
import { InstitutionsService, CataloguesService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class CandidatosListService {
  constructor(
    @Inject(RepositoryEnum.CANDIDATOLISTA_REPOSITORY)
    private candidatosListaRepository: Repository<CandidatosEntity>,
    private institutionService: InstitutionsService,
    private cataloguesService: CataloguesService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.candidatosListaRepository.findAndCount({
      relations: ['institution', 'modality', 'state', 'type'],
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

  async create(payload: CreateCandidatosListaDto): Promise<ServiceResponseHttpModel> {
    const newCandidato = this.candidatosListaRepository.create(payload);

    // newCareer.institution = await this.institutionService.findOne(
    //   payload.institution.id,
    // );

    newCandidato.modality = await this.cataloguesService.findOne(
      payload.modality.id,
    );

    newCandidato.state = await this.cataloguesService.findOne(payload.state.id);

    newCandidato.type = await this.cataloguesService.findOne(payload.type.id);

    const candidatoCreated = await this.candidatosListaRepository.save(newCandidato);

    return { data: candidatoCreated };
  }

  async findAll(params?: FilterCandidatoListaDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.candidatosListaRepository.findAndCount({
      relations: ['institution', 'modality', 'state', 'type'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const candidatos = await this.candidatosListaRepository.findOne({
      relations: ['institution', 'modality', 'state', 'type'],
      where: {
        id,
      },
    });

    if (!candidatos) {
      throw new NotFoundException(`El Candidato con ID:  ${id} no se encontro`);
    }
    return { data: candidatos };
  }

  async update(
    id: string,
    payload: UpdateCandidatoDto,
  ): Promise<ServiceResponseHttpModel> {
    const career = await this.candidatosListaRepository.findOneBy({ id });
    if (!career) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }
    this.candidatosListaRepository.merge(career, payload);
    const candidatoUpdated = await this.candidatosListaRepository.save(career);
    return { data: candidatoUpdated };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const candidato = await this.candidatosListaRepository.findOneBy({ id });

    if (!candidato) {
      throw new NotFoundException(`El Candidato con ID:  ${id} no se encontro`);
    }

    const candidatoDeleted = await this.candidatosListaRepository.softRemove(candidato);

    return { data: candidatoDeleted };
  }

  async removeAll(payload: CandidatosEntity[]): Promise<ServiceResponseHttpModel> {
    const candidatoDeleted = await this.candidatosListaRepository.softRemove(payload);
    return { data: candidatoDeleted };
  }

  private async paginateAndFilter(
    params: FilterCandidatoListaDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CandidatosEntity>
      | FindOptionsWhere<CandidatosEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ acronym: ILike(`%${search}%`) });
      where.push({ code: ILike(`%${search}%`) });
      where.push({ codeSniese: ILike(`%${search}%`) });
      where.push({ logo: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
      where.push({ shortName: ILike(`%${search}%`) });
      where.push({ degree: ILike(`%${search}%`) });
    }

    const response = await this.candidatosListaRepository.findAndCount({
      relations: ['institution', 'modality', 'state', 'type'],
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
