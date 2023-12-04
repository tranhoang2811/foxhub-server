import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Accommodation,
  FavoriteAccommodation,
} from '../models';
import {AccommodationRepository} from '../repositories';

export class AccommodationFavoriteAccommodationController {
  constructor(
    @repository(AccommodationRepository) protected accommodationRepository: AccommodationRepository,
  ) { }

  @get('/accommodations/{id}/favorite-accommodations', {
    responses: {
      '200': {
        description: 'Array of Accommodation has many FavoriteAccommodation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FavoriteAccommodation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<FavoriteAccommodation>,
  ): Promise<FavoriteAccommodation[]> {
    return this.accommodationRepository.favoriteAccommodations(id).find(filter);
  }

  @post('/accommodations/{id}/favorite-accommodations', {
    responses: {
      '200': {
        description: 'Accommodation model instance',
        content: {'application/json': {schema: getModelSchemaRef(FavoriteAccommodation)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Accommodation.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FavoriteAccommodation, {
            title: 'NewFavoriteAccommodationInAccommodation',
            exclude: ['id'],
            optional: ['accommodationId']
          }),
        },
      },
    }) favoriteAccommodation: Omit<FavoriteAccommodation, 'id'>,
  ): Promise<FavoriteAccommodation> {
    return this.accommodationRepository.favoriteAccommodations(id).create(favoriteAccommodation);
  }

  @patch('/accommodations/{id}/favorite-accommodations', {
    responses: {
      '200': {
        description: 'Accommodation.FavoriteAccommodation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FavoriteAccommodation, {partial: true}),
        },
      },
    })
    favoriteAccommodation: Partial<FavoriteAccommodation>,
    @param.query.object('where', getWhereSchemaFor(FavoriteAccommodation)) where?: Where<FavoriteAccommodation>,
  ): Promise<Count> {
    return this.accommodationRepository.favoriteAccommodations(id).patch(favoriteAccommodation, where);
  }

  @del('/accommodations/{id}/favorite-accommodations', {
    responses: {
      '200': {
        description: 'Accommodation.FavoriteAccommodation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(FavoriteAccommodation)) where?: Where<FavoriteAccommodation>,
  ): Promise<Count> {
    return this.accommodationRepository.favoriteAccommodations(id).delete(where);
  }
}
