import { formatInTimeZone } from "date-fns-tz";

/**
 * @returns Date string of current date in DC in YYYY-MM-DD format.
 */
export function getDateInDC(format: string = 'yyyy/MM/dd'): string {
    return formatInTimeZone(new Date(), 'America/New_York', format);
}
