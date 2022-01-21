import format from "date-fns/format";

// import mockSenateDateVotesResponse from "~/test/cassettes/votes/senate_date.json";
import mockHouseRecentVotesResponse from "~/test/cassettes/votes/house_recent.json";

import {
  EnumQuestionType,
  TypeChamber,
  TypeVote,
  TypeVoteResponse,
  TypeVoteType,
} from "~/types/votes";

export function getVotesForDate(chamber: TypeChamber, date: Date): TypeVote[] {
  const dateString = format(date, "yyyy-mm-dd");

  return getVotesFromResponse(mockHouseRecentVotesResponse.results);
}

function getVotesFromResponse(response: {
  votes: TypeVoteResponse[];
}): TypeVote[] {
  const votes: TypeVote[] = [];

  for (let vote of response?.votes) {
    votes.push({
      congress: `${vote.congress}`,
      chamber:
        vote.chamber.toLocaleLowerCase() === "house" ? "house" : "senate",
      voteType: vote.vote_type as TypeVoteType,
      questionType: getQuestionTypeForVote(vote),
      timestamp: new Date(`${vote.date} ${vote.time}`).toISOString(),
      related: {
        document_number: vote.document_number,
        source: vote.source,
        bill: vote.bill,
        amendment: vote.amendment,
        nomination: vote.nomination,
      },
      link: vote.url,
      title: vote.question,
      subtitle: vote.question_text,
      description: vote.description,
      result: vote.result,
      breakdown: {
        republican: vote.republican,
        democratic: vote.democratic,
        independent: vote.independent,
        total: vote.total,
        tie_breaker: vote.chamber === "house" ? vote.tie_breaker : undefined,
        tie_breaker_vote: vote.tie_breaker_vote,
      },
    });
  }

  return votes;
}

function getQuestionTypeForVote(vote: TypeVoteResponse): EnumQuestionType {
  return EnumQuestionType.UNKNOWN;
}
