import { useLoaderData } from "remix";

import { bills, committees, floor, votes } from "~/api";
import { TypeBill } from "~/types/bills";
import { TypeHearing } from "~/types/committees";
import { TypeFloorAction } from "~/types/floor";
import { TypeVote } from "~/types/votes";
import { getDateInDC } from "~/util";


type TypeLoaderData = {
    hearings: TypeHearing[];
    votes: TypeVote[];
    bills: TypeBill[];
    actions: TypeFloorAction[];
};

export const loader = async () => {
  const date = getDateInDC('2022-02-10');
  const results = await Promise.allSettled([
    committees.getHearingsForDate("senate", date),
    votes.getVotesForDate("senate", date),
    bills.getBillsForDate("senate", date),
    floor.getActionsForDate("senate", date),
  ]);

  const hearingsResult = results[0].status === 'fulfilled' ? results[0].value : [];
  const votesResult = results[1].status === 'fulfilled' ? results[1].value : [];
  const billsResult = results[2].status === 'fulfilled' ? results[2].value : [];
  const floorResult = results[3].status === 'fulfilled' ? results[3].value : [];
  const data: TypeLoaderData = {
    hearings: hearingsResult,
    votes: votesResult,
    bills: billsResult,
    actions: floorResult,
  };

  return data;
};

export default function SenateIndexPage() {
  const data = useLoaderData<TypeLoaderData>();

  return (
    <main>
      <h2>Votes</h2>
        <ul>
          {data.votes.map(vote => (
            <li key={vote.subtitle || vote.title}>
              <div>
                <span>{vote.subtitle || vote.title}</span>
                <span>
                  {vote.result}
                </span>
              </div>
            </li>
          ))}
        </ul>
      <h2>Bills</h2>
      <ul>
        {data.bills.map(bill => (
          <li key={bill.id}>
            <div>
              <span>{bill.shortTitle}</span>
              <span>{bill.number}</span>
              <span>{bill.details.lastAction}</span>
            </div>
          </li>
        ))}
      </ul>
      <h2>Committees</h2>
      <h2>Floor Proceedings</h2>
      <ul>
        {data.actions.map(action => (
          <li key={action.description}>
            <div>
              <span>{action.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
