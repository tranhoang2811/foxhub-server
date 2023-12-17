import {BindingScope, inject, injectable, Provider} from '@loopback/core';
import {ExpressRequestHandler} from '@loopback/rest';
import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth2';

@injectable.provider({scope: BindingScope.SINGLETON})
export class GoogleOAuthMiddleware implements Provider<ExpressRequestHandler> {
  constructor(
    @inject('googlePassportStrategy')
    public googlePassportStrategy: GoogleStrategy,
  ) {
    passport.use(this.googlePassportStrategy);
  }

  value() {
    return passport.authenticate('google');
  }
}
