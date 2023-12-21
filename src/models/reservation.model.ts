import {belongsTo, model, property, hasOne} from '@loopback/repository';
import {EPaymentMethod, EReservationPaymentStatus} from '../enums/reservation';
import {Base} from './base.model';
import {Room} from './room.model';
import {User} from './user.model';
import {ReservationCancellation} from './reservation-cancellation.model';

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
    type: 'number',
    required: true,
  })
  numberOfAdult: number;

  @property({
    type: 'number',
    required: true,
  })
  numberOfChildren: number;

  @property({
    type: 'number',
    required: true,
  })
  paymentCode: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(EPaymentMethod),
    },
  })
  paymentMethod: EPaymentMethod;

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
  checkIn: Date;

  @property({
    type: 'date',
    required: true,
  })
  checkOut: Date;

  @belongsTo(() => Room)
  roomId: string;

  @belongsTo(() => User)
  renterId: string;

  @hasOne(() => ReservationCancellation)
  reservationCancellation: ReservationCancellation;

  constructor(data?: Partial<Reservation>) {
    super(data);
  }
}

export interface ReservationRelations {
  // describe navigational properties here
}

export type ReservationWithRelations = Reservation & ReservationRelations;
