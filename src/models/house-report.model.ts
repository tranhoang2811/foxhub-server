import {model, property} from '@loopback/repository';
import {Base} from './base.model';

@model({
  settings: {
    mongodb: {
      collection: 'HouseReports',
    },
  },
})
export class HouseReport extends Base {
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

  constructor(data?: Partial<HouseReport>) {
    super(data);
  }
}

export interface HouseReportRelations {
  // describe navigational properties here
}

export type HouseReportWithRelations = HouseReport & HouseReportRelations;
