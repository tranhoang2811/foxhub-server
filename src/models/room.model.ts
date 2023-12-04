import {belongsTo, model, property} from '@loopback/repository';
import {ERoomStatus} from '../enums/room';
import {Accommodation} from './accommodation.model';
import {Base} from './base.model';

@model({
  settings: {
    mongodb: {
      collection: 'Rooms',
    },
  },
})
export class Room extends Base {
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
  code: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(ERoomStatus),
    },
  })
  status: ERoomStatus;

  @property({
    type: 'date',
    required: true,
  })
  availableFrom: Date;

  @property({
    type: 'date',
    required: true,
  })
  availableTo: Date;

  @property({
    type: 'number',
    required: true,
  })
  availablePeople: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @belongsTo(() => Accommodation)
  accommodationId: string;

  constructor(data?: Partial<Room>) {
    super(data);
  }
}

export interface RoomRelations {
  // describe navigational properties here
}

export type RoomWithRelations = Room & RoomRelations;
