import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, In } from 'typeorm';
import {
  // CreateCatalogueDto,
  // CreateStudentDto,
  // FilterStudentDto,
  PaginationDto,
  // UpdateStudentDto,
} from '@core/dto';
import { UsuarioEntity } from '@core/entities';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class StudentsService {
  constructor(
    @Inject(RepositoryEnum.USUARIO_REPOSITORY)
    private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async create(payload: any) {
    const newUsuario = this.usuarioRepository.create(payload);

    const usuarioCreated = await this.usuarioRepository.save(newUsuario);

    return await this.usuarioRepository.save(usuarioCreated);
  }

  async catalogue() {
    const data = await this.usuarioRepository.findAndCount({
      take: 1000,
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findAll(params?: any) {
    //Pagination & Filter by search
    if (params) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.usuarioRepository.findAndCount();

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no se encuentra');
    }

    return usuario;
  }

  async update(id: string, payload: any) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException('Usuario not found');
    }

    this.usuarioRepository.merge(usuario, payload);

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException('usuario not found');
    }

    return await this.usuarioRepository.softRemove(usuario);
  }

  async removeAll(payload: UsuarioEntity[]) {
    return this.usuarioRepository.softRemove(payload);
  }

  private async paginateAndFilter(params: any) {
    let where:
      | FindOptionsWhere<UsuarioEntity>
      | FindOptionsWhere<UsuarioEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const data = await this.usuarioRepository.findAndCount({
      relations: ['bloodType', 'gender'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { pagination: { limit, totalItems: data[1] }, data: data[0] };
  }
}
