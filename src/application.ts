import {AuthenticationComponent} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {
  ApplicationConfig,
  Constructor,
  createBindingFromClass,
  Provider,
} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {
  ExpressRequestHandler,
  RestApplication,
  toInterceptor,
} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import passport from 'passport';
import path from 'path';
import {FACEBOOK_OAUTH_OPTIONS, GOOGLE_OAUTH_OPTIONS} from './config/oauth';
import {FacebookOAuthInterceptor, GoogleOAuthInterceptor} from './interceptors';
import {
  BcryptBindings,
  TokenServiceBindings,
  TokenServiceConstants,
  UserIdentityServiceBindings,
} from './keys';
import {FacebookOAuthMiddleware, GoogleOAuthMiddleware} from './middlewares';
import {
  FacebookPassportStrategy,
  GooglePassportStrategy,
} from './passport-strategies';
import {MySequence} from './sequence';
import {BcryptService} from './services/bcrypt.service';
import {JWTService} from './services/jwt.service';
import {PassportUserIdentityService} from './services/passport-user-identity.service';

export {ApplicationConfig};

export class FoxhubServerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Bind authentication component
    this.component(AuthenticationComponent);

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    this.setUpBindings();
  }

  setUpBindings(): void {
    this.setUpTokenServiceBindings();
    this.setUpBcryptBindings();
  }

  setUpTokenServiceBindings(): void {
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    );
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
  }

  setUpBcryptBindings(): void {
    this.bind(BcryptBindings.ROUNDS).to(10);
    this.bind(BcryptBindings.BCRYPT_SERVICE).toClass(BcryptService);
  }

  setUpPassportBindings(): void {
    this.bind('facebookOAuthOptions').to(FACEBOOK_OAUTH_OPTIONS);
    this.bind('googleOAuthOptions').to(GOOGLE_OAUTH_OPTIONS);
    // TODO: Update interface later
    passport.serializeUser(function (user: any, done) {
      done(null, user);
    });
    passport.deserializeUser(function (user: any, done) {
      done(null, user);
    });

    this.bind(
      UserIdentityServiceBindings.PASSPORT_USER_IDENTITY_SERVICE,
    ).toClass(PassportUserIdentityService);

    // *INFO: Bind passport strategies
    const passportStrategies: Record<string, Constructor<unknown>> = {
      facebookPassportStrategy: FacebookPassportStrategy,
      googlePassportStrategy: GooglePassportStrategy,
    };
    for (const key in passportStrategies) {
      this.add(createBindingFromClass(passportStrategies[key], {key}));
    }

    // *INFO: Bind oauth middleware
    const middlewares: Record<
      string,
      Constructor<Provider<ExpressRequestHandler>>
    > = {
      facebookOAuthMiddleware: FacebookOAuthMiddleware,
      googleOAuthMiddleware: GoogleOAuthMiddleware,
    };
    for (const key in middlewares) {
      this.add(createBindingFromClass(middlewares[key], {key}));
    }

    // *INFO: Bind Express style middleware interceptors
    this.bind('passport-init-mw').to(toInterceptor(passport.initialize()));
    this.bind('passport-facebook').toProvider(FacebookOAuthInterceptor);
    this.bind('passport-google').toProvider(GoogleOAuthInterceptor);
  }
}
