import { formatInTimeZone } from "date-fns-tz";

let dcOptions = {
  timeZone: "America/New_York",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

/**
 * @returns Date string of current date in DC in YYYY-MM-DD format.
 */
export function getDateInDC(): string {
    return formatInTimeZone(new Date(), 'America/New_York', 'yyyy/MM/dd');
}
