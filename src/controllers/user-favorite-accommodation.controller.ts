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
  User,
  FavoriteAccommodation,
} from '../models';
import {UserRepository} from '../repositories';

export class UserFavoriteAccommodationController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/favorite-accommodations', {
    responses: {
      '200': {
        description: 'Array of User has many FavoriteAccommodation',
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
    return this.userRepository.favoriteAccommodations(id).find(filter);
  }

  @post('/users/{id}/favorite-accommodations', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(FavoriteAccommodation)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FavoriteAccommodation, {
            title: 'NewFavoriteAccommodationInUser',
            exclude: ['id'],
            optional: ['renterId']
          }),
        },
      },
    }) favoriteAccommodation: Omit<FavoriteAccommodation, 'id'>,
  ): Promise<FavoriteAccommodation> {
    return this.userRepository.favoriteAccommodations(id).create(favoriteAccommodation);
  }

  @patch('/users/{id}/favorite-accommodations', {
    responses: {
      '200': {
        description: 'User.FavoriteAccommodation PATCH success count',
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
    return this.userRepository.favoriteAccommodations(id).patch(favoriteAccommodation, where);
  }

  @del('/users/{id}/favorite-accommodations', {
    responses: {
      '200': {
        description: 'User.FavoriteAccommodation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(FavoriteAccommodation)) where?: Where<FavoriteAccommodation>,
  ): Promise<Count> {
    return this.userRepository.favoriteAccommodations(id).delete(where);
  }
}
