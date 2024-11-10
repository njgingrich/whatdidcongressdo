import { TypeChamber, TypePartyCode } from "./base";

interface TypeAppBillAction {
    code: string;
    date: Date;
    text: string;
    type: string;
}

interface TypeAppBillAmendment {
    latestAction?: {
        date: Date;
        text: string;
    }
    purpose?: string;
    updateDate: Date;
}

interface TypeAppBillCommittee {
    name: string;
    chamber: TypeChamber;
    code: string;
    activities?: {
        date: Date;
        name: string;
    }[];
}

interface TypeAppBillSponsor {
    bioguideId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    fullName: string;
    party: TypePartyCode;
    state: string;
}

interface TypeAppBillCosponsor {
    bioguideId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    fullName: string;
    party: TypePartyCode;
    state: string;
    isOriginalCosponsor: boolean;
    sponsorshipDate: Date;
}

export interface TypeAppBill {
    actions: TypeAppBillAction[];
    amendments?: TypeAppBillAmendment[];
    committees: TypeAppBillCommittee[];
    cosponsors?: TypeAppBillCosponsor[];
    sponsor: TypeAppBillSponsor;
    title: string;
    code: string; // type + number
    dates: {
        introduction: Date;
        lastAction: Date;
    }
}
