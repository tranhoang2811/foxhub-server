import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  FavoriteHouse,
  User,
} from '../models';
import {FavoriteHouseRepository} from '../repositories';

export class FavoriteHouseUserController {
  constructor(
    @repository(FavoriteHouseRepository)
    public favoriteHouseRepository: FavoriteHouseRepository,
  ) { }

  @get('/favorite-houses/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to FavoriteHouse',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof FavoriteHouse.prototype.id,
  ): Promise<User> {
    return this.favoriteHouseRepository.renter(id);
  }
}
