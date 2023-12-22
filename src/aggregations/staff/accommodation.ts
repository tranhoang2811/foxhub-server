import {AggregationPipeline} from '../../interfaces/mongo';

export function getValidAccommodationPipeline(): AggregationPipeline {
  const validAccommodationPipeline: AggregationPipeline = [
    {
      $match: {
        status: 'approved',
      },
    },
    {
      $lookup: {
        from: 'Users',
        localField: 'ownerId',
        foreignField: '_id',
        as: 'owner',
        pipeline: [
          {
            $match: {
              status: 'active',
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: '$owner',
      },
    },
    {
      $addFields: {
        id: {
          $toString: '$_id',
        },
      },
    },
  ];

  return validAccommodationPipeline;
}

export function getAccommodationMediaPipeline(): AggregationPipeline {
  const accommodationMediaPipeline: AggregationPipeline = [
    {
      $lookup: {
        from: 'Medias',
        localField: '_id',
        foreignField: 'accommodationId',
        as: 'media',
      },
    },
  ];

  return accommodationMediaPipeline;
}


