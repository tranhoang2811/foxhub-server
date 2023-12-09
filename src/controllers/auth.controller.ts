import {service} from '@loopback/core';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {LoginCredentialsDto} from '../dtos/auth/requests/login.request';
import {User} from '../models';
import {AuthService} from '../services/auth.service';

export class AuthController {
  constructor(
    @service(AuthService)
    private authService: AuthService,
  ) {}

  @post('/auth/login')
  @response(200, {})
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
  @response(200, {})
  async signup(
    @requestBody({
      content: {
        'application/json': {},
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<void> {
    await this.authService.signup(user);
  }
}
