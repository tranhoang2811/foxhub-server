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
  HouseReport,
} from '../models';
import {UserRepository} from '../repositories';

export class UserHouseReportController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/house-reports', {
    responses: {
      '200': {
        description: 'Array of User has many HouseReport',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HouseReport)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<HouseReport>,
  ): Promise<HouseReport[]> {
    return this.userRepository.houseReports(id).find(filter);
  }

  @post('/users/{id}/house-reports', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(HouseReport)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HouseReport, {
            title: 'NewHouseReportInUser',
            exclude: ['id'],
            optional: ['reporterId']
          }),
        },
      },
    }) houseReport: Omit<HouseReport, 'id'>,
  ): Promise<HouseReport> {
    return this.userRepository.houseReports(id).create(houseReport);
  }

  @patch('/users/{id}/house-reports', {
    responses: {
      '200': {
        description: 'User.HouseReport PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HouseReport, {partial: true}),
        },
      },
    })
    houseReport: Partial<HouseReport>,
    @param.query.object('where', getWhereSchemaFor(HouseReport)) where?: Where<HouseReport>,
  ): Promise<Count> {
    return this.userRepository.houseReports(id).patch(houseReport, where);
  }

  @del('/users/{id}/house-reports', {
    responses: {
      '200': {
        description: 'User.HouseReport DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(HouseReport)) where?: Where<HouseReport>,
  ): Promise<Count> {
    return this.userRepository.houseReports(id).delete(where);
  }
}
