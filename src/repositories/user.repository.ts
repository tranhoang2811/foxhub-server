import {inject, Getter} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {User, UserRelations, UserCredential, Reservation, FavoriteHouse, HouseReport} from '../models';
import {CrudRepository} from './crud.repository.base';
import {repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {UserCredentialRepository} from './user-credential.repository';
import {ReservationRepository} from './reservation.repository';
import {FavoriteHouseRepository} from './favorite-house.repository';
import {HouseReportRepository} from './house-report.repository';

export class UserRepository extends CrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly userCredential: HasOneRepositoryFactory<UserCredential, typeof User.prototype.id>;

  public readonly reservations: HasManyRepositoryFactory<Reservation, typeof User.prototype.id>;

  public readonly favoriteHouses: HasManyRepositoryFactory<FavoriteHouse, typeof User.prototype.id>;

  public readonly houseReports: HasManyRepositoryFactory<HouseReport, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UserCredentialRepository') protected userCredentialRepositoryGetter: Getter<UserCredentialRepository>, @repository.getter('ReservationRepository') protected reservationRepositoryGetter: Getter<ReservationRepository>, @repository.getter('FavoriteHouseRepository') protected favoriteHouseRepositoryGetter: Getter<FavoriteHouseRepository>, @repository.getter('HouseReportRepository') protected houseReportRepositoryGetter: Getter<HouseReportRepository>,
  ) {
    super(User, dataSource);
    this.houseReports = this.createHasManyRepositoryFactoryFor('houseReports', houseReportRepositoryGetter,);
    this.registerInclusionResolver('houseReports', this.houseReports.inclusionResolver);
    this.favoriteHouses = this.createHasManyRepositoryFactoryFor('favoriteHouses', favoriteHouseRepositoryGetter,);
    this.registerInclusionResolver('favoriteHouses', this.favoriteHouses.inclusionResolver);
    this.reservations = this.createHasManyRepositoryFactoryFor('reservations', reservationRepositoryGetter,);
    this.registerInclusionResolver('reservations', this.reservations.inclusionResolver);
    this.userCredential = this.createHasOneRepositoryFactoryFor('userCredential', userCredentialRepositoryGetter);
    this.registerInclusionResolver('userCredential', this.userCredential.inclusionResolver);
  }
}
