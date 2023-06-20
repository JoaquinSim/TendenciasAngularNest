import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateTipoListaDto,
  UpdateTipoListaDto,
  FilterCareerDto,
  PaginationDto,
} from '@core/dto';
import { TipoListaEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class TipoListaService {
  constructor(
    @Inject(RepositoryEnum.TIPO_LISTA_REPOSITORY)
    private tipoListaRepository: Repository<TipoListaEntity>,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.tipoListaRepository.findAndCount({
      //relations: ['institution', 'modality', 'state', 'type'],
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

  async create(payload: CreateTipoListaDto): Promise<ServiceResponseHttpModel> {
    const newTipoLista = this.tipoListaRepository.create(payload);

    return { data: newTipoLista };
  }

  async findAll(): Promise<ServiceResponseHttpModel> {
    //All
    const data = await this.tipoListaRepository.findAndCount({
      // relations: ['institution', 'modality', 'state', 'type'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id_tipoLista: string): Promise<any> {
    const lista = await this.tipoListaRepository.findOne({
      //relations: ['institution', 'modality', 'state', 'type'],
      where: {
        id_tipoLista,
      },
    });

    if (!lista) {
      throw new NotFoundException(
        `La lista con id:  ${id_tipoLista} no se encontro`,
      );
    }
    return { data: lista };
  }

  async update(
    id_tipoLista: string,
    payload: UpdateTipoListaDto,
  ): Promise<ServiceResponseHttpModel> {
    const lista = await this.tipoListaRepository.findOneBy({
      id_tipoLista,
    });
    if (!lista) {
      throw new NotFoundException(
        `La lista con id:  ${id_tipoLista} no se encontro`,
      );
    }
    this.tipoListaRepository.merge(lista, payload);
    const tipoListaUpdated = await this.tipoListaRepository.save(lista);
    return { data: tipoListaUpdated };
  }

  async remove(id_tipoLista: string): Promise<ServiceResponseHttpModel> {
    const lista = await this.tipoListaRepository.findOneBy({
      id_tipoLista,
    });

    if (!lista) {
      throw new NotFoundException(
        `El tipo de lista con id:  ${id_tipoLista} no se encontro`,
      );
    }

    const tiposListaDeleted = await this.tipoListaRepository.softRemove(lista);

    return { data: tiposListaDeleted };
  }

  async removeAll(
    payload: TipoListaEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const listaDeleted = await this.tipoListaRepository.softRemove(payload);
    return { data: listaDeleted };
  }
}
