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
  AccommodationReport,
} from '../models';
import {AccommodationRepository} from '../repositories';

export class AccommodationAccommodationReportController {
  constructor(
    @repository(AccommodationRepository) protected accommodationRepository: AccommodationRepository,
  ) { }

  @get('/accommodations/{id}/accommodation-reports', {
    responses: {
      '200': {
        description: 'Array of Accommodation has many AccommodationReport',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AccommodationReport)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<AccommodationReport>,
  ): Promise<AccommodationReport[]> {
    return this.accommodationRepository.accommodationReports(id).find(filter);
  }

  @post('/accommodations/{id}/accommodation-reports', {
    responses: {
      '200': {
        description: 'Accommodation model instance',
        content: {'application/json': {schema: getModelSchemaRef(AccommodationReport)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Accommodation.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccommodationReport, {
            title: 'NewAccommodationReportInAccommodation',
            exclude: ['id'],
            optional: ['accommodationId']
          }),
        },
      },
    }) accommodationReport: Omit<AccommodationReport, 'id'>,
  ): Promise<AccommodationReport> {
    return this.accommodationRepository.accommodationReports(id).create(accommodationReport);
  }

  @patch('/accommodations/{id}/accommodation-reports', {
    responses: {
      '200': {
        description: 'Accommodation.AccommodationReport PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccommodationReport, {partial: true}),
        },
      },
    })
    accommodationReport: Partial<AccommodationReport>,
    @param.query.object('where', getWhereSchemaFor(AccommodationReport)) where?: Where<AccommodationReport>,
  ): Promise<Count> {
    return this.accommodationRepository.accommodationReports(id).patch(accommodationReport, where);
  }

  @del('/accommodations/{id}/accommodation-reports', {
    responses: {
      '200': {
        description: 'Accommodation.AccommodationReport DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AccommodationReport)) where?: Where<AccommodationReport>,
  ): Promise<Count> {
    return this.accommodationRepository.accommodationReports(id).delete(where);
  }
}
