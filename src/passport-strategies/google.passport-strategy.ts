import {UserIdentityService} from '@loopback/authentication';
import {BindingScope, inject, injectable, Provider} from '@loopback/core';
import {Profile} from 'passport';
import {
  Strategy as GoogleStrategy,
  StrategyOptions,
} from 'passport-google-oauth2';
import {UserIdentityServiceBindings} from '../keys';
import {User} from '../models';
import {verifyFunctionFactory} from '../utils/common';

@injectable.provider({scope: BindingScope.SINGLETON})
export class GooglePassportStrategy implements Provider<GoogleStrategy> {
  strategy: GoogleStrategy;

  constructor(
    @inject('googleOAuthOptions')
    public googleOptions: StrategyOptions,

    @inject(UserIdentityServiceBindings.PASSPORT_USER_IDENTITY_SERVICE)
    public userService: UserIdentityService<Profile, User>,
  ) {
    this.strategy = new GoogleStrategy(
      this.googleOptions,
      verifyFunctionFactory(this.userService),
    );
  }

  value() {
    return this.strategy;
  }
}
