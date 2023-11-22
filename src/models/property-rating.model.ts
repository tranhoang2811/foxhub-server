import {model, property} from '@loopback/repository';
import {Base} from './base.model';

@model({
  settings: {
    mongodb: {
      collection: 'PropertyRatings',
    },
  },
})
export class PropertyRating extends Base {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  rate: number;

  @property({
    type: 'string',
  })
  review?: string;

  constructor(data?: Partial<PropertyRating>) {
    super(data);
  }
}

export interface PropertyRatingRelations {
  // describe navigational properties here
}

export type PropertyRatingWithRelations = PropertyRating &
  PropertyRatingRelations;
