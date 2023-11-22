import {inject} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {UserCredential, UserCredentialRelations} from '../models';
import {CrudRepository} from './crud.repository.base';

export class UserCredentialRepository extends CrudRepository<
  UserCredential,
  typeof UserCredential.prototype.id,
  UserCredentialRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(UserCredential, dataSource);
  }
}
