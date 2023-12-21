import {Getter, inject} from '@loopback/core';
import {HasManyRepositoryFactory, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {
  Accommodation,
  AccommodationRelations,
  AccommodationReport,
  FavoriteAccommodation,
  Room, User} from '../models';
import {AccommodationReportRepository} from './accommodation-report.repository';
import {CrudRepository} from './crud.repository.base';
import {FavoriteAccommodationRepository} from './favorite-accommodation.repository';
import {RoomRepository} from './room.repository';
import {UserRepository} from './user.repository';

export class AccommodationRepository extends CrudRepository<
  Accommodation,
  typeof Accommodation.prototype.id,
  AccommodationRelations
> {
  public readonly rooms: HasManyRepositoryFactory<
    Room,
    typeof Accommodation.prototype.id
  >;

  public readonly favoriteAccommodations: HasManyRepositoryFactory<
    FavoriteAccommodation,
    typeof Accommodation.prototype.id
  >;

  public readonly accommodationReports: HasManyRepositoryFactory<
    AccommodationReport,
    typeof Accommodation.prototype.id
  >;

  public readonly owner: BelongsToAccessor<User, typeof Accommodation.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('RoomRepository')
    protected roomRepositoryGetter: Getter<RoomRepository>,
    @repository.getter('FavoriteAccommodationRepository')
    protected favoriteAccommodationRepositoryGetter: Getter<FavoriteAccommodationRepository>,
    @repository.getter('AccommodationReportRepository')
    protected accommodationReportRepositoryGetter: Getter<AccommodationReportRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Accommodation, dataSource);
    this.owner = this.createBelongsToAccessorFor('owner', userRepositoryGetter,);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
    this.accommodationReports = this.createHasManyRepositoryFactoryFor(
      'accommodationReports',
      accommodationReportRepositoryGetter,
    );
    this.registerInclusionResolver(
      'accommodationReports',
      this.accommodationReports.inclusionResolver,
    );
    this.favoriteAccommodations = this.createHasManyRepositoryFactoryFor(
      'favoriteAccommodations',
      favoriteAccommodationRepositoryGetter,
    );
    this.registerInclusionResolver(
      'favoriteAccommodations',
      this.favoriteAccommodations.inclusionResolver,
    );
    this.rooms = this.createHasManyRepositoryFactoryFor(
      'rooms',
      roomRepositoryGetter,
    );
    this.registerInclusionResolver('rooms', this.rooms.inclusionResolver);
  }
}
