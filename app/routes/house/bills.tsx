import { LoaderFunction, useLoaderData } from "remix";

import {bills} from '~/api';
import BillCard from "~/components/BillCard";
import { TypeBill } from "~/types/bills";
import { getDateInDC } from "~/util";

import ChamberPage from "~/components/ChamberPage";

type TypeLoaderData = {
    today: TypeBill[];
    recent: TypeBill[];
}

export const loader: LoaderFunction = async () => {
    const data: TypeLoaderData = {
        today: await bills.getBillsForDate('house', getDateInDC('yyyy-MM-dd')),
        recent: await bills.getRecentBills('house'),
    };
    return data;
}

export default function HouseBillsPage() {
    const data = useLoaderData<TypeLoaderData>();

    function ListComponent({ data }: {data: any}) {
        return <BillCard bill={data} />
    }

    return (
        <main>
            <ChamberPage
                today={data.today}
                recent={data.recent}
                emptyMessage="The House has not taken action on any bills today. Check out the Recent tab to see what bills have been updated recently."
                ListComponent={ListComponent}
            />
        </main>
    )
}