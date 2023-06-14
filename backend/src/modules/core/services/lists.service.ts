import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateCareerDto,
  UpdateCareerDto,
  FilterCareerDto,
  PaginationDto,
  CreateListDto,
  UpdateListDto,
  ListDto,
} from '@core/dto';
import { CareerEntity, ListEntity } from '@core/entities';
import { InstitutionsService, CataloguesService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class ListsService {
  constructor(
    @Inject(RepositoryEnum.LIST_REPOSITORY)
    private listRepository: Repository<ListEntity>, // private institutionService: InstitutionsService, // private cataloguesService: CataloguesService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.listRepository.findAndCount({
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

  async create(payload: CreateListDto): Promise<ServiceResponseHttpModel> {
    const newList = this.listRepository.create(payload);

    // newCareer.institution = await this.institutionService.findOne(
    //   payload.institution.id,
    // );

    // newCareer.modality = await this.cataloguesService.findOne(
    //   payload.modality.id,
    // );

    // newCareer.state = await this.cataloguesService.findOne(payload.state.id);

    // newCareer.type = await this.cataloguesService.findOne(payload.type.id);

    const listCreated = await this.listRepository.save(newList);

    return { data: listCreated };
  }

  async findAll(params?: ListDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    // if (params?.limit > 0 && params?.page >= 0) {
    //   return await this.paginateAndFilter(params);
    // }

    //Filter by other field

    //All
    const data = await this.listRepository.findAndCount();

    return { data };
  }

  async findOne(id: string): Promise<any> {
    const list = await this.listRepository.findOne({
      //  relations: ['institution', 'modality', 'state', 'type'],
      where: {
        id,
      },
    });

    if (!list) {
      throw new NotFoundException(`La lista con id:  ${id} no se encontro`);
    }
    return { data: list };
  }

  async update(
    id: string,
    payload: UpdateListDto,
  ): Promise<ServiceResponseHttpModel> {
    const list = await this.listRepository.findOneBy({ id });
    if (!list) {
      throw new NotFoundException(`La lista con id:  ${id} no se encontro`);
    }
    this.listRepository.merge(list, payload);
    const listUpdated = await this.listRepository.save(list);
    return { data: listUpdated };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const list = await this.listRepository.findOneBy({ id });

    if (!list) {
      throw new NotFoundException(`La lista con id:  ${id} no se encontro`);
    }

    const listDeleted = await this.listRepository.softRemove(list);

    return { data: listDeleted };
  }

  async removeAll(payload: ListEntity[]): Promise<ServiceResponseHttpModel> {
    const listDeleted = await this.listRepository.softRemove(payload);
    return { data: listDeleted };
  }

  //   private async paginateAndFilter(
  //     params: FilterCareerDto,
  //   ): Promise<ServiceResponseHttpModel> {
  //     let where:
  //       | FindOptionsWhere<CareerEntity>
  //       | FindOptionsWhere<CareerEntity>[];
  //     where = {};
  //     let { page, search } = params;
  //     const { limit } = params;

  //     if (search) {
  //       search = search.trim();
  //       page = 0;
  //       where = [];
  //       where.push({ acronym: ILike(`%${search}%`) });
  //       where.push({ code: ILike(`%${search}%`) });
  //       where.push({ codeSniese: ILike(`%${search}%`) });
  //       where.push({ logo: ILike(`%${search}%`) });
  //       where.push({ name: ILike(`%${search}%`) });
  //       where.push({ shortName: ILike(`%${search}%`) });
  //       where.push({ degree: ILike(`%${search}%`) });
  //     }

  //     const response = await this.careerRepository.findAndCount({
  //       relations: ['institution', 'modality', 'state', 'type'],
  //       where,
  //       take: limit,
  //       skip: PaginationDto.getOffset(limit, page),
  //     });

  //     return {
  //       pagination: { limit, totalItems: response[1] },
  //       data: response[0],
  //     };
  //   }
}
