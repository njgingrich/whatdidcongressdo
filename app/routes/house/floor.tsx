import { LoaderFunction, useLoaderData } from "remix";

import {floor} from '~/api';
import FloorActionCard from "~/components/FloorActionCard";
import { TypeFloorAction } from "~/types/floor";
import { getDateInDC } from "~/util";

type TypeLoaderData = {
    today: TypeFloorAction[];
    recent: TypeFloorAction[];
}

export const loader: LoaderFunction = async () => {
    const actions = await floor.getActionsForDate('house', getDateInDC());
    const recent = await floor.getRecentActions('house');

    const data: TypeLoaderData = { today: actions, recent };
    return data;
}

export default function HouseFloorPage() {
    const data = useLoaderData<TypeLoaderData>();

    return (
        <main>
            <h2 className="chamber-page--header">Floor proceedings</h2>
            <ul className="action-card--list">
                {data.today.map(action => (
                    <li className="action-card--list__item" key={action.description}>
                        <FloorActionCard action={action} />
                    </li>
                ))}
            </ul>
            <h3>Recent</h3>
            <ul className="action-card--list">
                {data.recent.map(action => (
                    <li className="action-card--list__item" key={action.description}>
                        <FloorActionCard action={action} />
                    </li>
                ))}
            </ul>
        </main>
    )
}