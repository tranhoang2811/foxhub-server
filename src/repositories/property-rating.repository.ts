import {inject} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {PropertyRating, PropertyRatingRelations} from '../models';
import {CrudRepository} from './crud.repository.base';

export class PropertyRatingRepository extends CrudRepository<
  PropertyRating,
  typeof PropertyRating.prototype.id,
  PropertyRatingRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(PropertyRating, dataSource);
  }
}
