import type { TypeChamber } from "~/types/votes";

import mockRecentHearings from '~/test/cassettes/committees/house_recent_hearings.json';
import { TypeHearing, TypeHearingResponse } from "~/types/committees";

export function getHearingsForDate(chamber: TypeChamber, date: Date) {
    return getHearingsFromResponse(mockRecentHearings.results[0].hearings);
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