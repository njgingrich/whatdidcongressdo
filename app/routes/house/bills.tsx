import { LoaderFunction, useLoaderData } from "remix";

import {bills} from '~/api';
import BillCard from "~/components/BillCard";
import { TypeBill } from "~/types/bills";

type TypeLoaderData = {
    bills: TypeBill[];
}

export const loader: LoaderFunction = () => {
    const billsForDate = bills.getBillsForDate('house', new Date());

    const data: TypeLoaderData = { bills: billsForDate };
    return data;
}

export default function HouseBillsPage() {
    const data = useLoaderData<TypeLoaderData>();
    return (
        <main>
            <h2 className="chamber-page--header">Bills</h2>
            <ul className="action-card--list">
                {data.bills.map(bill => (
                    <li className="action-card--list__item" key={bill.slug} data-slug={bill.slug}>
                        <BillCard bill={bill} />
                    </li>
                ))}
            </ul>
        </main>
    )
}