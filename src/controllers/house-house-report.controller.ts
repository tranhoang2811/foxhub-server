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
  House,
  HouseReport,
} from '../models';
import {HouseRepository} from '../repositories';

export class HouseHouseReportController {
  constructor(
    @repository(HouseRepository) protected houseRepository: HouseRepository,
  ) { }

  @get('/houses/{id}/house-reports', {
    responses: {
      '200': {
        description: 'Array of House has many HouseReport',
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
    return this.houseRepository.houseReports(id).find(filter);
  }

  @post('/houses/{id}/house-reports', {
    responses: {
      '200': {
        description: 'House model instance',
        content: {'application/json': {schema: getModelSchemaRef(HouseReport)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof House.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HouseReport, {
            title: 'NewHouseReportInHouse',
            exclude: ['id'],
            optional: ['houseId']
          }),
        },
      },
    }) houseReport: Omit<HouseReport, 'id'>,
  ): Promise<HouseReport> {
    return this.houseRepository.houseReports(id).create(houseReport);
  }

  @patch('/houses/{id}/house-reports', {
    responses: {
      '200': {
        description: 'House.HouseReport PATCH success count',
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
    return this.houseRepository.houseReports(id).patch(houseReport, where);
  }

  @del('/houses/{id}/house-reports', {
    responses: {
      '200': {
        description: 'House.HouseReport DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(HouseReport)) where?: Where<HouseReport>,
  ): Promise<Count> {
    return this.houseRepository.houseReports(id).delete(where);
  }
}
