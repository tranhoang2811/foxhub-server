import {AggregationPipeline} from '../interfaces/mongo';
import {ObjectId} from 'mongodb';

export function getPaginationPipeline(): AggregationPipeline {
  const paginationPipeline: AggregationPipeline = [
    {
      $facet: {
        counter: [
          {
            $count: 'total',
          },
        ],
        data: [],
      },
    },
  ];

  return paginationPipeline;
}

export function getDetailPipeline(id: string): AggregationPipeline {
  const objectId = new ObjectId(id);

  const matchStage = id ? [{$match: {_id: objectId}}] : [];

  const detailPipeline: AggregationPipeline = [
    ...matchStage,
    {
      $limit: 1,
    },
  ];

  return detailPipeline;
}
