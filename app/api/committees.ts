import format from "date-fns/format";
import type { TypeChamber } from "~/types/votes";
import { TypeHearing, TypeHearingResponse } from "~/types/committees";

import { request } from "~/api/service";
import { formatInDC, getDateInDC } from "~/util";

export async function getHearingsForDate(chamber: TypeChamber, date: Date): Promise<TypeHearing[]> {
    const dateString = formatInDC(date, 'yyyy-MM-dd');
    let lastDate = dateString;
    let offset = 0;
    let hearings: TypeHearingResponse[] = [];

    while (lastDate === dateString) {
        const json = await request(`/117/committees/hearings.json?offset=${offset}`);

        json.results[0].hearings.forEach((hearing: TypeHearingResponse) => {
            lastDate = hearing.date;

            if (hearing.chamber.toLowerCase() === chamber && hearing.date === dateString) {
                hearings.push(hearing);
            }
        })

        offset += 20;
    }

    return getHearingsFromResponse(hearings);
}

export async function getRecentHearings(chamber: TypeChamber): Promise<TypeHearing[]> {
  const json = await request('/117/committees/hearings.json');
  const hearings: TypeHearingResponse[] = json.results[0].hearings;

  const mostRecentDate = getDateInDC();
  const chamberHearings = hearings.filter(
    (h) => h.chamber.toLowerCase() === chamber
  );
  const recentHearings = chamberHearings.filter(
    (h) => h.date !== format(mostRecentDate, "yyyy-MM-dd")
  );
  const recentPastHearings = recentHearings.filter(
    (hearing) =>
      getDateInDC(hearing.date).getTime() <
      getDateInDC().getTime()
  );

  return getHearingsFromResponse(recentPastHearings);
}

function getHearingsFromResponse(res: TypeHearingResponse[]): TypeHearing[] {
    const hearings: TypeHearing[] = [];

    for (let hearing of res) {
        hearings.push({
            chamber: hearing.chamber.toLowerCase() === 'house' ? 'house' : 'senate',
            committee: {
                name: hearing.committee,
                code: hearing.committee_code,
            },
            timestamp: new Date(`${hearing.date} ${hearing.time}`).toISOString(),
            location: hearing.location,
            description: hearing.description,
            link: hearing.url ?? undefined,
            related: {
                billIds: hearing.bill_ids,
                meetingType: hearing.meeting_type ?? undefined,
            }
        });
    }

    return hearings;
}