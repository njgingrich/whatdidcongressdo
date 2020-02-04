import houseActions from "../static/testing/house_floor.json";
import houseVotes from "../static/testing/house.json";
import { formatResponse as formatVotes } from "../functions/getVotesForDate/getVotesForDate";
import { formatResponse as formatActions } from "../functions/getActionsForDate/getActionsForDate";

const votes = formatVotes(houseVotes);
const actions = formatActions(houseActions);

export function bucketActivities(actions, votes) {
  const buckets = Array(24).fill(null).map(() => new Array()); // 1 for every hour

  (actions || []).forEach(action => {
    const hour = action.timestamp.getHours();
    buckets[hour].push({
      type: "action",
      data: action
    });
  });

  (votes || []).forEach(vote => {
    const hour = vote.timestamp.getHours();
    buckets[hour].push({
      type: "vote",
      data: vote
    });
  });

  return buckets;
}
