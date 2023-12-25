import {AggregationPipeline} from '../interfaces/mongo';

export function getPaginationPipeline(
  skip: number,
  limit: number,
): AggregationPipeline {
  const paginationPipeline: AggregationPipeline = [
    {
      $facet: {
        counter: [
          {
            $count: 'total',
          },
        ],
        data: [
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
        ],
      },
    },
  ];

  return paginationPipeline;
}
