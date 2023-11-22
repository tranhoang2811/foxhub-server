import {inject} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {Reservation, ReservationRelations} from '../models';
import {CrudRepository} from './crud.repository.base';

export class ReservationRepository extends CrudRepository<
  Reservation,
  typeof Reservation.prototype.id,
  ReservationRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Reservation, dataSource);
  }
}
