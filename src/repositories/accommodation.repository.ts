import {Getter, inject} from '@loopback/core';
import {HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {
  Accommodation,
  AccommodationRelations,
  AccommodationReport,
  FavoriteAccommodation,
  Room,
} from '../models';
import {AccommodationReportRepository} from './accommodation-report.repository';
import {CrudRepository} from './crud.repository.base';
import {FavoriteAccommodationRepository} from './favorite-accommodation.repository';
import {RoomRepository} from './room.repository';

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

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('RoomRepository')
    protected roomRepositoryGetter: Getter<RoomRepository>,
    @repository.getter('FavoriteAccommodationRepository')
    protected favoriteAccommodationRepositoryGetter: Getter<FavoriteAccommodationRepository>,
    @repository.getter('AccommodationReportRepository')
    protected accommodationReportRepositoryGetter: Getter<AccommodationReportRepository>,
  ) {
    super(Accommodation, dataSource);
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
