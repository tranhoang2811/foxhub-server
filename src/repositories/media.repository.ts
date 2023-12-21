import {inject, Getter} from '@loopback/core';
import {MongodbDataSource} from '../datasources';
import {Media, MediaRelations, Accommodation} from '../models';
import {CrudRepository} from './crud.repository.base';
import {repository, BelongsToAccessor} from '@loopback/repository';
import {AccommodationRepository} from './accommodation.repository';

export class MediaRepository extends CrudRepository<
  Media,
  typeof Media.prototype.id,
  MediaRelations
> {

  public readonly accommodation: BelongsToAccessor<Accommodation, typeof Media.prototype.id>;

  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AccommodationRepository') protected accommodationRepositoryGetter: Getter<AccommodationRepository>,) {
    super(Media, dataSource);
    this.accommodation = this.createBelongsToAccessorFor('accommodation', accommodationRepositoryGetter,);
    this.registerInclusionResolver('accommodation', this.accommodation.inclusionResolver);
  }
}
