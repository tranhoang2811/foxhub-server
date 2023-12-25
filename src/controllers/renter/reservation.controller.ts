import {authenticate} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {
  api,
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {SecurityBindings, UserProfile, securityId} from '@loopback/security';
import {EUserRole} from '../../enums/user';
import {IPaginationList} from '../../interfaces/common';
import {Reservation} from '../../models';
import {ReservationRepository} from '../../repositories';
import {ReservationService} from '../../services/renter/reservation.service';

@authenticate('jwt')
@api({basePath: `/${EUserRole.RENTER}`})
export class ReservationController {
  constructor(
    @repository(ReservationRepository)
    public reservationRepository: ReservationRepository,

    @service(ReservationService)
    public reservationService: ReservationService,
  ) {}

  @post('/reservations')
  @response(200, {
    description: 'Reservation model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reservation)}},
  })
  async create(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {
            title: 'NewReservation',
            exclude: ['id'],
          }),
        },
      },
    })
    reservation: Omit<Reservation, 'id'>,
  ): Promise<Reservation> {
    const userId: string = currentUserProfile[securityId];
    return this.reservationService.create(userId, reservation);
  }

  @get('/reservations/{status}')
  @response(200, {
    description: 'Array of Reservation model instances',
    content: {
      'application/json': {
        schema: {},
      },
    },
  })
  async paginate(
    @param.path.string('status') status: string,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.filter(Reservation) filter?: Filter<Reservation>,
  ): Promise<IPaginationList<Reservation>> {
    const userId: string = currentUserProfile[securityId];
    return this.reservationService.paginate(status, userId, filter);
  }
}
