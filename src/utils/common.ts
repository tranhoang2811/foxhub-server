import {UserIdentityService} from '@loopback/authentication';
import {Profile} from 'passport';
import {User} from '../models';

export function checkValidArray<T>(array?: T[]): boolean {
  return array ? Array.isArray(array) && array.length > 0 : false;
}

export function getValidArray<T>(array?: T[]): T[] {
  return checkValidArray<T>(array) ? array ?? [] : [];
}

export function verifyFunctionFactory(
  userIdentityService: UserIdentityService<Profile, User>,
) {
  return function (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    userIdentityService
      .findOrCreateUser(profile)
      .then(user => done(null, user))
      .catch(error => done(error));
  };
}
