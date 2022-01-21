import type { TypeChamber } from "~/types/votes";

import mockHouseUpdatedBills from '~/test/cassettes/bills/house_updated.json';
import { EnumBillType, TypeBill, TypeBillResponse } from "~/types/bills";

export function getBillsForDate(chamber: TypeChamber, date: Date) {
    return getBillsFromResponse(mockHouseUpdatedBills.results[0].bills)
}

function getBillsFromResponse(billResponses: TypeBillResponse[]): TypeBill[] {
    const bills: TypeBill[] = [];

    for (let bill of billResponses) {
        bills.push({
            id: bill.bill_id,
            slug: bill.bill_slug,
            type: getBillType(bill),
            number: bill.number,
            title: bill.title,
            shortTitle: bill.short_title,
            active: bill.active,
            sponsor: {
                title: bill.sponsor_title,
                id: bill.sponsor_id,
                name: bill.sponsor_name,
                state: bill.sponsor_state,
                party: bill.sponsor_party,
                cosponsors: bill.cosponsors,
                cosponsors_by_party: bill.cosponsors_by_party,
            },
            committees: bill.committees,
            committeeCodes: bill.committee_codes,
            subcommitteeCodes: bill.subcommittee_codes,
            dates: {
                introduced: bill.introduced_date,
                lastActionDate: bill.latest_major_action_date,
                lastVote: bill.last_vote,
                housePassage: bill.house_passage,
                senatePassage: bill.senate_passage,
                enacted: bill.enacted,
                vetoed: bill.vetoed,
            },
            details: {
                primarySubject: bill.primary_subject,
                summary: bill.summary,
                shortSummary: bill.summary_short,
                link: bill.congressdotgov_url,
                govtrackLink: bill.govtrack_url,
                lastAction: bill.latest_major_action,
            }
        });
    }

    return bills;
}

function getBillType(bill: TypeBillResponse): EnumBillType {
    if (bill.bill_type === 's') return EnumBillType.S;
    if (bill.bill_type === 'sres') return EnumBillType.SRES;
    if (bill.bill_type === 'hr') return EnumBillType.HR;
    if (bill.bill_type === 'hres') return EnumBillType.HRES;

    return EnumBillType.UNKNOWN;
}