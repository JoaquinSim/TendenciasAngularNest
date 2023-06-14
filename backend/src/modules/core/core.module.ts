import { Global, Module } from '@nestjs/common';
import {
  CareersController,
  CataloguesController,
  CurriculaController,
  InformationStudentsController,
  InstitutionsController,
  StudentsController,
  SubjectsController,
  InformationTeachersController,
  ListController,
} from '@core/controllers';
import {
  CareersService,
  CataloguesService,
  CurriculaService,
  InformationStudentsService,
  InstitutionsService,
  StudentsService,
  SubjectsService,
  InformationTeachersService,
  ListsService,
} from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [
    CareersController,
    CataloguesController,
    CurriculaController,
    InformationStudentsController,
    InformationTeachersController,
    InstitutionsController,
    StudentsController,
    SubjectsController,
    ListController,
  ],
  providers: [
    ...coreProviders,
    CareersService,
    CataloguesService,
    CurriculaService,
    InformationStudentsService,
    InformationTeachersService,
    InstitutionsService,
    StudentsService,
    SubjectsService,
    ListsService,
  ],
  exports: [
    ...coreProviders,
    CareersService,
    CataloguesService,
    CurriculaService,
    InformationStudentsService,
    InformationTeachersService,
    InstitutionsService,
    StudentsService,
    SubjectsService,
    ListsService,
  ],
})
export class CoreModule {}
