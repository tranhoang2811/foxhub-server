import {inject, Getter} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {UserCredential, UserCredentialRelations, User} from '../models';
import {CrudRepository} from './crud.repository.base';
import {repository, BelongsToAccessor} from '@loopback/repository';
import {UserRepository} from './user.repository';

export class UserCredentialRepository extends CrudRepository<
  UserCredential,
  typeof UserCredential.prototype.id,
  UserCredentialRelations
> {

  public readonly user: BelongsToAccessor<User, typeof UserCredential.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(UserCredential, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
