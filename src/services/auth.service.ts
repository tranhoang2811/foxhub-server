import {BindingScope, inject, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {INVALID_CREDENTIALS_ERROR} from '../constants/auth';
import {LoginCredentialsDto} from '../dtos/auth/requests/login.request';
import {BcryptBindings, TokenServiceBindings} from '../keys';
import {User, UserWithRelations} from '../models';
import {UserRepository} from '../repositories';
import {BcryptService} from './bcrypt.service';
import {JWTService} from './jwt.service';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,

    @inject(BcryptBindings.BCRYPT_SERVICE)
    private bcryptService: BcryptService,

    @inject(TokenServiceBindings.TOKEN_SERVICE)
    private jwtService: JWTService,
  ) {}

  public async login(credentials: LoginCredentialsDto): Promise<string> {
    const user: User = await this.verifyCredentials(credentials);
    const userProfile: UserProfile = this.convertToUserProfile(user);
    const token: string = await this.jwtService.generateToken(userProfile);
    return token;
  }

  public async signup(user: Omit<User, 'id'>): Promise<void> {}

  private async verifyCredentials(
    credentials: LoginCredentialsDto,
  ): Promise<User> {
    const foundUser: UserWithRelations | null =
      await this.userRepository.findOne({
        where: {email: credentials.email},
        include: [{relation: 'userCredential'}],
      });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(INVALID_CREDENTIALS_ERROR);
    }

    if (!foundUser.userCredential) {
      throw new HttpErrors.Unauthorized(INVALID_CREDENTIALS_ERROR);
    }

    const isPasswordMatched: boolean = await this.bcryptService.comparePassword(
      credentials.password,
      foundUser.userCredential.password,
    );

    if (!isPasswordMatched) {
      throw new HttpErrors.Unauthorized(INVALID_CREDENTIALS_ERROR);
    }

    return foundUser;
  }

  private convertToUserProfile(user: User): UserProfile {
    const userProfile: UserProfile = {
      [securityId]: user.id,
      id: user.id,
      role: user.role,
    };

    return userProfile;
  }
}
