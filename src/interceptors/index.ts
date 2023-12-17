import {composeInterceptors, intercept} from '@loopback/core';

export * from './facebook.interceptor';
export * from './google.interceptor';

export function oAuth2InterceptExpressMiddleware() {
  return intercept(
    composeInterceptors(
      'passport-init-mw',
      'passport-facebook',
      'passport-google',
    ),
  );
}
