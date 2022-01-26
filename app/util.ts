import { toDate, formatInTimeZone, getTimezoneOffset } from "date-fns-tz";

/**
 * @returns Date string of current date in DC in YYYY-MM-DD format.
 */
export function formatInDC(date: Date = new Date(), format: string = 'yyyy-MM-dd'): string {
    return formatInTimeZone(date, 'America/New_York', format);
}

export function getDateInDC(date: string | number | Date = new Date()): Date {
    return toDate(date, { timeZone: 'America/New_York' });
}

export function getUTCOffsetInDC(date: Date = new Date()) {
    return getTimezoneOffset("America/New_York", date);
}
