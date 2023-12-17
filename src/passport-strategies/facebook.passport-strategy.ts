import {UserIdentityService} from '@loopback/authentication';
import {BindingScope, inject, injectable, Provider} from '@loopback/core';
import {Profile} from 'passport';
import {Strategy as FacebookStrategy, StrategyOptions} from 'passport-facebook';
import {UserIdentityServiceBindings} from '../keys';
import {User} from '../models';
import {verifyFunctionFactory} from '../utils/common';

@injectable.provider({scope: BindingScope.SINGLETON})
export class FacebookPassportStrategy implements Provider<FacebookStrategy> {
  strategy: FacebookStrategy;

  constructor(
    @inject('facebookOAuthOptions')
    public facebookOptions: StrategyOptions,

    @inject(UserIdentityServiceBindings.PASSPORT_USER_IDENTITY_SERVICE)
    public userService: UserIdentityService<Profile, User>,
  ) {
    this.strategy = new FacebookStrategy(
      this.facebookOptions,
      verifyFunctionFactory(this.userService),
    );
  }

  value() {
    return this.strategy;
  }
}
