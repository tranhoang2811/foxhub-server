import {belongsTo, model, property} from '@loopback/repository';
import {Accommodation} from './accommodation.model';
import {Base} from './base.model';
import {User} from './user.model';

@model({
  settings: {
    mongodb: {
      collection: 'AccommodationRatings',
    },
  },
})
export class AccommodationRating extends Base {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  rate: number;

  @property({
    type: 'string',
  })
  review?: string;

  @belongsTo(() => Accommodation)
  accommodationId: string;

  @belongsTo(() => User)
  reviewerId: string;

  constructor(data?: Partial<AccommodationRating>) {
    super(data);
  }
}

export interface AccommodationRatingRelations {
  // describe navigational properties here
}

export type AccommodationRatingWithRelations = AccommodationRating &
  AccommodationRatingRelations;
