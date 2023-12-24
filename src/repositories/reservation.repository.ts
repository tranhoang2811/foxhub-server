import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Reservation, ReservationRelations, Room, User, ReservationCancellation} from '../models';
import {CrudRepository} from './crud.repository.base';
import {RoomRepository} from './room.repository';
import {UserRepository} from './user.repository';
import {ReservationCancellationRepository} from './reservation-cancellation.repository';

export class ReservationRepository extends CrudRepository<
  Reservation,
  typeof Reservation.prototype.id,
  ReservationRelations
> {
  public readonly room: BelongsToAccessor<
    Room,
    typeof Reservation.prototype.id
  >;

  public readonly renter: BelongsToAccessor<
    User,
    typeof Reservation.prototype.id
  >;

  public readonly reservationCancellation: HasOneRepositoryFactory<ReservationCancellation, typeof Reservation.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('RoomRepository')
    protected roomRepositoryGetter: Getter<RoomRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ReservationCancellationRepository') protected reservationCancellationRepositoryGetter: Getter<ReservationCancellationRepository>,
  ) {
    super(Reservation, dataSource);
    this.reservationCancellation = this.createHasOneRepositoryFactoryFor('reservationCancellation', reservationCancellationRepositoryGetter);
    this.registerInclusionResolver('reservationCancellation', this.reservationCancellation.inclusionResolver);
    this.renter = this.createBelongsToAccessorFor(
      'renter',
      userRepositoryGetter,
    );
    this.registerInclusionResolver('renter', this.renter.inclusionResolver);
    this.room = this.createBelongsToAccessorFor('room', roomRepositoryGetter);
    this.registerInclusionResolver('room', this.room.inclusionResolver);
  }
}
