import {inject, Getter} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {HouseReport, HouseReportRelations, House, User} from '../models';
import {CrudRepository} from './crud.repository.base';
import {repository, BelongsToAccessor} from '@loopback/repository';
import {HouseRepository} from './house.repository';
import {UserRepository} from './user.repository';

export class HouseReportRepository extends CrudRepository<
  HouseReport,
  typeof HouseReport.prototype.id,
  HouseReportRelations
> {

  public readonly house: BelongsToAccessor<House, typeof HouseReport.prototype.id>;

  public readonly reporter: BelongsToAccessor<User, typeof HouseReport.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('HouseRepository') protected houseRepositoryGetter: Getter<HouseRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(HouseReport, dataSource);
    this.reporter = this.createBelongsToAccessorFor('reporter', userRepositoryGetter,);
    this.registerInclusionResolver('reporter', this.reporter.inclusionResolver);
    this.house = this.createBelongsToAccessorFor('house', houseRepositoryGetter,);
    this.registerInclusionResolver('house', this.house.inclusionResolver);
  }
}
