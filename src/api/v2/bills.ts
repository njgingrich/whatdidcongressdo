import {z} from 'zod';
import { TypeChamber } from "~/types/votes";
import { PaginationOptions, request } from "./service";
import { BillSchema, BillResponseSchema } from "./schemas/bill";
import { formatInDC } from "~/util";

const CONGRESS = process.env.CONGRESS ?? 118;

async function _getBillsResponse(paginationOptions?: PaginationOptions) {
    const res = await request(`/bill/${CONGRESS}`, paginationOptions);
    const parsed = BillResponseSchema.safeParse(res);

    if (!parsed.success) {
        console.error('Zod error:', parsed.error);
    } else {
        return parsed.data.bills;
    }
}

export async function getBillsForDate(chamber: TypeChamber, date: Date) {
    const formattedDate = formatInDC(date, 'yyyy-MM-dd');
    let responseDate = formattedDate;
    let todayBills: z.infer<typeof BillSchema>[] = [];
    let paginationOptions = {
        limit: 50,
        offset: 0,
    };

    while (responseDate === formattedDate) {
        console.log({formattedDate, responseDate, paginationOptions});
        const bills = await _getBillsResponse(paginationOptions);
        console.log(bills);

        responseDate = bills?.at(-1)?.latestAction.actionDate ?? '';
        paginationOptions.offset += paginationOptions.limit;

        if (bills) {
            todayBills.push(...bills);
        }
    }

    // Filter by date
    todayBills = todayBills.filter(bill => {
        return bill.latestAction.actionDate === formattedDate;
    })

    // Filter by chamber
    return todayBills.filter(bill => {
        return bill.originChamber.toLocaleLowerCase() === chamber.toLocaleLowerCase()
    });
}
