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

export class FacebookOAuthInterceptor implements Provider<Interceptor> {
  constructor(
    @inject('facebookOAuthMiddleware')
    public facebookOAuthMiddleware: ExpressRequestHandler,
  ) {}

  value() {
    return async (invocationContext: InvocationContext, next: Next) => {
      const requestContext = invocationContext.getSync<RequestContext>(
        RestBindings.Http.CONTEXT,
      );
      const request = requestContext.request;
      if (request.query['oauth2-provider-name'] === 'facebook') {
        return toInterceptor(this.facebookOAuthMiddleware)(
          invocationContext,
          next,
        );
      }
      return next();
    };
  }
}
