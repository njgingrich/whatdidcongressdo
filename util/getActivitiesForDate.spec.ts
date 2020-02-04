import { bucketActivities } from "./getActivitiesForDate";

it("should return empty buckets with no data", () => {
  expect(bucketActivities([], [])).toStrictEqual(Array(24).fill([]));
  expect(bucketActivities(undefined, undefined)).toStrictEqual(Array(24).fill([]));
});

it("should bucket data correctly", () => {
  const actions = [
    {
      congress: "115",
      chamber: "House",
      timestamp: new Date("2017-12-21 09:09:57"),
      date: "2017-12-21",
      action_id: "H61000",
      description:
        "The Speaker announced that the House do now recess. The next meeting is subject to the call of the Chair.",
      bill_ids: []
    }
  ];
  const votes = [
    {
      timestamp: new Date("2017-12-21 09:10:57")
    }
  ];
  const buckets = bucketActivities(actions, votes);
  expect(buckets.map(v => v.length))
    .toStrictEqual([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]);
  expect(buckets[9][0].data).toStrictEqual(actions[0]);
  expect(buckets[9][1].data).toStrictEqual(votes[0]);
});
