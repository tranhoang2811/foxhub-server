import {Getter, inject} from '@loopback/core';
import {
  HasManyRepositoryFactory,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {
  AccommodationReport,
  FavoriteAccommodation,
  Reservation,
  User,
  UserCredential,
  UserIdentity,
  UserRelations, Accommodation} from '../models';
import {AccommodationReportRepository} from './accommodation-report.repository';
import {CrudRepository} from './crud.repository.base';
import {FavoriteAccommodationRepository} from './favorite-accommodation.repository';
import {ReservationRepository} from './reservation.repository';
import {UserCredentialRepository} from './user-credential.repository';
import {UserIdentityRepository} from './user-identity.repository';
import {AccommodationRepository} from './accommodation.repository';

export class UserRepository extends CrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly userCredential: HasOneRepositoryFactory<
    UserCredential,
    typeof User.prototype.id
  >;

  public readonly reservations: HasManyRepositoryFactory<
    Reservation,
    typeof User.prototype.id
  >;

  public readonly favoriteAccommodations: HasManyRepositoryFactory<
    FavoriteAccommodation,
    typeof User.prototype.id
  >;

  public readonly accommodationReports: HasManyRepositoryFactory<
    AccommodationReport,
    typeof User.prototype.id
  >;

  public readonly userIdentities: HasManyRepositoryFactory<
    UserIdentity,
    typeof User.prototype.id
  >;

  public readonly accommodations: HasManyRepositoryFactory<Accommodation, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('UserCredentialRepository')
    protected userCredentialRepositoryGetter: Getter<UserCredentialRepository>,
    @repository.getter('ReservationRepository')
    protected reservationRepositoryGetter: Getter<ReservationRepository>,
    @repository.getter('FavoriteAccommodationRepository')
    protected favoriteAccommodationRepositoryGetter: Getter<FavoriteAccommodationRepository>,
    @repository.getter('AccommodationReportRepository')
    protected accommodationReportRepositoryGetter: Getter<AccommodationReportRepository>,
    @repository.getter('UserIdentityRepository')
    protected userIdentityRepositoryGetter: Getter<UserIdentityRepository>, @repository.getter('AccommodationRepository') protected accommodationRepositoryGetter: Getter<AccommodationRepository>,
  ) {
    super(User, dataSource);
    this.accommodations = this.createHasManyRepositoryFactoryFor('accommodations', accommodationRepositoryGetter,);
    this.registerInclusionResolver('accommodations', this.accommodations.inclusionResolver);
    this.userIdentities = this.createHasManyRepositoryFactoryFor(
      'userIdentities',
      userIdentityRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userIdentities',
      this.userIdentities.inclusionResolver,
    );
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
    this.reservations = this.createHasManyRepositoryFactoryFor(
      'reservations',
      reservationRepositoryGetter,
    );
    this.registerInclusionResolver(
      'reservations',
      this.reservations.inclusionResolver,
    );
    this.userCredential = this.createHasOneRepositoryFactoryFor(
      'userCredential',
      userCredentialRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userCredential',
      this.userCredential.inclusionResolver,
    );
  }
}
