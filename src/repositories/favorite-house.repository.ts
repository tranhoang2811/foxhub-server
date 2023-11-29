import {inject, Getter} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {FavoriteHouse, FavoriteHouseRelations, House, User} from '../models';
import {CrudRepository} from './crud.repository.base';
import {repository, BelongsToAccessor} from '@loopback/repository';
import {HouseRepository} from './house.repository';
import {UserRepository} from './user.repository';

export class FavoriteHouseRepository extends CrudRepository<
  FavoriteHouse,
  typeof FavoriteHouse.prototype.id,
  FavoriteHouseRelations
> {

  public readonly house: BelongsToAccessor<House, typeof FavoriteHouse.prototype.id>;

  public readonly renter: BelongsToAccessor<User, typeof FavoriteHouse.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('HouseRepository') protected houseRepositoryGetter: Getter<HouseRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(FavoriteHouse, dataSource);
    this.renter = this.createBelongsToAccessorFor('renter', userRepositoryGetter,);
    this.registerInclusionResolver('renter', this.renter.inclusionResolver);
    this.house = this.createBelongsToAccessorFor('house', houseRepositoryGetter,);
    this.registerInclusionResolver('house', this.house.inclusionResolver);
  }
}
