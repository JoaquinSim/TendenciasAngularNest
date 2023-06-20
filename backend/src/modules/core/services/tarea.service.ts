import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateTareaDto,
  UpdateTareaDto,
  FilterCareerDto,
  PaginationDto,
} from '@core/dto';
import { TareaEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class TareaService {
  constructor(
    @Inject(RepositoryEnum.TAREA_REPOSITORY)
    private TareaRepository: Repository<TareaEntity>,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.TareaRepository.findAndCount({
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

  async create(payload: CreateTareaDto): Promise<ServiceResponseHttpModel> {
    const newTarea = this.TareaRepository.create(payload);

    return { data: newTarea };
  }

  async findAll(): Promise<ServiceResponseHttpModel> {
    //All
    const data = await this.TareaRepository.findAndCount({
      // relations: ['institution', 'modality', 'state', 'type'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id_tarea: string): Promise<any> {
    const Tarea = await this.TareaRepository.findOne({
      //relations: ['institution', 'modality', 'state', 'type'],
      where: {
        id_tarea,
      },
    });

    if (!Tarea) {
      throw new NotFoundException(
        `El Tarea con id:  ${id_tarea} no se encontro`,
      );
    }
    return { data: Tarea };
  }

  async update(
    id_tarea: string,
    payload: UpdateTareaDto,
  ): Promise<ServiceResponseHttpModel> {
    const Tarea = await this.TareaRepository.findOneBy({
      id_tarea,
    });
    if (!Tarea) {
      throw new NotFoundException(
        `El Tarea con id:  ${id_tarea} no se encontro`,
      );
    }
    this.TareaRepository.merge(Tarea, payload);
    const TareaUpdated = await this.TareaRepository.save(Tarea);
    return { data: TareaUpdated };
  }

  async remove(id_tarea: string): Promise<ServiceResponseHttpModel> {
    const Tarea = await this.TareaRepository.findOneBy({
      id_tarea,
    });

    if (!Tarea) {
      throw new NotFoundException(
        `El Tarea con id:  ${id_tarea} no se encontro`,
      );
    }

    const TareaDeleted = await this.TareaRepository.softRemove(Tarea);

    return { data: TareaDeleted };
  }

  async removeAll(payload: TareaEntity[]): Promise<ServiceResponseHttpModel> {
    const TareaDeleted = await this.TareaRepository.softRemove(payload);
    return { data: TareaDeleted };
  }
}
