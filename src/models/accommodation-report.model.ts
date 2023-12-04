import {model, property, belongsTo} from '@loopback/repository';
import {Base} from './base.model';
import {Accommodation} from './accommodation.model';
import {User} from './user.model';

@model({
  settings: {
    mongodb: {
      collection: 'AccommodationReports',
    },
  },
})
export class AccommodationReport extends Base {
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
  reason: string;

  @belongsTo(() => Accommodation)
  accommodationId: string;

  @belongsTo(() => User)
  reporterId: string;

  constructor(data?: Partial<AccommodationReport>) {
    super(data);
  }
}

export interface AccommodationReportRelations {
  // describe navigational properties here
}

export type AccommodationReportWithRelations = AccommodationReport &
  AccommodationReportRelations;
