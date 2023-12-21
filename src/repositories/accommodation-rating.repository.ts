import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {
  Accommodation,
  AccommodationRating,
  AccommodationRatingRelations,
  User,
} from '../models';
import {AccommodationRepository} from './accommodation.repository';
import {CrudRepository} from './crud.repository.base';
import {UserRepository} from './user.repository';

export class AccommodationRatingRepository extends CrudRepository<
  AccommodationRating,
  typeof AccommodationRating.prototype.id,
  AccommodationRatingRelations
> {
  public readonly accommodation: BelongsToAccessor<
    Accommodation,
    typeof AccommodationRating.prototype.id
  >;

  public readonly reviewer: BelongsToAccessor<
    User,
    typeof AccommodationRating.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('AccommodationRepository')
    protected accommodationRepositoryGetter: Getter<AccommodationRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(AccommodationRating, dataSource);

    this.reviewer = this.createBelongsToAccessorFor(
      'reviewer',
      userRepositoryGetter,
    );
    this.registerInclusionResolver('reviewer', this.reviewer.inclusionResolver);
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
