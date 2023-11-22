import {model, property} from '@loopback/repository';
import {EHouseStatus} from '../enums/house';
import {Base} from './base.model';

@model({
  settings: {
    mongodb: {
      collection: 'Houses',
    },
  },
})
export class House extends Base {
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
  address: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
    default: EHouseStatus.PENDING,
    jsonSchema: {
      enum: Object.values(EHouseStatus),
    },
  })
  status: EHouseStatus;

  constructor(data?: Partial<House>) {
    super(data);
  }
}

export interface HouseRelations {
  // describe navigational properties here
}

export type HouseWithRelations = House & HouseRelations;
