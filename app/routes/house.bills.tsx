import { useLoaderData } from "@remix-run/react";

import {bills} from '~/api';
import BillCard from "~/components/BillCard";
import { TypeBill } from "~/types/bills";
import { getDateInDC } from "~/util";

import ChamberPage from "~/components/ChamberPage";
import { getBillsForDate } from "~/api/v2/bills";

type TypeLoaderData = {
    today: TypeBill[];
    recent: TypeBill[];
    test: any;
}

export const loader = async () => {
    const test = await getBillsForDate('house', new Date());

    const data: TypeLoaderData = {
        today: await bills.getBillsForDate('house', getDateInDC()),
        recent: await bills.getRecentBills('house'),
        test,
    };
    return data;
}

export default function HouseBillsPage() {
    const data = useLoaderData<TypeLoaderData>();
    console.log(data.test);

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