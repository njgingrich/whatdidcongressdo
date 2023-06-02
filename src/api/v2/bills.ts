import {ZodSchema, z} from 'zod';
import asyncPool from 'tiny-async-pool';

import { TypeChamber } from "~/types/votes";
import { PaginationOptions, apiPath, request } from "./service";
import { BillSchema, BillResponseSchema, SingleBillResponseSchema, TypeDetailSchemaKey, BillActionsResponseSchema, BillCommitteesResponseSchema, BillCosponsorsResponseSchema, BillRelatedBillsResponseSchema, BillSummariesResponseSchema, BillTextResponseSchema, BillSubjectsResponseSchema } from "./schemas/bill";
import { formatInDC } from "~/util";

const CONGRESS = process.env.CONGRESS ?? 118;

async function asyncPoolAll<IN, OUT>(...args: Parameters<typeof asyncPool<IN, OUT>>) {
  const results = [];
  for await (const result of asyncPool(...args)) {
    results.push(result);
  }
  return results;
}

async function _getBillsResponse(paginationOptions?: PaginationOptions) {
    const res = await request(`/bill/${CONGRESS}`, {pagination: paginationOptions});
    const parsed = BillResponseSchema.safeParse(res);

    if (!parsed.success) {
        console.error('Zod error:', parsed.error);
    } else {
        return parsed.data.bills;
    }
}

export async function getBillsForDate(chamber: TypeChamber, date: Date) {
    const formattedDate = '2023-05-25'; // formatInDC(date, 'yyyy-MM-dd');
    let responseDate = formattedDate;
    let todayBills: z.infer<typeof BillSchema>[] = [];
    let paginationOptions = {
        limit: 1,
        // offset: 0,
        offset: 200,
    };

    console.info(`Fetching bills for ${formattedDate}`);
    while (responseDate === formattedDate && todayBills.length < 1) {
        const bills = await _getBillsResponse(paginationOptions);

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
    todayBills = todayBills.filter(bill => {
        return bill.originChamber.toLocaleLowerCase() === chamber.toLocaleLowerCase()
    });

    console.log('asyncing:', todayBills.length, 'items');
    return asyncPoolAll(10, todayBills, getBillData);
}

const DETAIL_PROPERTIES: TypeDetailSchemaKey[] = ['actions', 'committees', 'cosponsors', 'relatedBills', 'subjects', 'summaries', 'textVersions', 'titles'];
const DetailSchemaMap: Record<TypeDetailSchemaKey, ZodSchema> = {
    actions: BillActionsResponseSchema,
    committees: BillCommitteesResponseSchema,
    cosponsors: BillCosponsorsResponseSchema,
    relatedBills: BillRelatedBillsResponseSchema,
    subjects: BillSubjectsResponseSchema,
    summaries: BillSummariesResponseSchema,
    textVersions: BillTextResponseSchema,
    titles: BillTextResponseSchema,
} 
export async function getBillData(bill: z.infer<typeof BillSchema>) {
    const res = await request(apiPath(bill.url), {cache: true});
    const parsed = SingleBillResponseSchema.safeParse(res);
    
    if (!parsed.success) {
        console.error(`Error when parsing ${apiPath(bill.url)}:`, parsed.error);
        return;
    }

    // Get the different attributes
    const urls: string[] = [];
    for (let property of DETAIL_PROPERTIES) {
        const url = parsed.data.bill[property]?.url;
        if (url !== undefined) {
            urls.push(url);
        }
    }

    const [actions, committees] = await asyncPoolAll(5, urls, (url) => request(apiPath(url), {cache: true}));

    const singleBill = parsed.data.bill;
    const combined = Object.assign({}, singleBill, {actions, committees});

    return singleBill;
}
