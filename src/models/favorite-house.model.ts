import {model, property, belongsTo} from '@loopback/repository';
import {Base} from './base.model';
import {House} from './house.model';
import {User} from './user.model';

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

  @belongsTo(() => House)
  houseId: string;

  @belongsTo(() => User)
  renterId: string;

  constructor(data?: Partial<FavoriteHouse>) {
    super(data);
  }
}

export interface FavoriteHouseRelations {
  // describe navigational properties here
}

export type FavoriteHouseWithRelations = FavoriteHouse & FavoriteHouseRelations;
