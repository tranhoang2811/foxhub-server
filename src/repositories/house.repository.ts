import {inject, Getter} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {House, HouseRelations, Room, FavoriteHouse, HouseReport} from '../models';
import {CrudRepository} from './crud.repository.base';
import {repository, HasManyRepositoryFactory} from '@loopback/repository';
import {RoomRepository} from './room.repository';
import {FavoriteHouseRepository} from './favorite-house.repository';
import {HouseReportRepository} from './house-report.repository';

export class HouseRepository extends CrudRepository<
  House,
  typeof House.prototype.id,
  HouseRelations
> {

  public readonly rooms: HasManyRepositoryFactory<Room, typeof House.prototype.id>;

  public readonly favoriteHouses: HasManyRepositoryFactory<FavoriteHouse, typeof House.prototype.id>;

  public readonly houseReports: HasManyRepositoryFactory<HouseReport, typeof House.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RoomRepository') protected roomRepositoryGetter: Getter<RoomRepository>, @repository.getter('FavoriteHouseRepository') protected favoriteHouseRepositoryGetter: Getter<FavoriteHouseRepository>, @repository.getter('HouseReportRepository') protected houseReportRepositoryGetter: Getter<HouseReportRepository>,
  ) {
    super(House, dataSource);
    this.houseReports = this.createHasManyRepositoryFactoryFor('houseReports', houseReportRepositoryGetter,);
    this.registerInclusionResolver('houseReports', this.houseReports.inclusionResolver);
    this.favoriteHouses = this.createHasManyRepositoryFactoryFor('favoriteHouses', favoriteHouseRepositoryGetter,);
    this.registerInclusionResolver('favoriteHouses', this.favoriteHouses.inclusionResolver);
    this.rooms = this.createHasManyRepositoryFactoryFor('rooms', roomRepositoryGetter,);
    this.registerInclusionResolver('rooms', this.rooms.inclusionResolver);
  }
}
