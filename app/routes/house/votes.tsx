import { LoaderFunction, useLoaderData } from "remix";

import {votes} from '~/api';
import VoteCard from "~/components/VoteCard";
import { TypeVote } from "~/types/votes";

type TypeLoaderData = {
    votes: TypeVote[];
}

export const loader: LoaderFunction = () => {
    let data: TypeLoaderData = {votes: votes.getVotesForDate('house', new Date())};
    return data;
};

export default function HouseVotesPage() {
    const data = useLoaderData<TypeLoaderData>();

    return (
        <main>
            <h2 className="chamber-page--header">Votes</h2>
            <ul className="action-card--list">
                {data.votes.map(vote => (
                    <li className="action-card--list__item" key={vote.questionType}>
                        <VoteCard vote={vote} />
                    </li>
                ))}
            </ul>
        </main>
    )
}