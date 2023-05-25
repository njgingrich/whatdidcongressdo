import { useLoaderData } from "@remix-run/react";

import {committees} from '~/api';
import HearingCard from "~/components/HearingCard";
import { TypeHearing } from "~/types/committees";
import { getDateInDC } from "~/util";

import ChamberPage from "~/components/ChamberPage";

type TypeLoaderData = {
    today: TypeHearing[];
    recent: TypeHearing[];
}

export const loader = async () => {
    const data: TypeLoaderData = {
        today: await committees.getHearingsForDate('house', getDateInDC()),
        recent: await committees.getRecentHearings('house'),
    };
    return data;
}

export default function HouseCommitteesPage() {
    const data = useLoaderData<TypeLoaderData>();

    function ListComponent({ data }: {data: any}) {
        return <HearingCard hearing={data} />
    }

    return (
        <main>
            <ChamberPage
                today={data.today}
                recent={data.recent}
                emptyMessage="The House has no hearings scheduled today. Check out the Recent tab to see the latest hearings."
                ListComponent={ListComponent}
            />
        </main>
    )
}