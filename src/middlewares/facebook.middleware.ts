import {BindingScope, inject, injectable, Provider} from '@loopback/core';
import {ExpressRequestHandler} from '@loopback/rest';
import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

@injectable.provider({scope: BindingScope.SINGLETON})
export class FacebookOAuthMiddleware
  implements Provider<ExpressRequestHandler>
{
  constructor(
    @inject('facebookPassportStrategy')
    public facebookPassportStrategy: FacebookStrategy,
  ) {
    passport.use(this.facebookPassportStrategy);
  }

  value() {
    return passport.authenticate('facebook');
  }
}
