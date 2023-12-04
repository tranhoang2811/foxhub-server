import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  FavoriteAccommodation,
  User,
} from '../models';
import {FavoriteAccommodationRepository} from '../repositories';

export class FavoriteAccommodationUserController {
  constructor(
    @repository(FavoriteAccommodationRepository)
    public favoriteAccommodationRepository: FavoriteAccommodationRepository,
  ) { }

  @get('/favorite-accommodations/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to FavoriteAccommodation',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof FavoriteAccommodation.prototype.id,
  ): Promise<User> {
    return this.favoriteAccommodationRepository.renter(id);
  }
}
