import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  HouseReport,
  House,
} from '../models';
import {HouseReportRepository} from '../repositories';

export class HouseReportHouseController {
  constructor(
    @repository(HouseReportRepository)
    public houseReportRepository: HouseReportRepository,
  ) { }

  @get('/house-reports/{id}/house', {
    responses: {
      '200': {
        description: 'House belonging to HouseReport',
        content: {
          'application/json': {
            schema: getModelSchemaRef(House),
          },
        },
      },
    },
  })
  async getHouse(
    @param.path.string('id') id: typeof HouseReport.prototype.id,
  ): Promise<House> {
    return this.houseReportRepository.house(id);
  }
}
