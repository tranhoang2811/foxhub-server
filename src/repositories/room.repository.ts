import {inject, Getter} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {Room, RoomRelations, House} from '../models';
import {CrudRepository} from './crud.repository.base';
import {repository, BelongsToAccessor} from '@loopback/repository';
import {HouseRepository} from './house.repository';

export class RoomRepository extends CrudRepository<
  Room,
  typeof Room.prototype.id,
  RoomRelations
> {

  public readonly house: BelongsToAccessor<House, typeof Room.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('HouseRepository') protected houseRepositoryGetter: Getter<HouseRepository>,
  ) {
    super(Room, dataSource);
    this.house = this.createBelongsToAccessorFor('house', houseRepositoryGetter,);
    this.registerInclusionResolver('house', this.house.inclusionResolver);
  }
}
