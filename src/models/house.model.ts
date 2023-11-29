import {model, property, hasMany} from '@loopback/repository';
import {EHouseStatus} from '../enums/house';
import {Base} from './base.model';
import {Room} from './room.model';
import {FavoriteHouse} from './favorite-house.model';
import {HouseReport} from './house-report.model';

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

  @hasMany(() => Room)
  rooms: Room[];

  @hasMany(() => FavoriteHouse)
  favoriteHouses: FavoriteHouse[];

  @hasMany(() => HouseReport)
  houseReports: HouseReport[];

  constructor(data?: Partial<House>) {
    super(data);
  }
}

export interface HouseRelations {
  // describe navigational properties here
}

export type HouseWithRelations = House & HouseRelations;
