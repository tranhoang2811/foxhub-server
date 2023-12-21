import {belongsTo, model, property} from '@loopback/repository';
import {Base} from './base.model';
import {Reservation} from './reservation.model';

@model({
  settings: {
    mongodb: {
      collection: 'ReservationCancellations',
    },
  },
})
export class ReservationCancellation extends Base {
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

  @belongsTo(() => Reservation)
  reservationId: string;

  constructor(data?: Partial<ReservationCancellation>) {
    super(data);
  }
}

export interface ReservationCancellationRelations {
  // describe navigational properties here
}

export type ReservationCancellationWithRelations = ReservationCancellation &
  ReservationCancellationRelations;
