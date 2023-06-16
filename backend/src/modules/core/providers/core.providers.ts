import { DataSource } from 'typeorm';
import {
  CareerEntity,
  CatalogueEntity,
  CurriculumEntity,
  InformationStudentEntity,
  InformationTeacherEntity,
  InstitutionEntity,
  StudentEntity,
  SubjectEntity,
  ListEntity,
  ListTypeEntity,
  ConfigurationEntity,
  UserTypeEntity,
  TaskEntity,
  PeriodEntity,
} from '@core/entities';
import { DataSourceEnum, RepositoryEnum } from '@shared/enums';

export const coreProviders = [
  {
    provide: RepositoryEnum.CAREER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CareerEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CATALOGUE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CatalogueEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CURRICULUM_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CurriculumEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.INFORMATION_STUDENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InformationStudentEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.INFORMATION_TEACHER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InformationTeacherEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.INSTITUTION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InstitutionEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.STUDENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(StudentEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.SUBJECT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SubjectEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.LIST_TYPE_RESPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ListTypeEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CONFIGURATION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ConfigurationEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.USER_TYPE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserTypeEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.TASK_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TaskEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.PERIODO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PeriodEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
];
