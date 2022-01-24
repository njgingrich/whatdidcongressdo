import { LoaderFunction, useLoaderData } from "remix";

import {committees} from '~/api';
import HearingCard from "~/components/HearingCard";
import { TypeHearing } from "~/types/committees";
import { getDateInDC } from "~/util";

import ChamberPage from "~/components/ChamberPage";

type TypeLoaderData = {
    today: TypeHearing[];
    recent: TypeHearing[];
}

export const loader: LoaderFunction = async () => {
    const data: TypeLoaderData = {
        today: await committees.getHearingsForDate('senate', getDateInDC('yyyy-MM-dd')),
        recent: await committees.getRecentHearings('senate'),
    };
    return data;
}

export default function SenateCommitteesPage() {
    const data = useLoaderData<TypeLoaderData>();

    function ListComponent({ data }: {data: any}) {
        return <HearingCard hearing={data} />
    }

    return (
        <main>
            <ChamberPage
                today={data.today}
                recent={data.recent}
                emptyMessage="The Senate has no hearings scheduled today. Check out the Recent tab to see the latest hearings."
                ListComponent={ListComponent}
            />
        </main>
    )
}