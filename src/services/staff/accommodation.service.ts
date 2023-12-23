import {BindingScope, injectable} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {
  getPaginationPipeline,
  getDetailPipeline,
} from '../../aggregations/common';
import {
  getAccommodationMediaAndRatingPipeline,
  getGenerateAccommodationInformationPipeline,
  getValidAccommodationPipeline,
} from '../../aggregations/staff/accommodation';
import {IPaginationList} from '../../interfaces/common';
import {AggregationPipeline} from '../../interfaces/mongo';
import {Accommodation, AccommodationRatingRelations} from '../../models';
import {AccommodationRepository} from '../../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class AccommodationService {
  constructor(
    @repository(AccommodationRepository)
    private accommodationRepository: AccommodationRepository,
  ) {}
  private getBasePipeline(): AggregationPipeline {
    return [
      ...getValidAccommodationPipeline(),
      ...getAccommodationMediaAndRatingPipeline(),
      ...getGenerateAccommodationInformationPipeline(),
    ];
  }
  public async paginate(
    filter?: Filter<Accommodation>,
  ): Promise<IPaginationList<AccommodationRatingRelations>> {
    const accommodationCollection =
      this.accommodationRepository.dataSource?.connector?.collection(
        this.accommodationRepository?.modelClass?.name,
      );

    const pipeline: AggregationPipeline = [
      ...this.getBasePipeline(),
      ...getPaginationPipeline(),
    ];

    const result = (
      await accommodationCollection.aggregate(pipeline)?.toArray()
    )?.[0];

    return {
      list: result?.data ?? [],
      totalCount: result?.counter?.[0]?.total ?? 0,
    };
  }

  public async getById(
    id: string,
  ): Promise<AccommodationRatingRelations | null> {
    const accommodationCollection =
      this.accommodationRepository.dataSource?.connector?.collection(
        this.accommodationRepository?.modelClass?.name,
      );

    const pipeline: AggregationPipeline = [
      ...getValidAccommodationPipeline(),
      ...getAccommodationMediaAndRatingPipeline(),
      ...getGenerateAccommodationInformationPipeline(),
      ...getDetailPipeline(id),
    ];

    const result = await accommodationCollection.aggregate(pipeline)?.toArray();

    return result?.[0] || null;
  }
}
