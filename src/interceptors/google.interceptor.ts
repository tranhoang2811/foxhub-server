import {
  inject,
  Interceptor,
  InvocationContext,
  Next,
  Provider,
} from '@loopback/core';
import {
  ExpressRequestHandler,
  RequestContext,
  RestBindings,
  toInterceptor,
} from '@loopback/rest';

export class GoogleOAuthInterceptor implements Provider<Interceptor> {
  constructor(
    @inject('googleOAuthMiddleware')
    public googleOAuthMiddleware: ExpressRequestHandler,
  ) {}

  value() {
    return async (invocationContext: InvocationContext, next: Next) => {
      const requestContext = invocationContext.getSync<RequestContext>(
        RestBindings.Http.CONTEXT,
      );
      const request = requestContext.request;
      if (request.query['oauth2-provider-name'] === 'google') {
        return toInterceptor(this.googleOAuthMiddleware)(
          invocationContext,
          next,
        );
      }
      return next();
    };
  }
}
