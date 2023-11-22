import {model, property} from '@loopback/repository';
import {Base} from './base.model';

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

  constructor(data?: Partial<UserCredential>) {
    super(data);
  }
}

export interface UserCredentialRelations {
  // describe navigational properties here
}

export type UserCredentialWithRelations = UserCredential &
  UserCredentialRelations;
