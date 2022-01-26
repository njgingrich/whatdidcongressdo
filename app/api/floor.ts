import format from "date-fns/format";
import type { TypeChamber } from "~/types/votes";
import type { TypeFloorAction, TypeFloorActionResponse } from "~/types/floor";

import { formatInDC, getDateInDC } from "~/util";
import { request } from "./service";

export async function getActionsForDate(
  chamber: TypeChamber,
  date: Date
): Promise<TypeFloorAction[]> {
  const dateString = formatInDC(date, "yyyy/MM/dd");
  let numResults = 20;
  let offset = 0;
  let actions: TypeFloorActionResponse[] = [];

  while (numResults === 20) {
    const json = await request(
      `/${chamber}/floor_updates/${dateString}.json?offset=${offset}`
    );

    numResults = json.results[0].num_results ?? 0;
    offset += 20;
    actions.push(...json.results[0].floor_actions);
  }

  return getActionsFromResponse(actions);
}

export async function getRecentActions(
  chamber: TypeChamber
): Promise<TypeFloorAction[]> {
  const json = await request(`/${chamber}/floor_updates.json`);
  const actions: TypeFloorActionResponse[] = json.results[0].floor_actions;

  const mostRecentDate = format(getDateInDC(), "yyyy-MM-dd");
  const recentActions = actions.filter((a) => a.date !== mostRecentDate);

  return getActionsFromResponse(recentActions);
}

function getActionsFromResponse(
  floor_actions: TypeFloorActionResponse[]
): TypeFloorAction[] {
  const actions: TypeFloorAction[] = [];

  for (let action of floor_actions) {
    actions.push({
      congress: action.congress,
      chamber:
        action.chamber.toLocaleLowerCase() === "house" ? "house" : "senate",
      timestamp: new Date(action.timestamp).toISOString(),
      description: action.description,
      related: {
        legislativeDate: action.date,
        actionId: action.action_id,
        billIds: action.bill_ids,
      },
    });
  }

  return actions.sort((a1, a2) => Date.parse(a2.timestamp) - Date.parse(a1.timestamp));
}
