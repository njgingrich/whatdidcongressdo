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

/**
 * Get a Date instance (AKA a date you should NOT use for time). Adds TZ offset to date
 * so when locally parsed it returns the expected date.
 * 
 * Ex: getDate('2024-11-08') -> Date (Fri Nov 08 2024 00:00:00 GMT-0600)
 * @param date 
 */
export function getDate(date: Date = new Date()) {
    const tzOffset = date.getTimezoneOffset();
    return new Date(date.getTime() + tzOffset * 60 * 1000);
}
