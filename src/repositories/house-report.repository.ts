import {inject} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {HouseReport, HouseReportRelations} from '../models';
import {CrudRepository} from './crud.repository.base';

export class HouseReportRepository extends CrudRepository<
  HouseReport,
  typeof HouseReport.prototype.id,
  HouseReportRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(HouseReport, dataSource);
  }
}
