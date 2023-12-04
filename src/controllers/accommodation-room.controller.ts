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
  Room,
} from '../models';
import {AccommodationRepository} from '../repositories';

export class AccommodationRoomController {
  constructor(
    @repository(AccommodationRepository) protected accommodationRepository: AccommodationRepository,
  ) { }

  @get('/accommodations/{id}/rooms', {
    responses: {
      '200': {
        description: 'Array of Accommodation has many Room',
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
    return this.accommodationRepository.rooms(id).find(filter);
  }

  @post('/accommodations/{id}/rooms', {
    responses: {
      '200': {
        description: 'Accommodation model instance',
        content: {'application/json': {schema: getModelSchemaRef(Room)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Accommodation.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Room, {
            title: 'NewRoomInAccommodation',
            exclude: ['id'],
            optional: ['accommodationId']
          }),
        },
      },
    }) room: Omit<Room, 'id'>,
  ): Promise<Room> {
    return this.accommodationRepository.rooms(id).create(room);
  }

  @patch('/accommodations/{id}/rooms', {
    responses: {
      '200': {
        description: 'Accommodation.Room PATCH success count',
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
    return this.accommodationRepository.rooms(id).patch(room, where);
  }

  @del('/accommodations/{id}/rooms', {
    responses: {
      '200': {
        description: 'Accommodation.Room DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Room)) where?: Where<Room>,
  ): Promise<Count> {
    return this.accommodationRepository.rooms(id).delete(where);
  }
}
