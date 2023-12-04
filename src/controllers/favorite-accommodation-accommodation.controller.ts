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
  Accommodation,
} from '../models';
import {FavoriteAccommodationRepository} from '../repositories';

export class FavoriteAccommodationAccommodationController {
  constructor(
    @repository(FavoriteAccommodationRepository)
    public favoriteAccommodationRepository: FavoriteAccommodationRepository,
  ) { }

  @get('/favorite-accommodations/{id}/accommodation', {
    responses: {
      '200': {
        description: 'Accommodation belonging to FavoriteAccommodation',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Accommodation),
          },
        },
      },
    },
  })
  async getAccommodation(
    @param.path.string('id') id: typeof FavoriteAccommodation.prototype.id,
  ): Promise<Accommodation> {
    return this.favoriteAccommodationRepository.accommodation(id);
  }
}
