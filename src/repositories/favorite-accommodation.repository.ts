import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {
  Accommodation,
  FavoriteAccommodation,
  FavoriteAccommodationRelations,
  User,
} from '../models';
import {AccommodationRepository} from './accommodation.repository';
import {CrudRepository} from './crud.repository.base';
import {UserRepository} from './user.repository';

export class FavoriteAccommodationRepository extends CrudRepository<
  FavoriteAccommodation,
  typeof FavoriteAccommodation.prototype.id,
  FavoriteAccommodationRelations
> {
  public readonly accommodation: BelongsToAccessor<
    Accommodation,
    typeof FavoriteAccommodation.prototype.id
  >;

  public readonly renter: BelongsToAccessor<
    User,
    typeof FavoriteAccommodation.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('AccommodationRepository')
    protected accommodationRepositoryGetter: Getter<AccommodationRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(FavoriteAccommodation, dataSource);
    this.renter = this.createBelongsToAccessorFor(
      'renter',
      userRepositoryGetter,
    );
    this.registerInclusionResolver('renter', this.renter.inclusionResolver);
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
