import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Room,
  Accommodation,
} from '../models';
import {RoomRepository} from '../repositories';

export class RoomAccommodationController {
  constructor(
    @repository(RoomRepository)
    public roomRepository: RoomRepository,
  ) { }

  @get('/rooms/{id}/accommodation', {
    responses: {
      '200': {
        description: 'Accommodation belonging to Room',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Accommodation),
          },
        },
      },
    },
  })
  async getAccommodation(
    @param.path.string('id') id: typeof Room.prototype.id,
  ): Promise<Accommodation> {
    return this.roomRepository.accommodation(id);
  }
}
