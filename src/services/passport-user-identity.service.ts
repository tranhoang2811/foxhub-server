import {UserIdentityService} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {Profile as PassportProfile} from 'passport';
import {EUserRole} from '../enums/user';
import {User} from '../models';
import {UserIdentityRepository, UserRepository} from '../repositories';

export class PassportUserIdentityService
  implements UserIdentityService<PassportProfile, User>
{
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,

    @repository(UserIdentityRepository)
    private userIdentityRepository: UserIdentityRepository,
  ) {}

  public async findOrCreateUser(profile: PassportProfile): Promise<User> {
    if (!profile?.emails?.length) {
      throw new Error('email-id-is-required-in-returned-profile-to-login');
    }
    const email = profile.emails[0].value;
    const user: User | null = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    let userId: string;

    if (!user) {
      const createdUser: User = await this.userRepository.create({
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        email,
        role: EUserRole.RENTER,
      });
      userId = createdUser.id;
    } else {
      userId = user.id;
    }
    return this.linkExternalProfile(userId, profile);
  }

  public async linkExternalProfile(
    userId: string,
    passportProfile: PassportProfile,
  ): Promise<User> {
    await this.userIdentityRepository.upsert(
      {
        provider: passportProfile.provider,
        authScheme: passportProfile.provider,
        userId,
        profile: {
          emails: passportProfile.emails,
        },
      },
      {
        where: {
          id: passportProfile.id,
        },
      },
    );

    return this.userRepository.findById(userId, {
      include: ['userIdentities'],
    });
  }
}
