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
  FavoriteHouse,
} from '../models';
import {UserRepository} from '../repositories';

export class UserFavoriteHouseController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/favorite-houses', {
    responses: {
      '200': {
        description: 'Array of User has many FavoriteHouse',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FavoriteHouse)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<FavoriteHouse>,
  ): Promise<FavoriteHouse[]> {
    return this.userRepository.favoriteHouses(id).find(filter);
  }

  @post('/users/{id}/favorite-houses', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(FavoriteHouse)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FavoriteHouse, {
            title: 'NewFavoriteHouseInUser',
            exclude: ['id'],
            optional: ['renterId']
          }),
        },
      },
    }) favoriteHouse: Omit<FavoriteHouse, 'id'>,
  ): Promise<FavoriteHouse> {
    return this.userRepository.favoriteHouses(id).create(favoriteHouse);
  }

  @patch('/users/{id}/favorite-houses', {
    responses: {
      '200': {
        description: 'User.FavoriteHouse PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FavoriteHouse, {partial: true}),
        },
      },
    })
    favoriteHouse: Partial<FavoriteHouse>,
    @param.query.object('where', getWhereSchemaFor(FavoriteHouse)) where?: Where<FavoriteHouse>,
  ): Promise<Count> {
    return this.userRepository.favoriteHouses(id).patch(favoriteHouse, where);
  }

  @del('/users/{id}/favorite-houses', {
    responses: {
      '200': {
        description: 'User.FavoriteHouse DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(FavoriteHouse)) where?: Where<FavoriteHouse>,
  ): Promise<Count> {
    return this.userRepository.favoriteHouses(id).delete(where);
  }
}
