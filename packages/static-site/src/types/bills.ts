export type TypeBillResponse = {
  bill_id: string;
  bill_slug: string;
  bill_type: string;
  number: string;
  bill_uri: string;
  title: string;
  short_title: string;
  sponsor_title: string;
  sponsor_id: string;
  sponsor_name: string;
  sponsor_state: string;
  sponsor_party: string;
  sponsor_uri: string;
  gpo_pdf_uri: string | null;
  congressdotgov_url: string;
  govtrack_url: string;
  introduced_date: string; // YYYY-MM-DD
  active: boolean;
  last_vote: string | null; // YYYY-MM-DD
  house_passage: string | null; // YYYY-MM-DD
  senate_passage: string | null; // YYYY-MM-DD
  enacted: string | null; // YYYY-MM-DD
  vetoed: string | null; // YYYY-MM-DD
  cosponsors: number;
  cosponsors_by_party: {
    R?: number;
    D?: number;
    ID?: number;
  }
  committees: string;
  committee_codes: string[];
  subcommittee_codes: string[];
  primary_subject: string;
  summary: string;
  summary_short: string;
  latest_major_action_date: string; // YYYY-MM-DD
  latest_major_action: string;
};

export enum EnumBillType {
  HR = "hr",
  HRES = "hres",
  SRES = "sres",
  S = "s",
  UNKNOWN = "unknown",
}

export type TypeBill = {
  id: string;
  slug: string;
  type: EnumBillType;
  number: string;
  title: string;
  shortTitle: string;
  active: boolean;
  sponsor: {
    title: string;
    id: string;
    name: string;
    state: string;
    party: string;
    cosponsors: number;
    cosponsors_by_party: {
      R?: number;
      D?: number;
      ID?: number;
    };
  };
  committees: string;
  committeeCodes: string[];
  subcommitteeCodes: string[];
  dates: {
    introduced: string;
    lastActionDate: string;
    lastVote: string | null;
    housePassage: string | null;
    senatePassage: string | null;
    enacted: string | null;
    vetoed: string | null;
  };
  details: {
    primarySubject: string;
    summary: string;
    shortSummary: string;
    link: string;
    govtrackLink: string;
    lastAction: string;
  };
};