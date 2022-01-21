type TypePartyVote = {
  yes: number;
  no: number;
  present: number;
  not_voting: number;
  majority_position?: string;
};

export type TypeParty = 'republican' | 'democratic' | 'independent';

export type TypeChamber = "house" | "senate";

export type TypeVotePosition = "yes" | "no" | "present" | "not_voting";

export type TypeVoteType = "YEA-AND-NAY" | "RECORDED VOTE" | "1/2" | "2/3 YEA-AND-NAY" | "3/5";

export type TypeVoteResponse = {
  congress: number;
  chamber: string;
  session: number;
  roll_call: number;
  source: string;
  url: string;
  vote_uri: string;
  bill?: TypeBillObject;
  amendment?: TypeAmendementObject;
  nomination?: TypeNominationObject;
  question: string;
  question_text?: string;
  description: string;
  vote_type: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM:SS
  result: string;
  republican: TypePartyVote;
  democratic: TypePartyVote;
  independent: TypePartyVote;
  total: TypePartyVote;

  // Senate only
  tie_breaker?: string;
  tie_breaker_vote?: string;
  document_number?: string;
  document_title?: string;
};

export type TypeVoteObject = {
  republican: TypePartyVote;
  democratic: TypePartyVote;
  independent: TypePartyVote;
  total: TypePartyVote;
  tie_breaker?: string;
  tie_breaker_vote?: string;
};

export type TypeBillObject = {
  bill_id: string;
  number: string;
  sponsor_id: string | null; // senate only
  api_uri: string | null;
  title: string | null;
  latest_action: string | null;
};

export type TypeAmendementObject = {};

export type TypeNominationObject = {
  nomination_id: string;
  number: string;
  name: string;
  agency: string;
};

export enum EnumQuestionType {
  CLOTURE_MOTION = 'on_cloture_motion',
  MOTION = 'on_motion',
  NOMINATION = 'on_nomination',
  PASSAGE = 'passage',
  RESOLUTION = 'on_agreeing_to_resolution',
  MOTION_TO_RECOMMIT = 'on_motion_to_recommit',
  AMENDMENT = 'on_agreeing_to_amendment',
  PREVIOUS_QUESTION = 'on_ordering_previous_question',
  UNKNOWN = 'unknown',
};

export type TypeVote = {
  congress: string;
  chamber: TypeChamber;
  voteType: TypeVoteType; // 1/2, 3/5, 2/3
  questionType: EnumQuestionType;
  timestamp: string; // ISO datestring
  related: {
    source: string;
    document_number?: string;
    bill?: TypeBillObject;
    amendment?: TypeAmendementObject;
    nomination?: TypeNominationObject;
  };
  link: string;
  title: string;
  subtitle?: string;
  description: string;
  result: string;
  breakdown: TypeVoteObject;
};