import {belongsTo, hasMany, model, property} from '@loopback/repository';
import {EAccommodationStatus, EAccommodationType} from '../enums/accommodation';
import {AccommodationRating} from './accommodation-rating.model';
import {AccommodationReport} from './accommodation-report.model';
import {Base} from './base.model';
import {FavoriteAccommodation} from './favorite-accommodation.model';
import {Media} from './media.model';
import {Room} from './room.model';
import {User} from './user.model';

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
    type: 'number',
    required: true,
  })
  latitude: number;

  @property({
    type: 'number',
    required: true,
  })
  longitude: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

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

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(EAccommodationType),
    },
  })
  type: EAccommodationType;

  @property({
    type: 'array',
    itemType: 'string',
  })
  properties?: string[];

  @belongsTo(() => User)
  ownerId: string;

  @hasMany(() => Room)
  rooms: Room[];

  @hasMany(() => FavoriteAccommodation)
  favoriteAccommodations: FavoriteAccommodation[];

  @hasMany(() => AccommodationReport)
  accommodationReports: AccommodationReport[];

  @hasMany(() => AccommodationRating)
  accommodationRatings: AccommodationRating[];

  @hasMany(() => Media)
  media: Media[];

  constructor(data?: Partial<Accommodation>) {
    super(data);
  }
}

export interface AccommodationRelations {
  // describe navigational properties here
}

export type AccommodationWithRelations = Accommodation & AccommodationRelations;
