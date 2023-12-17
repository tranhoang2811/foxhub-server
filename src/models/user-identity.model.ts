import {model, property, belongsTo} from '@loopback/repository';
import {Base} from './base.model';
import {User} from './user.model';

@model({
  settings: {
    mongodb: {
      collection: 'UserIdentities',
    },
  },
})
export class UserIdentity extends Base {
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
  provider: string;

  @property({
    type: 'object',
    required: true,
  })
  profile: object;

  @property({
    type: 'string',
    required: true,
  })
  authScheme: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<UserIdentity>) {
    super(data);
  }
}

export interface UserIdentityRelations {
  // describe navigational properties here
}

export type UserIdentityWithRelations = UserIdentity & UserIdentityRelations;
