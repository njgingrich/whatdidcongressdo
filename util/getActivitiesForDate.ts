export type BucketResult = {
  type: 'action' | 'vote';
  data: any;
}

export type Buckets = {
  [key: string]: BucketResult[];
}

export function bucketActivities(actions, votes): Buckets {
  console.log('actions:', actions)
  const buckets: Buckets = {};

  (actions || []).forEach(action => {
    const hour = new Date(action.timestamp).getHours();
    if (buckets[hour] == undefined) {
      buckets[hour] = [];
    }

    buckets[hour].push({
      type: "action",
      data: action
    });
  });

  (votes || []).forEach(vote => {
    const hour = new Date(vote.timestamp).getHours();
    if (buckets[hour] == undefined) {
      buckets[hour] = [];
    }

    buckets[hour].push({
      type: "vote",
      data: vote
    });
  });

  Object.keys(buckets).forEach((hour) => {
    const activities = buckets[hour]
    buckets[hour] = activities.sort((a: any, b: any) => {
      const timeA = a.data.timestamp
      const timeB = b.data.timestamp
      return timeA.getTime() - timeB.getTime()
    })
  })

  return buckets;
}
