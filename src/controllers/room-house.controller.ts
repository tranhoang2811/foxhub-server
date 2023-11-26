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
  House,
} from '../models';
import {RoomRepository} from '../repositories';

export class RoomHouseController {
  constructor(
    @repository(RoomRepository)
    public roomRepository: RoomRepository,
  ) { }

  @get('/rooms/{id}/house', {
    responses: {
      '200': {
        description: 'House belonging to Room',
        content: {
          'application/json': {
            schema: getModelSchemaRef(House),
          },
        },
      },
    },
  })
  async getHouse(
    @param.path.string('id') id: typeof Room.prototype.id,
  ): Promise<House> {
    return this.roomRepository.house(id);
  }
}
