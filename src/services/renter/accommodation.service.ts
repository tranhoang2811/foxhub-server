import {BindingScope, injectable} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {getPaginationPipeline} from '../../aggregations/common';
import {
  getAccommodationMediaAndRatingPipeline,
  getGenerateAccommodationInformationPipeline,
  getValidAccommodationPipeline,
} from '../../aggregations/renter/accommodation';
import {IPaginationList} from '../../interfaces/common';
import {AggregationPipeline} from '../../interfaces/mongo';
import {
  Accommodation,
  AccommodationRatingRelations,
  AccommodationWithRelations,
} from '../../models';
import {AccommodationRepository} from '../../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class AccommodationService {
  constructor(
    @repository(AccommodationRepository)
    private accommodationRepository: AccommodationRepository,
  ) {}

  public async paginate(
    filter?: Filter<Accommodation>,
  ): Promise<IPaginationList<AccommodationRatingRelations>> {
    const skip: number = filter?.skip ?? 0;
    const limit: number = filter?.limit ?? 9;

    const accommodationCollection =
      this.accommodationRepository.dataSource?.connector?.collection(
        this.accommodationRepository?.modelClass?.name,
      );

    const pipeline: AggregationPipeline = [
      ...getValidAccommodationPipeline(),
      ...getAccommodationMediaAndRatingPipeline(),
      ...getGenerateAccommodationInformationPipeline(),
      ...getPaginationPipeline(skip, limit),
    ];

    const result = (
      await accommodationCollection.aggregate(pipeline)?.toArray()
    )?.[0];

    return {
      list: result?.data ?? [],
      totalCount: result?.counter?.[0]?.total ?? 0,
    };
  }

  public async getDetail(id: string): Promise<AccommodationWithRelations> {
    const accommodation: AccommodationWithRelations =
      await this.accommodationRepository.findById(id, {
        include: [
          {
            relation: 'owner',
          },
          {
            relation: 'rooms',
          },
          {
            relation: 'media',
          },
          {
            relation: 'accommodationRatings',
            scope: {
              include: [
                {
                  relation: 'reviewer',
                },
              ],
            },
          },
        ],
      });

    return accommodation;
  }
}
