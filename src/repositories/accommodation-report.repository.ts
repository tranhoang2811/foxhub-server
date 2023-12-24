import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {
  Accommodation,
  AccommodationReport,
  AccommodationReportRelations,
  User,
} from '../models';
import {AccommodationRepository} from './accommodation.repository';
import {CrudRepository} from './crud.repository.base';
import {UserRepository} from './user.repository';

export class AccommodationReportRepository extends CrudRepository<
  AccommodationReport,
  typeof AccommodationReport.prototype.id,
  AccommodationReportRelations
> {
  public readonly accommodation: BelongsToAccessor<
    Accommodation,
    typeof AccommodationReport.prototype.id
  >;

  public readonly reporter: BelongsToAccessor<
    User,
    typeof AccommodationReport.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('AccommodationRepository')
    protected accommodationRepositoryGetter: Getter<AccommodationRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(AccommodationReport, dataSource);
    this.reporter = this.createBelongsToAccessorFor(
      'reporter',
      userRepositoryGetter,
    );
    this.registerInclusionResolver('reporter', this.reporter.inclusionResolver);
    this.accommodation = this.createBelongsToAccessorFor(
      'accommodation',
      accommodationRepositoryGetter,
    );
    this.registerInclusionResolver(
      'accommodation',
      this.accommodation.inclusionResolver,
    );
  }
}
