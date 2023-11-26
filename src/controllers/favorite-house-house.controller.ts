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
  House,
} from '../models';
import {FavoriteHouseRepository} from '../repositories';

export class FavoriteHouseHouseController {
  constructor(
    @repository(FavoriteHouseRepository)
    public favoriteHouseRepository: FavoriteHouseRepository,
  ) { }

  @get('/favorite-houses/{id}/house', {
    responses: {
      '200': {
        description: 'House belonging to FavoriteHouse',
        content: {
          'application/json': {
            schema: getModelSchemaRef(House),
          },
        },
      },
    },
  })
  async getHouse(
    @param.path.string('id') id: typeof FavoriteHouse.prototype.id,
  ): Promise<House> {
    return this.favoriteHouseRepository.house(id);
  }
}
