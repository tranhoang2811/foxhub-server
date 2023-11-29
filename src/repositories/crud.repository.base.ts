import {
  Count,
  DataObject,
  DefaultCrudRepository,
  Entity,
  juggler,
  Where,
} from '@loopback/repository';
import {Options} from 'loopback-datasource-juggler';
import {Base} from '../models/base.model';

export abstract class CrudRepository<
  T extends Base,
  ID,
  Relations extends object = {},
> extends DefaultCrudRepository<T, ID, Relations> {
  constructor(
    entityClass: typeof Entity & {
      prototype: T;
    },
    dataSource: juggler.DataSource,
  ) {
    super(entityClass, dataSource);
  }

  update(entity: T, options?: Options): Promise<void> {
    entity.updatedAt = new Date();
    return super.update(entity, options);
  }

  updateAll(
    data: DataObject<T>,
    where?: Where<T>,
    options?: Options,
  ): Promise<Count> {
    data.updatedAt = new Date();
    return super.updateAll(data, where, options);
  }

  updateById(id: ID, data: DataObject<T>, options?: Options): Promise<void> {
    data.updatedAt = new Date();
    return super.updateById(id, data, options);
  }

  replaceById(id: ID, data: DataObject<T>, options?: Options): Promise<void> {
    data.updatedAt = new Date();
    return super.replaceById(id, data, options);
  }

  updateAllOriginal(
    data: DataObject<T>,
    where?: Where<T>,
    options?: Options,
  ): Promise<Count> {
    data.updatedAt = new Date();
    return super.updateAll(data, where, options);
  }
}
