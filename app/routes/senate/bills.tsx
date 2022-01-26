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
        today: await bills.getBillsForDate('senate', getDateInDC()),
        recent: await bills.getRecentBills('senate'),
    };
    return data;
}

export default function SenateBillsPage() {
    const data = useLoaderData<TypeLoaderData>();

    function ListComponent({ data }: {data: any}) {
        return <BillCard bill={data} />
    }

    return (
        <main>
            <ChamberPage
                today={data.today}
                recent={data.recent}
                emptyMessage="The Senate has not taken action on any bills today. Check out the Recent tab to see what bills have been updated recently."
                ListComponent={ListComponent}
            />
        </main>
    )
}