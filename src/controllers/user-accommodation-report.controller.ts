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
  User,
  AccommodationReport,
} from '../models';
import {UserRepository} from '../repositories';

export class UserAccommodationReportController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/accommodation-reports', {
    responses: {
      '200': {
        description: 'Array of User has many AccommodationReport',
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
    return this.userRepository.accommodationReports(id).find(filter);
  }

  @post('/users/{id}/accommodation-reports', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(AccommodationReport)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccommodationReport, {
            title: 'NewAccommodationReportInUser',
            exclude: ['id'],
            optional: ['reporterId']
          }),
        },
      },
    }) accommodationReport: Omit<AccommodationReport, 'id'>,
  ): Promise<AccommodationReport> {
    return this.userRepository.accommodationReports(id).create(accommodationReport);
  }

  @patch('/users/{id}/accommodation-reports', {
    responses: {
      '200': {
        description: 'User.AccommodationReport PATCH success count',
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
    return this.userRepository.accommodationReports(id).patch(accommodationReport, where);
  }

  @del('/users/{id}/accommodation-reports', {
    responses: {
      '200': {
        description: 'User.AccommodationReport DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AccommodationReport)) where?: Where<AccommodationReport>,
  ): Promise<Count> {
    return this.userRepository.accommodationReports(id).delete(where);
  }
}
