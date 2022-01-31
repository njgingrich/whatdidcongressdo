import format from "date-fns/format";
import type { TypeChamber } from "~/types/votes";
import { EnumBillType, TypeBill, TypeBillResponse } from "~/types/bills";

import { request } from "~/api/service";
import { formatInDC, getDateInDC } from "~/util";

export async function getBillsForDate(
  chamber: TypeChamber,
  date: Date
): Promise<TypeBill[]> {
  const dateString = formatInDC(date, "yyyy-MM-dd");
  let lastDate = date;
  let offset = 0;
  let bills: TypeBillResponse[] = [];

  while (lastDate === date) {
    const json = await request(
      `/117/${chamber}/bills/updated.json?offset=${offset}`
    );

    lastDate = json.results[0].bills[19].last_major_action_date;
    offset += 20;
    bills.push(...json.results[0].bills);
  }

  bills = bills.filter((b) => b.latest_major_action_date === dateString);

  return getBillsFromResponse(bills);
}

export async function getRecentBills(
  chamber: TypeChamber,
  options: {includeToday: boolean} = {includeToday: false}
): Promise<TypeBill[]> {
  const json = await request(`/117/${chamber}/bills/updated.json`);
  let bills: TypeBillResponse[] = json.results[0].bills;

  const today = format(getDateInDC(), "yyyy-MM-dd");
  if (options.includeToday === false) {
    bills = bills.filter((b) => b.latest_major_action_date !== today);
  }

  return getBillsFromResponse(bills);
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
      },
    });
  }

  return bills;
}

function getBillType(bill: TypeBillResponse): EnumBillType {
  if (bill.bill_type === "s") return EnumBillType.S;
  if (bill.bill_type === "sres") return EnumBillType.SRES;
  if (bill.bill_type === "hr") return EnumBillType.HR;
  if (bill.bill_type === "hres") return EnumBillType.HRES;

  return EnumBillType.UNKNOWN;
}
