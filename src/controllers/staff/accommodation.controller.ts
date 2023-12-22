import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Accommodation} from '../../models';
import {AccommodationRepository} from '../../repositories';

export class AccommodationController {
  constructor(
    @repository(AccommodationRepository)
    public accommodationRepository: AccommodationRepository,
  ) {}

  @post('/accommodations')
  @response(200, {
    description: 'Accommodation model instance',
    content: {'application/json': {schema: getModelSchemaRef(Accommodation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Accommodation, {
            title: 'NewAccommodation',
            exclude: ['id'],
          }),
        },
      },
    })
    accommodation: Omit<Accommodation, 'id'>,
  ): Promise<Accommodation> {
    return this.accommodationRepository.create(accommodation);
  }

  @get('/accommodations/count')
  @response(200, {
    description: 'Accommodation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Accommodation) where?: Where<Accommodation>,
  ): Promise<Count> {
    return this.accommodationRepository.count(where);
  }

  @get('/accommodations')
  @response(200, {
    description: 'Array of Accommodation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Accommodation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Accommodation) filter?: Filter<Accommodation>,
  ): Promise<Accommodation[]> {
    return this.accommodationRepository.find(filter);
  }

  @patch('/accommodations')
  @response(200, {
    description: 'Accommodation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Accommodation, {partial: true}),
        },
      },
    })
    accommodation: Accommodation,
    @param.where(Accommodation) where?: Where<Accommodation>,
  ): Promise<Count> {
    return this.accommodationRepository.updateAll(accommodation, where);
  }

  @get('/accommodations/{id}')
  @response(200, {
    description: 'Accommodation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Accommodation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Accommodation, {exclude: 'where'})
    filter?: FilterExcludingWhere<Accommodation>,
  ): Promise<Accommodation> {
    return this.accommodationRepository.findById(id, filter);
  }

  @patch('/accommodations/{id}')
  @response(204, {
    description: 'Accommodation PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Accommodation, {partial: true}),
        },
      },
    })
    accommodation: Accommodation,
  ): Promise<void> {
    await this.accommodationRepository.updateById(id, accommodation);
  }

  @put('/accommodations/{id}')
  @response(204, {
    description: 'Accommodation PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() accommodation: Accommodation,
  ): Promise<void> {
    await this.accommodationRepository.replaceById(id, accommodation);
  }

  @del('/accommodations/{id}')
  @response(204, {
    description: 'Accommodation DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.accommodationRepository.deleteById(id);
  }
}
