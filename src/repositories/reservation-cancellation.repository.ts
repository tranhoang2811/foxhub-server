import {inject} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {ReservationCancellation, ReservationCancellationRelations} from '../models';
import {CrudRepository} from './crud.repository.base';

export class ReservationCancellationRepository extends CrudRepository<
  ReservationCancellation,
  typeof ReservationCancellation.prototype.id,
  ReservationCancellationRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ReservationCancellation, dataSource);
  }
}
