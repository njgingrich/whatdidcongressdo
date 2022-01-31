import format from "date-fns/format";
import {
  EnumQuestionType,
  TypeChamber,
  TypeVote,
  TypeVoteResponse,
  TypeVoteType,
} from "~/types/votes";
import { formatInDC, getDateInDC } from "~/util";
import { request } from "./service";

export async function getVotesForDate(
  chamber: TypeChamber,
  date: Date
): Promise<TypeVote[]> {
  const dateString = formatInDC(date, "yyyy-MM-dd");
  let numResults = 20;
  let offset = 0;
  let votes: TypeVoteResponse[] = [];

  while (numResults === 20) {
    const json = await request(
      `/${chamber}/votes/${dateString}/${dateString}?offset=${offset}`
    );

    numResults = json.results.num_results ?? 0;
    offset += 20;
    votes.push(...json.results.votes);
  }

  return getVotesFromResponse(votes);
}

export async function getRecentVotes(
  chamber: TypeChamber,
  options: { includeToday: boolean } = { includeToday: false }
): Promise<TypeVote[]> {
  const json = await request(`/${chamber}/votes/recent.json`);
  let votes: TypeVoteResponse[] = json.results.votes;

  const today = format(getDateInDC(), "yyyy-MM-dd");
  if (options.includeToday === false) {
    votes = votes.filter((v) => v.date !== today);
  }

  return getVotesFromResponse(votes);
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
