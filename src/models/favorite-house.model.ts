import {model, property} from '@loopback/repository';
import {Base} from './base.model';

@model({
  settings: {
    mongodb: {
      collection: 'FavoriteHouses',
    },
  },
})
export class FavoriteHouse extends Base {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  constructor(data?: Partial<FavoriteHouse>) {
    super(data);
  }
}

export interface FavoriteHouseRelations {
  // describe navigational properties here
}

export type FavoriteHouseWithRelations = FavoriteHouse & FavoriteHouseRelations;
