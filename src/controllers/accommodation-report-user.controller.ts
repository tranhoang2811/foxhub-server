import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AccommodationReport,
  User,
} from '../models';
import {AccommodationReportRepository} from '../repositories';

export class AccommodationReportUserController {
  constructor(
    @repository(AccommodationReportRepository)
    public accommodationReportRepository: AccommodationReportRepository,
  ) { }

  @get('/accommodation-reports/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to AccommodationReport',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof AccommodationReport.prototype.id,
  ): Promise<User> {
    return this.accommodationReportRepository.reporter(id);
  }
}
