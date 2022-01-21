import { LoaderFunction, useLoaderData } from "remix";

import {floor} from '~/api';
import FloorActionCard from "~/components/FloorActionCard";
import { TypeFloorAction } from "~/types/floor";

type TypeLoaderData = {
    actions: TypeFloorAction[];
}

export const loader: LoaderFunction = async () => {
    const actions = await floor.getActionsForDate('senate', new Date());
    console.log({actions});

    const data: TypeLoaderData = { actions };
    return data;
}

export default function SenateFloorPage() {
    const data = useLoaderData<TypeLoaderData>();

    return (
        <main>
            <h2 className="chamber-page--header">Floor proceedings</h2>
            <ul className="action-card--list">
                {(data.actions || []).map(action => (
                    <li className="action-card--list__item" key={action.description}>
                        <FloorActionCard action={action} />
                    </li>
                ))}
            </ul>
        </main>
    )
}