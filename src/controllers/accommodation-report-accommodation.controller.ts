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
  Accommodation,
} from '../models';
import {AccommodationReportRepository} from '../repositories';

export class AccommodationReportAccommodationController {
  constructor(
    @repository(AccommodationReportRepository)
    public accommodationReportRepository: AccommodationReportRepository,
  ) { }

  @get('/accommodation-reports/{id}/accommodation', {
    responses: {
      '200': {
        description: 'Accommodation belonging to AccommodationReport',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Accommodation),
          },
        },
      },
    },
  })
  async getAccommodation(
    @param.path.string('id') id: typeof AccommodationReport.prototype.id,
  ): Promise<Accommodation> {
    return this.accommodationReportRepository.accommodation(id);
  }
}
