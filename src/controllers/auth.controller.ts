import {AuthenticationBindings, authenticate} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import {
  RequestWithSession,
  Response,
  RestBindings,
  get,
  getModelSchemaRef,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {SecurityBindings, UserProfile, securityId} from '@loopback/security';
import omit from 'lodash/omit';
import {BE_BASE_URL} from '../config';
import {LoginCredentialsDto} from '../dtos/auth/requests/login.request';
import {SignupInformationDto} from '../dtos/auth/requests/signup.request';
import {oAuth2InterceptExpressMiddleware} from '../interceptors';
import {TokenServiceBindings} from '../keys';
import {User} from '../models';
import {AuthService} from '../services/auth.service';
import {JWTService} from '../services/jwt.service';

export class AuthController {
  constructor(
    @service(AuthService)
    private authService: AuthService,

    @inject(TokenServiceBindings.TOKEN_SERVICE)
    private jwtService: JWTService,
  ) {}

  @post('/auth/login')
  @response(200)
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LoginCredentialsDto),
        },
      },
    })
    credentials: LoginCredentialsDto,
  ): Promise<string> {
    return this.authService.login(credentials);
  }

  @post('/auth/signup')
  @response(204)
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SignupInformationDto),
        },
      },
    })
    signupInformationDto: SignupInformationDto,
  ): Promise<void> {
    await this.authService.signup(signupInformationDto);
  }

  @get('/auth/third-party/{provider}')
  loginToThirdParty(
    @inject(AuthenticationBindings.AUTHENTICATION_REDIRECT_URL)
    redirectUrl: string,
    @inject(AuthenticationBindings.AUTHENTICATION_REDIRECT_STATUS)
    status: number,
    @inject(RestBindings.Http.RESPONSE)
    response: Response,
  ) {
    response.statusCode = status || 302;
    response.setHeader('Location', redirectUrl);
    response.end();
    return response;
  }

  @oAuth2InterceptExpressMiddleware()
  @get('/auth/third-party/{provider}/callback')
  async thirdPartyCallBack(
    @inject(SecurityBindings.USER) user: UserProfile,
    @inject(RestBindings.Http.REQUEST) request: RequestWithSession,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const currentUser: User = {
      ...omit(user, 'profile'),
      ...user?.profile,
    };
    const userProfile: UserProfile =
      this.authService.convertToUserProfile(currentUser);
    const token: string = await this.jwtService.generateToken(userProfile);
    request.session.user = user;

    return response.redirect(
      `${BE_BASE_URL}/social-authentication-loading?token=${token}`,
    );
  }

  @authenticate('jwt')
  @get('/auth/profile')
  async getProfile(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<User> {
    const userId: string = currentUserProfile[securityId];
    return this.authService.getUserProfile(userId);
  }
}
