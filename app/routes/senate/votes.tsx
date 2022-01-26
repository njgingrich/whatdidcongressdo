import { LoaderFunction, useLoaderData } from "remix";

import {votes} from '~/api';
import ChamberPage from "~/components/ChamberPage";
import VoteCard from "~/components/VoteCard";
import { TypeVote } from "~/types/votes";
import { getDateInDC } from "~/util";

type TypeLoaderData = {
    today: TypeVote[];
    recent: TypeVote[];
}

export const loader: LoaderFunction = async () => {
    let data: TypeLoaderData = {
        today: await votes.getVotesForDate('senate', getDateInDC()),
        recent: await votes.getRecentVotes('senate'),
    };
    return data;
};

export default function SenateVotesPage() {
    const data = useLoaderData<TypeLoaderData>();

    function ListComponent({ data }: {data: any}) {
        return <VoteCard vote={data} />
    }

    return (
        <main>
            <ChamberPage
                today={data.today}
                recent={data.recent}
                emptyMessage="The Senate has not done anything today. Check out the Recent tab to see their latest actions."
                ListComponent={ListComponent}
            />
        </main>
    )
}