import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, In } from 'typeorm';
import { RepositoryEnum } from '@shared/enums';
import { CreateBikeDto } from './dto/create-bike.dto';
import { BikeEntity } from './bike.entity';
import { UpdateBiketDto } from './dto/update-bike.dto';

@Injectable()
export class BikeService {
  constructor(
    @Inject(RepositoryEnum.STUDENT_REPOSITORY)
    private repository: Repository<BikeEntity>,
  ) {}

  async create(payload: CreateBikeDto) {
    const newBike = this.repository.create(payload);

    const bikeCreated = await this.repository.save(newBike);

    return await this.repository.save(bikeCreated);
  }

  async catalogue() {
    const data = await this.repository.findAndCount({
      take: 1000,
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findAll() {
    //All
    const data = await this.repository.findAndCount();

    return data;
  }

  async findOne(id: string) {
    const bike = await this.repository.findOne({
      where: { id },
    });

    if (!bike) {
      throw new NotFoundException('bike not found');
    }

    return bike;
  }

  async update(id: string, payload: UpdateBiketDto) {
    const bike = await this.repository.findOneBy({ id });

    if (!bike) {
      throw new NotFoundException('bike not found');
    }

    this.repository.merge(bike, payload);

    return this.repository.save(bike);
  }

  async remove(id: string) {
    const bike = await this.repository.findOneBy({ id });

    if (!bike) {
      throw new NotFoundException('Bike not found');
    }

    return await this.repository.softRemove(bike);
  }

  async removeAll(payload: BikeEntity[]) {
    return this.repository.softRemove(payload);
  }
  /*
  private async paginateAndFilter(params: FilterStudentDto) {
    let where:
      | FindOptionsWhere<StudentEntity>
      | FindOptionsWhere<StudentEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const data = await this.repository.findAndCount({
      relations: ['bloodType', 'gender'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { pagination: { limit, totalItems: data[1] }, data: data[0] };
  }*/
}
