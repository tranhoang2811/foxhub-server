import {inject} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {Room, RoomRelations} from '../models';
import {CrudRepository} from './crud.repository.base';

export class RoomRepository extends CrudRepository<
  Room,
  typeof Room.prototype.id,
  RoomRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Room, dataSource);
  }
}
