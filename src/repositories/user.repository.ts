import {inject} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {User, UserRelations} from '../models';
import {CrudRepository} from './crud.repository.base';

export class UserRepository extends CrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(User, dataSource);
  }
}
