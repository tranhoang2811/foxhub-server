import {model, property, belongsTo} from '@loopback/repository';
import {Base} from './base.model';
import {Accommodation} from './accommodation.model';
import {User} from './user.model';

@model({
  settings: {
    mongodb: {
      collection: 'FavoriteAccommodations',
    },
  },
})
export class FavoriteAccommodation extends Base {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @belongsTo(() => Accommodation)
  accommodationId: string;

  @belongsTo(() => User)
  renterId: string;

  constructor(data?: Partial<FavoriteAccommodation>) {
    super(data);
  }
}

export interface FavoriteAccommodationRelations {
  // describe navigational properties here
}

export type FavoriteAccommodationWithRelations = FavoriteAccommodation &
  FavoriteAccommodationRelations;
