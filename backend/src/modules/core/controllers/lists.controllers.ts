import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { ListsService } from '../services/lists.service';
import { CreateListDto, UpdateListDto } from '@core/dto';
import { ListEntity } from '../entities/list.entity';

@ApiTags('Lists')
@Controller('lists')
export class ListController {
  constructor(private listsService: ListsService) {}

  @ApiOperation({ summary: 'Catalogue List' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.listsService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catalogue List`,
      title: `Catalogue`,
    };
  }

  @ApiOperation({ summary: 'Create List' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateListDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.listsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'List was created',
      title: 'List Created',
    };
  }

  @ApiOperation({ summary: 'Find All List' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.listsService.findAll();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Find all list',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find list' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.listsService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `Find list`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update list' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateListDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.listsService.update(id, payload);
    return {
      data: serviceResponse.data,
      message: `List was updated`,
      title: `List Updated`,
    };
  }

  @ApiOperation({ summary: 'Delete List' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.listsService.remove(id);
    return {
      data: serviceResponse.data,
      message: `List was deleted`,
      title: `List Deleted`,
    };
  }

  @ApiOperation({ summary: 'Delete All List' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: ListEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.listsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `List was deleted`,
      title: `List Deleted`,
    };
  }
}
