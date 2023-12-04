import {hasMany, hasOne, model, property} from '@loopback/repository';
import {EUserRole, EUserStatus} from '../enums/user';
import {AccommodationReport} from './accommodation-report.model';
import {Base} from './base.model';
import {FavoriteAccommodation} from './favorite-accommodation.model';
import {Reservation} from './reservation.model';
import {UserCredential} from './user-credential.model';

@model({
  settings: {
    mongodb: {
      collection: 'Users',
    },
  },
})
export class User extends Base {
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
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'date',
  })
  dateOfBirth?: string;

  @property({
    type: 'string',
    required: true,
    default: EUserStatus.ACTIVE,
    jsonSchema: {
      enum: Object.values(EUserStatus),
    },
  })
  status: EUserStatus;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(EUserRole),
    },
  })
  role: EUserRole;

  @hasOne(() => UserCredential)
  userCredential: UserCredential;

  @hasMany(() => Reservation, {keyTo: 'renterId'})
  reservations: Reservation[];

  @hasMany(() => FavoriteAccommodation, {keyTo: 'renterId'})
  favoriteAccommodations: FavoriteAccommodation[];

  @hasMany(() => AccommodationReport, {keyTo: 'reporterId'})
  accommodationReports: AccommodationReport[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
