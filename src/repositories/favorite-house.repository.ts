import {inject} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {FavoriteHouse, FavoriteHouseRelations} from '../models';
import {CrudRepository} from './crud.repository.base';

export class FavoriteHouseRepository extends CrudRepository<
  FavoriteHouse,
  typeof FavoriteHouse.prototype.id,
  FavoriteHouseRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(FavoriteHouse, dataSource);
  }
}
