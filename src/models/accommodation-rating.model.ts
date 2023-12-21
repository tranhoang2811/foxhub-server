import {model, property} from '@loopback/repository';
import {Base} from '.';

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

  constructor(data?: Partial<AccommodationRating>) {
    super(data);
  }
}

export interface AccommodationRatingRelations {
  // describe navigational properties here
}

export type AccommodationRatingWithRelations = AccommodationRating &
  AccommodationRatingRelations;
