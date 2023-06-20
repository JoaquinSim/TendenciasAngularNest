import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateCronogramaDto,
  UpdateCronogramaDto,
  FilterCareerDto,
  PaginationDto,
} from '@core/dto';
import { CronogramaEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class CronogramaService {
  constructor(
    @Inject(RepositoryEnum.CRONOGRAMA_REPOSITORY)
    private cronogramaRepository: Repository<CronogramaEntity>,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.cronogramaRepository.findAndCount({
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

  async create(
    payload: CreateCronogramaDto,
  ): Promise<ServiceResponseHttpModel> {
    const newCronograma = this.cronogramaRepository.create(payload);

    return { data: newCronograma };
  }

  async findAll(): Promise<ServiceResponseHttpModel> {
    //All
    const data = await this.cronogramaRepository.findAndCount({
      // relations: ['institution', 'modality', 'state', 'type'],
    });

    return { data };
  }

  async findOne(id_cronograma: string): Promise<any> {
    const cronograma = await this.cronogramaRepository.findOne({
      //relations: ['institution', 'modality', 'state', 'type'],
      where: {
        id_cronograma,
      },
    });

    if (!cronograma) {
      throw new NotFoundException(
        `El cronograma con id:  ${id_cronograma} no se encontro`,
      );
    }
    return { data: cronograma };
  }

  async update(
    id_cronograma: string,
    payload: UpdateCronogramaDto,
  ): Promise<ServiceResponseHttpModel> {
    const cronograma = await this.cronogramaRepository.findOneBy({
      id_cronograma,
    });
    if (!cronograma) {
      throw new NotFoundException(
        `El cronograma con id:  ${id_cronograma} no se encontro`,
      );
    }
    this.cronogramaRepository.merge(cronograma, payload);
    const cronogramaUpdated = await this.cronogramaRepository.save(cronograma);
    return { data: cronogramaUpdated };
  }

  async remove(id_cronograma: string): Promise<ServiceResponseHttpModel> {
    const cronograma = await this.cronogramaRepository.findOneBy({
      id_cronograma,
    });

    if (!cronograma) {
      throw new NotFoundException(
        `El cronograma con id:  ${id_cronograma} no se encontro`,
      );
    }

    const cronogramaDeleted = await this.cronogramaRepository.softRemove(
      cronograma,
    );

    return { data: cronogramaDeleted };
  }

  async removeAll(
    payload: CronogramaEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const cronogramaDeleted = await this.cronogramaRepository.softRemove(
      payload,
    );
    return { data: cronogramaDeleted };
  }
}
