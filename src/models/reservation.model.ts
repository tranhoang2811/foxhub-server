import {model, property, belongsTo} from '@loopback/repository';
import {EReservationPaymentStatus} from '../enums/reservation';
import {Base} from './base.model';
import {Room} from './room.model';
import {User} from './user.model';

@model({
  settings: {
    mongodb: {
      collection: 'Reservations',
    },
  },
})
export class Reservation extends Base {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  cancellationReason?: string;

  @property({
    type: 'string',
    required: true,
  })
  paymentCode: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(EReservationPaymentStatus),
    },
  })
  status: EReservationPaymentStatus;

  @property({
    type: 'date',
    required: true,
  })
  checkIn: string;

  @property({
    type: 'date',
    required: true,
  })
  checkOut: string;

  @belongsTo(() => Room)
  roomId: string;

  @belongsTo(() => User)
  renterId: string;

  constructor(data?: Partial<Reservation>) {
    super(data);
  }
}

export interface ReservationRelations {
  // describe navigational properties here
}

export type ReservationWithRelations = Reservation & ReservationRelations;
