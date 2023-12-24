import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DataObject,
  Filter,
  Options,
  repository,
} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {User, UserIdentity, UserIdentityRelations} from '../models';
import {CrudRepository} from './crud.repository.base';
import {UserRepository} from './user.repository';

export class UserIdentityRepository extends CrudRepository<
  UserIdentity,
  typeof UserIdentity.prototype.id,
  UserIdentityRelations
> {
  public readonly user: BelongsToAccessor<
    User,
    typeof UserIdentity.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(UserIdentity, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }

  async upsert(
    entity: DataObject<UserIdentity>,
    filter: Filter<UserIdentity>,
    options?: Options,
  ): Promise<UserIdentity | void> {
    const existingUserIdentity: UserIdentity | null = await this.findOne(
      filter,
      options,
    );
    entity.updatedAt = new Date();

    if (existingUserIdentity) {
      return this.updateById(existingUserIdentity.id, entity, options);
    }
    entity.createdAt = new Date();
    return this.create(entity, options);
  }
}
