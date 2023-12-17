import dotenv from 'dotenv';
import path from 'path';
import {BE_BASE_URL} from '.';

dotenv.config({path: path.join(__dirname, '../../', '.env')});

const FACEBOOK_CLIENT_ID = process.env?.FACEBOOK_CLIENT_ID ?? '';
const FACEBOOK_CLIENT_SECRET = process.env?.FACEBOOK_CLIENT_SECRET ?? '';

const GOOGLE_CLIENT_ID = process.env?.GOOGLE_CLIENT_ID ?? '';
const GOOGLE_CLIENT_SECRET = process.env?.GOOGLE_CLIENT_SECRET ?? '';

export const FACEBOOK_OAUTH_OPTIONS = {
  provider: 'facebook',
  module: 'passport-facebook',
  profileFields: [
    'gender',
    'link',
    'locale',
    'name',
    'timezone',
    'verified',
    'email',
    'updated_time',
    'displayName',
    'id',
  ],
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: `${BE_BASE_URL}/auth/third-party/facebook/callback`,
  authPath: `${BE_BASE_URL}/auth/third-party/facebook`,
  callbackPath: `${BE_BASE_URL}/auth/third-party/facebook/callback`,
  successRedirect: '/auth/account',
  failureRedirect: '/login',
  scope: ['email'],
  failureFlash: true,
};

export const GOOGLE_OAUTH_OPTIONS = {
  provider: 'google',
  module: 'passport-google-oauth2',
  strategy: 'OAuth2Strategy',
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BE_BASE_URL}/auth/third-party/google/callback`,
  authPath: `${BE_BASE_URL}/auth/third-party/google`,
  callbackPath: `${BE_BASE_URL}/auth/third-party/google/callback`,
  successRedirect: '/auth/account',
  failureRedirect: '/login',
  scope: ['email', 'profile'],
  failureFlash: true,
};
