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
import { request } from "./service";

export async function getVotesForDate(chamber: TypeChamber, date: string): Promise<TypeVote[]> {
  let numResults = 20;
  let offset = 0;
  let votes: TypeVoteResponse[] = [];

  while (numResults === 20) {
    const json = await request(`/${chamber}/votes/${date}/${date}?offset=${offset}`);

    numResults = json.results.num_results ?? 0;
    offset += 20;
    votes.push(...json.results.votes);
  }

  return getVotesFromResponse(votes);
}

export async function getRecentVotes(chamber: TypeChamber): Promise<TypeVote[]> {
  const json = await request(`/${chamber}/votes/recent.json`);
  const votes: TypeVoteResponse[] = json.results.votes;

  const mostRecentDate = votes[0].date;
  const recentVotes = votes.filter(v => v.date !== mostRecentDate);

  return getVotesFromResponse(recentVotes);
}

function getVotesFromResponse(voteResponses: TypeVoteResponse[]): TypeVote[] {
  const votes: TypeVote[] = [];

  for (let vote of voteResponses) {
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
