import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Accommodation, Room, RoomRelations} from '../models';
import {AccommodationRepository} from './accommodation.repository';
import {CrudRepository} from './crud.repository.base';

export class RoomRepository extends CrudRepository<
  Room,
  typeof Room.prototype.id,
  RoomRelations
> {
  public readonly accommodation: BelongsToAccessor<
    Accommodation,
    typeof Room.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('AccommodationRepository')
    protected accommodationRepositoryGetter: Getter<AccommodationRepository>,
  ) {
    super(Room, dataSource);
    this.accommodation = this.createBelongsToAccessorFor(
      'accommodation',
      accommodationRepositoryGetter,
    );
    this.registerInclusionResolver(
      'accommodation',
      this.accommodation.inclusionResolver,
    );
  }
}
