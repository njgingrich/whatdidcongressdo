import { LoaderFunction, useLoaderData } from "remix";

import {committees} from '~/api';
import HearingCard from "~/components/HearingCard";
import { TypeHearing } from "~/types/committees";

type TypeLoaderData = {
    hearings: TypeHearing[];
}

export const loader: LoaderFunction = () => {
    const hearingsForDate = committees.getHearingsForDate('house', new Date());

    const data: TypeLoaderData = { hearings: hearingsForDate };
    return data;
}

export default function HouseCommitteesPage() {
    const data = useLoaderData<TypeLoaderData>();

    return (
        <main>
            <h2 className="chamber-page--header">Bills</h2>
            <ul className="action-card--list">
                {data.hearings.map(hearing => (
                    <li className="action-card--list__item" key={`${hearing.committee.code}-${hearing.timestamp}`}>
                        <HearingCard hearing={hearing} />
                    </li>
                ))}
            </ul>
        </main>
    )
}