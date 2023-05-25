import { TypeChamber } from "~/types/votes";
import { request } from "./service";
import { BillResponseSchema } from "./schemas/bill";

const CONGRESS = process.env.CONGRESS ?? 118;

async function _getBillsResponse() {
    const res = await request(`/bill/${CONGRESS}`);
    const parsed = BillResponseSchema.safeParse(res);

    if (!parsed.success) {
        console.error('Zod error', parsed.error);
    } else {
        return parsed.data.bills;
    }
}

export async function getBills(chamber: TypeChamber) {
    const bills = await _getBillsResponse();
    if (!bills) return [];

    return bills.filter(bill => {
        return bill.originChamber.toLocaleLowerCase() === chamber.toLocaleLowerCase()
    });
}
