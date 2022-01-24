import { LoaderFunction, useLoaderData } from "remix";

import {floor} from '~/api';
import FloorActionCard from "~/components/FloorActionCard";
import { TypeFloorAction } from "~/types/floor";
import { getDateInDC } from "~/util";

import ChamberPage from "~/components/ChamberPage";

type TypeLoaderData = {
    today: TypeFloorAction[];
    recent: TypeFloorAction[];
}

export const loader: LoaderFunction = async () => {
    const actions = await floor.getActionsForDate('senate', getDateInDC());
    const recent = await floor.getRecentActions('senate');

    const data: TypeLoaderData = { today: actions, recent };
    return data;
}

export default function SenateFloorPage() {
    const data = useLoaderData<TypeLoaderData>();

    function ListComponent({ data }: {data: any}) {
        return <FloorActionCard action={data} />
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