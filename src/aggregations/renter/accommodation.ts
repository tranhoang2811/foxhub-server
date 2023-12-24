import {AggregationPipeline} from '../../interfaces/mongo';

// *INFO: Pagination pipeline
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
  ];

  return validAccommodationPipeline;
}

export function getAccommodationMediaAndRatingPipeline(): AggregationPipeline {
  const accommodationMediaAndRatingPipeline: AggregationPipeline = [
    {
      $lookup: {
        from: 'Medias',
        localField: '_id',
        foreignField: 'accommodationId',
        as: 'media',
      },
    },
    {
      $lookup: {
        from: 'AccommodationRatings',
        localField: '_id',
        foreignField: 'accommodationId',
        as: 'reviews',
      },
    },
  ];

  return accommodationMediaAndRatingPipeline;
}

export function getGenerateAccommodationInformationPipeline(): AggregationPipeline {
  const generateAccommodationInformationPipeline: AggregationPipeline = [
    {
      $addFields: {
        averageRating: {
          $cond: {
            if: {$eq: [{$size: '$reviews'}, 0]},
            then: 0,
            else: {
              $divide: [{$sum: '$reviews.rate'}, {$size: '$reviews'}],
            },
          },
        },
        totalRating: {
          $size: '$reviews',
        },
        ownerName: {
          $concat: [
            {$ifNull: ['$owner.firstName', '']},
            ' ',
            {$ifNull: ['$owner.lastName', '']},
          ],
        },
        imageUrl: {
          $arrayElemAt: ['$media.source', 0],
        },
        id: {
          $toString: '$_id',
        },
      },
    },
    {
      $addFields: {
        owner: '$$REMOVE',
        media: '$$REMOVE',
        reviews: '$$REMOVE',
        _id: '$$REMOVE',
      },
    },
  ];

  return generateAccommodationInformationPipeline;
}
