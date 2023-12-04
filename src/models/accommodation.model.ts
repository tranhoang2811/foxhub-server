import {hasMany, model, property} from '@loopback/repository';
import {EAccommodationStatus} from '../enums/accommodation';
import {AccommodationReport} from './accommodation-report.model';
import {Base} from './base.model';
import {FavoriteAccommodation} from './favorite-accommodation.model';
import {Room} from './room.model';

@model({
  settings: {
    mongodb: {
      collection: 'Accommodations',
    },
  },
})
export class Accommodation extends Base {
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
    default: EAccommodationStatus.PENDING,
    jsonSchema: {
      enum: Object.values(EAccommodationStatus),
    },
  })
  status: EAccommodationStatus;

  @hasMany(() => Room)
  rooms: Room[];

  @hasMany(() => FavoriteAccommodation)
  favoriteAccommodations: FavoriteAccommodation[];

  @hasMany(() => AccommodationReport)
  accommodationReports: AccommodationReport[];

  constructor(data?: Partial<Accommodation>) {
    super(data);
  }
}

export interface AccommodationRelations {
  // describe navigational properties here
}

export type AccommodationWithRelations = Accommodation & AccommodationRelations;
