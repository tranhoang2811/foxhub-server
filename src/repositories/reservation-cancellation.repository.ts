import {inject, Getter} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {ReservationCancellation, ReservationCancellationRelations, Reservation} from '../models';
import {CrudRepository} from './crud.repository.base';
import {repository, BelongsToAccessor} from '@loopback/repository';
import {ReservationRepository} from './reservation.repository';

export class ReservationCancellationRepository extends CrudRepository<
  ReservationCancellation,
  typeof ReservationCancellation.prototype.id,
  ReservationCancellationRelations
> {

  public readonly reservation: BelongsToAccessor<Reservation, typeof ReservationCancellation.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ReservationRepository') protected reservationRepositoryGetter: Getter<ReservationRepository>,
  ) {
    super(ReservationCancellation, dataSource);
    this.reservation = this.createBelongsToAccessorFor('reservation', reservationRepositoryGetter,);
    this.registerInclusionResolver('reservation', this.reservation.inclusionResolver);
  }
}
