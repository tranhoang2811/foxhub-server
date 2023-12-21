import {inject} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {AccommodationRating, AccommodationRatingRelations} from '../models';
import {CrudRepository} from './crud.repository.base';

export class AccommodationRatingRepository extends CrudRepository<
  AccommodationRating,
  typeof AccommodationRating.prototype.id,
  AccommodationRatingRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(AccommodationRating, dataSource);
  }
}
