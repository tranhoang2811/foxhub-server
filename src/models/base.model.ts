import {Entity, property} from '@loopback/repository';

export class Base extends Entity {
  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: Date;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  updatedAt?: Date;

  constructor(data?: Partial<Base>) {
    super(data);
  }
}

export interface BaseRelations {
  // describe navigational properties here
}

export type BaseWithRelations = Base & BaseRelations;
