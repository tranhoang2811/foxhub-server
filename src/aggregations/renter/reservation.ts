export function getValidReservationPipeline(status: string, renterId: string) {
  const matchStatusPipeline = [];
  const validAccommodationPipeline = [
    {
      $addFields: {
        id: {
          $toString: '$_id',
        },
        renterStringId: {
          $toString: '$renterId',
        },
      },
    },
    {
      $match: {
        renterStringId: renterId,
      },
    },
  ];

  if (status === 'all') {
    matchStatusPipeline.push({
      $match: {
        $or: [
          {
            $and: [{checkIn: {$lt: new Date()}}, {checkOut: {$gt: new Date()}}],
          },
          {status: 'completed'},
          {status: 'cancel'},
        ],
      },
    });
  } else if (status === 'active') {
    matchStatusPipeline.push({
      $match: {
        $and: [{checkIn: {$lt: new Date()}}, {checkOut: {$gt: new Date()}}],
      },
    });
  } else {
    matchStatusPipeline.push({
      $match: {
        status,
      },
    });
  }

  return [...validAccommodationPipeline, ...matchStatusPipeline];
}
