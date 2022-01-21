import { TypeChamber } from "./votes";

export type TypeFloorActionsResponse = {
    results: [
        {
            floor_actions: TypeFloorActionResponse[];
        }
    ]
}

export type TypeFloorActionResponse = {
    congress: string;
    chamber: string;
    timestamp: string;
    date: string;
    action_id: string;
    description: string;
    bill_ids: string[];
};

export type TypeFloorAction = {
    congress: string;
    chamber: TypeChamber;
    timestamp: string;
    description: string;
    related: {
        legislativeDate: string; // YYYY-MM-DD
        actionId: string;
        billIds: string[];
    }
}
