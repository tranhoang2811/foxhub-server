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
  House,
  FavoriteHouse,
} from '../models';
import {HouseRepository} from '../repositories';

export class HouseFavoriteHouseController {
  constructor(
    @repository(HouseRepository) protected houseRepository: HouseRepository,
  ) { }

  @get('/houses/{id}/favorite-houses', {
    responses: {
      '200': {
        description: 'Array of House has many FavoriteHouse',
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
    return this.houseRepository.favoriteHouses(id).find(filter);
  }

  @post('/houses/{id}/favorite-houses', {
    responses: {
      '200': {
        description: 'House model instance',
        content: {'application/json': {schema: getModelSchemaRef(FavoriteHouse)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof House.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FavoriteHouse, {
            title: 'NewFavoriteHouseInHouse',
            exclude: ['id'],
            optional: ['houseId']
          }),
        },
      },
    }) favoriteHouse: Omit<FavoriteHouse, 'id'>,
  ): Promise<FavoriteHouse> {
    return this.houseRepository.favoriteHouses(id).create(favoriteHouse);
  }

  @patch('/houses/{id}/favorite-houses', {
    responses: {
      '200': {
        description: 'House.FavoriteHouse PATCH success count',
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
    return this.houseRepository.favoriteHouses(id).patch(favoriteHouse, where);
  }

  @del('/houses/{id}/favorite-houses', {
    responses: {
      '200': {
        description: 'House.FavoriteHouse DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(FavoriteHouse)) where?: Where<FavoriteHouse>,
  ): Promise<Count> {
    return this.houseRepository.favoriteHouses(id).delete(where);
  }
}
