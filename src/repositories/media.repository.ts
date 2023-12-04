import {inject} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {Media, MediaRelations} from '../models';
import {CrudRepository} from './crud.repository.base';

export class MediaRepository extends CrudRepository<
  Media,
  typeof Media.prototype.id,
  MediaRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(Media, dataSource);
  }
}
