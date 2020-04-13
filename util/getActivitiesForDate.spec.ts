import { bucketActivities } from "./getActivitiesForDate";

it("should return empty buckets with no data", () => {
  expect(bucketActivities([], [])).toStrictEqual({});
  expect(bucketActivities(undefined, undefined)).toStrictEqual({});
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
  expect(Object.keys(buckets).length).toEqual(1);
  expect(buckets[9].length).toEqual(2);
  expect(buckets[9][0].data).toStrictEqual(actions[0]);
  expect(buckets[9][1].data).toStrictEqual(votes[0]);
});

