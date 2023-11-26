import {model, property, belongsTo} from '@loopback/repository';
import {Base} from './base.model';
import {User} from './user.model';

@model({
  settings: {
    mongodb: {
      collection: 'UserCredentials',
    },
  },
})
export class UserCredential extends Base {
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
  password: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<UserCredential>) {
    super(data);
  }
}

export interface UserCredentialRelations {
  // describe navigational properties here
}

export type UserCredentialWithRelations = UserCredential &
  UserCredentialRelations;
