import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors, Request} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {EUserStatus} from '../enums/user';
import {IDecodedToken} from '../interfaces/auth';
import {TokenServiceBindings} from '../keys';
import {UserWithRelations} from '../models';
import {UserRepository} from '../repositories';

export class JWTService {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SECRET)
    private jwtSecret: string,

    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    private jwtExpiresIn: string,

    @repository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async verifyToken(token: string): Promise<any> {
    if (!token) {
      throw new HttpErrors.Unauthorized('error-verifying-token-token-is-null');
    }

    let userProfile: UserProfile;

    try {
      const decodedToken = jwt.verify(token, this.jwtSecret) as JwtPayload;
      userProfile = Object.assign(
        {[securityId]: '', name: ''},
        {
          [securityId]: decodedToken.id,
          id: decodedToken.id,
          roleId: decodedToken.roleId,
        },
      );

      const user: UserWithRelations = await this.userRepository.findById(
        userProfile.id,
        {
          include: [{relation: 'userCredentials'}],
        },
      );

      if (user?.status !== EUserStatus.ACTIVE) {
        throw new HttpErrors.Unauthorized('unavailable-user');
      }
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `error-verifying-token-${(error as Error).message}`,
      );
    }
    return userProfile;
  }

  public async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized('error-generating-token-user-is-null');
    }

    let token: string;

    try {
      const expiresIn: string | number = this.jwtExpiresIn;
      token = jwt.sign(userProfile, this.jwtSecret, {
        expiresIn,
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `error-generating-token-${(error as Error).message}`,
      );
    }

    return token;
  }

  public async decodeToken(token: string): Promise<IDecodedToken> {
    const decodedToken = jwt.verify(token, this.jwtSecret) as IDecodedToken;
    return decodedToken;
  }

  public extractToken(request: Request): string {
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
    return '';
  }
}
