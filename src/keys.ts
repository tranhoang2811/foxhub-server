import {UserIdentityService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';
import dotenv from 'dotenv';
import {Profile as PassportProfile} from 'passport';
import {User} from './models';
import {BcryptService} from './services/bcrypt.service';
import {JWTService} from './services/jwt.service';

dotenv.config();

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = process.env?.TOKEN_SECRET_VALUE ?? '';
  export const TOKEN_EXPIRES_IN_VALUE =
    process.env?.TOKEN_EXPIRES_IN_VALUE ?? '2d';
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.days',
  );
  export const TOKEN_SERVICE = BindingKey.create<JWTService>(
    'services.authentication.jwt.token',
  );
}

export namespace BcryptBindings {
  export const BCRYPT_SERVICE =
    BindingKey.create<BcryptService>('services.bcrypt');
  export const ROUNDS = BindingKey.create<number>('services.bcrypt.rounds');
}

export namespace UserIdentityServiceBindings {
  export const PASSPORT_USER_IDENTITY_SERVICE = BindingKey.create<
    UserIdentityService<PassportProfile, User>
  >('services.user.identity');
}
