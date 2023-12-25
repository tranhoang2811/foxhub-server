import {BindingScope, injectable} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {
  getPaginationPipeline,
  getAccommodationMediaAndRatingPipeline,
  getGenerateAccommodationInformationPipeline,
  getValidAccommodationPipeline,
} from '../../aggregations/staff/accommodation';
import {IPaginationList} from '../../interfaces/common';
import {AggregationPipeline} from '../../interfaces/mongo';
import {
  Accommodation,
  AccommodationRatingRelations,
  AccommodationWithRelations,
} from '../../models';
import {AccommodationRepository} from '../../repositories';
import {User} from '../../models';
import {UserRepository} from '../../repositories';
@injectable({scope: BindingScope.TRANSIENT})
export class AccommodationService {
  constructor(
    @repository(AccommodationRepository)
    private accommodationRepository: AccommodationRepository,
    @repository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async paginate(
    filter?: Filter<Accommodation>,
  ): Promise<IPaginationList<AccommodationRatingRelations>> {
    const accommodationCollection =
      this.accommodationRepository.dataSource?.connector?.collection(
        this.accommodationRepository?.modelClass?.name,
      );

    const pipeline: AggregationPipeline = [
      ...getValidAccommodationPipeline(),
      ...getAccommodationMediaAndRatingPipeline(),
      ...getGenerateAccommodationInformationPipeline(),
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

  public async getDetail(id: string): Promise<AccommodationWithRelations> {
    const accommodationCollection =
      this.accommodationRepository.dataSource?.connector?.collection(
        this.accommodationRepository?.modelClass?.name,
      );

    const addFieldsStage = {
      $addFields: {
        id: {
          $toString: '$_id',
        },
      },
    };

    const matchStage = {
      $match: {
        id: id,
      },
    };

    const mediaLookupStage = {
      $lookup: {
        from: 'Medias',
        localField: '_id',
        foreignField: 'accommodationId',
        as: 'media',
      },
    };

    const ownerLookupStage = {
      $lookup: {
        from: 'Users',
        localField: 'ownerId',
        foreignField: '_id',
        as: 'owner',
      },
    };

    const unwindOwnerStage = {
      $unwind: {
        path: '$owner',
      },
    };

    const pipeline = [
      addFieldsStage,
      matchStage,
      mediaLookupStage,
      ownerLookupStage,
      unwindOwnerStage,
    ];

    const result = await accommodationCollection.aggregate(pipeline)?.toArray();
    const accommodation: AccommodationWithRelations = result?.[0];

    return accommodation;
  }
  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
  public async getUserById(userId: string): Promise<User | null> {
    return this.userRepository.findById(userId);
  }
}
