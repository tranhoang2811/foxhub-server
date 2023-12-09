import {AuthenticationStrategy} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {TokenServiceBindings} from '../keys';
import {JWTService} from '../services/jwt.service';

export class JWTAuthenticationStrategy implements AuthenticationStrategy {
  name = 'jwt';

  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public tokenService: JWTService,
  ) {}

  public async authenticate(request: Request): Promise<UserProfile> {
    const token: string = this.extractCredentials(request);
    const userProfile: UserProfile = await this.tokenService.verifyToken(token);
    return userProfile;
  }

  private extractCredentials(request: Request): string {
    const authHeaderValue = request.headers.authorization;

    if (!authHeaderValue) {
      throw new HttpErrors.Unauthorized('authorization-header-not-found');
    }

    const parts = authHeaderValue.split(' ');
    if (parts.length !== 2) {
      throw new HttpErrors.Unauthorized(
        'authorization-header-value-must-follow-the-pattern-bearer-xx-yy-zz-where-xx-yy-zz-is-a-valid-jwt-token',
      );
    }

    const token = parts[1];
    return token;
  }
}
