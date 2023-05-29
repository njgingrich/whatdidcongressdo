import { TypeChamber } from "./votes";

export type TypeHearingResponse = {
  chamber: string;
  committee: string;
  committee_code: string;
  api_uri: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM:SS
  location: string;
  description: string;
  bill_ids: string[];
  url: string;
  meeting_type: string;
};

export type TypeCommittee = {
  name: string;
  code: string;
};

export type TypeHearing = {
  chamber: TypeChamber;
  committee: TypeCommittee;
  timestamp: string; // ISO
  location: string;
  description: string;
  link?: string;
  related: {
    billIds: string[];
    meetingType?: string;
  };
};
