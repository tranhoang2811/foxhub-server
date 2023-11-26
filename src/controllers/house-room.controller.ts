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
  Room,
} from '../models';
import {HouseRepository} from '../repositories';

export class HouseRoomController {
  constructor(
    @repository(HouseRepository) protected houseRepository: HouseRepository,
  ) { }

  @get('/houses/{id}/rooms', {
    responses: {
      '200': {
        description: 'Array of House has many Room',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Room)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Room>,
  ): Promise<Room[]> {
    return this.houseRepository.rooms(id).find(filter);
  }

  @post('/houses/{id}/rooms', {
    responses: {
      '200': {
        description: 'House model instance',
        content: {'application/json': {schema: getModelSchemaRef(Room)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof House.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Room, {
            title: 'NewRoomInHouse',
            exclude: ['id'],
            optional: ['houseId']
          }),
        },
      },
    }) room: Omit<Room, 'id'>,
  ): Promise<Room> {
    return this.houseRepository.rooms(id).create(room);
  }

  @patch('/houses/{id}/rooms', {
    responses: {
      '200': {
        description: 'House.Room PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Room, {partial: true}),
        },
      },
    })
    room: Partial<Room>,
    @param.query.object('where', getWhereSchemaFor(Room)) where?: Where<Room>,
  ): Promise<Count> {
    return this.houseRepository.rooms(id).patch(room, where);
  }

  @del('/houses/{id}/rooms', {
    responses: {
      '200': {
        description: 'House.Room DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Room)) where?: Where<Room>,
  ): Promise<Count> {
    return this.houseRepository.rooms(id).delete(where);
  }
}
