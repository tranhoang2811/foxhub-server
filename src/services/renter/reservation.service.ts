import {BindingScope, injectable} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {getPaginationPipeline} from '../../aggregations/common';
import {getValidReservationPipeline} from '../../aggregations/renter/reservation';
import {EReservationPaymentStatus} from '../../enums/reservation';
import {IPaginationList} from '../../interfaces/common';
import {AggregationPipeline} from '../../interfaces/mongo';
import {Reservation} from '../../models';
import {ReservationRepository} from '../../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class ReservationService {
  constructor(
    @repository(ReservationRepository)
    private reservationRepository: ReservationRepository,
  ) {}

  public async paginate(
    status: string,
    renterId: string,
    filter?: Filter<Reservation>,
  ): Promise<IPaginationList<Reservation>> {
    const skip: number = filter?.skip ?? 0;
    const limit: number = filter?.limit ?? 3;

    const reservationCollection =
      this.reservationRepository.dataSource?.connector?.collection(
        this.reservationRepository?.modelClass?.name,
      );

    const pipeline: AggregationPipeline = [
      ...getValidReservationPipeline(status, renterId),
      ...getPaginationPipeline(skip, limit),
    ];

    const result = (
      await reservationCollection.aggregate(pipeline)?.toArray()
    )?.[0];

    return {
      list: result?.data ?? [],
      totalCount: result?.counter?.[0]?.total ?? 0,
    };
  }

  public async create(
    renterId: string,
    reservation: Omit<Reservation, 'id'>,
  ): Promise<Reservation> {
    return this.reservationRepository.create({
      ...reservation,
      renterId,
      status: EReservationPaymentStatus.PENDING,
      paymentCode: Math.floor(Math.random() * 1000000),
    });
  }
}
