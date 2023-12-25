import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {Filter} from '@loopback/repository';
import {api, get, param, response} from '@loopback/rest';
import {EUserRole} from '../../enums/user';
import {IPaginationList} from '../../interfaces/common';
import {
  Accommodation,
  AccommodationRatingRelations,
  AccommodationWithRelations,
} from '../../models';
import {AccommodationService} from '../../services/renter/accommodation.service';

@authenticate('jwt')
@api({basePath: `/${EUserRole.RENTER}`})
export class AccommodationController {
  constructor(
    @service(AccommodationService)
    public accommodationService: AccommodationService,
  ) {}

  @get('/accommodations')
  @response(200, {
    description: 'Paginate accommodation list',
    content: {
      'application/json': {
        schema: {},
      },
    },
  })
  async paginate(
    @param.filter(Accommodation) filter?: Filter<Accommodation>,
  ): Promise<IPaginationList<AccommodationRatingRelations>> {
    return this.accommodationService.paginate(filter);
  }

  @get('/accommodations/{id}')
  @response(200, {
    description: 'Accommodation detail',
    content: {
      'application/json': {
        schema: {},
      },
    },
  })
  async getDetail(
    @param.path.string('id') id: string,
  ): Promise<AccommodationWithRelations> {
    return this.accommodationService.getDetail(id);
  }
}
