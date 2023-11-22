import {inject} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {House, HouseRelations} from '../models';
import {CrudRepository} from './crud.repository.base';

export class HouseRepository extends CrudRepository<
  House,
  typeof House.prototype.id,
  HouseRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(House, dataSource);
  }
}
