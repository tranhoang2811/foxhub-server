import {model, property, belongsTo} from '@loopback/repository';
import {Base} from './base.model';
import {Accommodation} from './accommodation.model';

@model({
  settings: {
    mongodb: {
      collection: 'Medias',
    },
  },
})
export class Media extends Base {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  source: string;

  @belongsTo(() => Accommodation)
  accommodationId: string;

  constructor(data?: Partial<Media>) {
    super(data);
  }
}

export interface MediaRelations {
  // describe navigational properties here
}

export type MediaWithRelations = Media & MediaRelations;
