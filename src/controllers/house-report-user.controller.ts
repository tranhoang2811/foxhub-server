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
  User,
} from '../models';
import {HouseReportRepository} from '../repositories';

export class HouseReportUserController {
  constructor(
    @repository(HouseReportRepository)
    public houseReportRepository: HouseReportRepository,
  ) { }

  @get('/house-reports/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to HouseReport',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof HouseReport.prototype.id,
  ): Promise<User> {
    return this.houseReportRepository.reporter(id);
  }
}
