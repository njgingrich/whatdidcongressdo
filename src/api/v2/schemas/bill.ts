import {number, z} from 'zod';
import { BaseArrayResponseSchema, BaseSingleResponseSchema, ChamberCodeSchema, ChamberSchema, DetailSchema, PaginationSchema, PartyCodeSchema } from './base';


export const BillTypeSchema = z.enum(['HRES', 'SRES', 'HR', 'S', 'HJRES', 'SJRES', 'HCONRES', 'SCONRES']);

/*
 * URL: /bill/<congress>
*/
export const BillSchema = z.object({
    congress: z.number(),
    latestAction: z.object({
        actionDate: z.string(),
        actionTime: z.string().optional(),
        text: z.string(),
    }),
    number: z.string(),
    originChamber: ChamberSchema,
    originChamberCode: ChamberCodeSchema,
    title: z.string(),
    type: BillTypeSchema,
    updateDate: z.coerce.date(),
    updateDateIncludingText: z.coerce.date(),
    url: z.string().url(),
});

export const BillResponseSchema = BaseArrayResponseSchema.extend({
    bills: BillSchema.array().default([]),
});

/*
 * URL: /bill/<congress>/<type>/<number>
*/

const SingleBillSponsorSchema = z.object({
    bioguideId: z.string(),
    district: z.number().optional(),
    firstName: z.string(),
    fullName: z.string(),
    lastName: z.string(),
    isByRequest: z.string(), // enum ['N', 'Y'] ?
    party: PartyCodeSchema,
    state: z.string(),
    url: z.string().url(),
});

export const SingleBillSchema = z.object({
    actions: DetailSchema,
    amendments: DetailSchema.optional(),
    cboCostEstimates: z.object({
        description: z.string(),
        pubDate: z.coerce.date(),
        title: z.string(),
        url: z.string().url(),
    }).array().optional(),
    committees: DetailSchema.optional(),
    congress: z.number(),
    constitutionalAuthorityStatementText: z.string().optional(),
    cosponsors: DetailSchema.extend({
        countIncludingWithdrawnCosponsors: z.number(),
    }).optional(),
    introducedDate: z.coerce.date(),
    latestAction: z.object({
        actionDate: z.string(),
        actionTime: z.string().optional(),
        text: z.string(),
    }),
    number: z.string(),
    originChamber: ChamberSchema,
    policyArea: z.object({
        name: z.string(),
    }).optional(),
    relatedBills: DetailSchema.optional(),
    sponsors: SingleBillSponsorSchema.array().default([]),
    subjects: DetailSchema.optional(),
    summaries: DetailSchema.optional(),
    textVersions: DetailSchema.optional(),
    title: z.string(),
    titles: DetailSchema,
    type: BillTypeSchema,
    updateDate: z.coerce.date(),
    updateDateIncludingText: z.coerce.date(),
});

export type TypeDetailSchemaKey = keyof Pick<z.infer<typeof SingleBillSchema>, 'actions' | 'committees' | 'committees' | 'cosponsors' | 'relatedBills' | 'subjects' | 'summaries' | 'textVersions' | 'titles'>;

export const SingleBillResponseSchema = BaseSingleResponseSchema.extend({
    bill: SingleBillSchema,
});

/*
 * URL: /bill/<congress>/<type>/<number>/actions
*/

export const BillActionSchema = z.object({
    actionCode: z.string(),
    actionDate: z.coerce.date(),
    sourceSystem: z.object({
        code: z.number(),
        name: z.string(),
    }),
    text: z.string(),
    type: z.string(),
});

export const BillActionsDetailSchema = z.object({
    actions: BillActionSchema.array().default([]),
})
export const BillActionsResponseSchema = BaseArrayResponseSchema.merge(BillActionsDetailSchema);

/*
 * URL: /bill/<congress>/<type>/<number>/amendments
*/

export const BillAmendmentSchema = z.object({
    congress: z.number(),
    latestAction: z.object({
        actionDate: z.coerce.date(),
        text: z.string(),
    }).optional(),
    number: z.string(),
    purpose: z.string().optional(),
    type: z.string(),
    updateDate: z.coerce.date(),
    url: z.string().url(),
});

export const BillAmendmentsDetailSchema = z.object({
    amendments: BillAmendmentSchema.array().default([]),
})
export const BillAmendmentsResponseSchema = BaseArrayResponseSchema.merge(BillAmendmentsDetailSchema);

/*
 * URL: /bill/<congress>/<type>/<number>/committees
*/

export const BillCommitteeSchema = z.object({
    activities: z.object({
        date: z.coerce.date(),
        name: z.string(),
    }).array().default([]),
    chamber: ChamberSchema,
    name: z.string(),
    systemCode: z.string(),
    type: z.string(),
    url: z.string().url(),
});

export const BillCommitteesDetailSchema = z.object({
    committees: BillCommitteeSchema.array().default([]),
})
export const BillCommitteesResponseSchema = BaseSingleResponseSchema.merge(BillCommitteesDetailSchema);

/*
 * URL: /bill/<congress>/<type>/<number>/cosponsors
*/
export const BillCosponsorSchema = z.object({
    bioguideId: z.string(),
    district: z.number().optional(),
    firstName: z.string(),
    fullName: z.string(),
    lastName: z.string(),
    isOriginalCosponsor: z.boolean(),
    party: PartyCodeSchema,
    sponsorshipDate: z.string(),
    state: z.string(),
    url: z.string().url(),
});

export const BillCosponsorsDetailSchema = z.object({
    cosponsors: BillCosponsorSchema.array().default([]),
})
export const BillCosponsorsResponseSchema = BaseArrayResponseSchema.merge(BillCosponsorsDetailSchema);

/*
 * URL: /bill/<congress>/<type>/<number>/relatedbills
*/
export const BillRelatedBillSchema = z.object({
    congress: z.number(),
    latestAction: z.object({
        actionDate: z.coerce.date(),
        text: z.string(),
    }),
    number: z.number(),
    relationshipDetails: z.object({
        identifiedBy: z.string(),
        type: z.string(),
    }).array().default([]),
    title: z.string(),
    type: BillTypeSchema,
    url: z.string().url(),
});

export const BillRelatedBillsDetailSchema = z.object({
    relatedBills: BillRelatedBillSchema.array().default([]),
})
export const BillRelatedBillsResponseSchema = BaseArrayResponseSchema.merge(BillRelatedBillsDetailSchema);

/*
 * URL: /bill/<congress>/<type>/<number>/subjects
*/
export const BillSubjectSchema = z.object({
    legislativeSubjects: z.object({
        name: z.string(),
    }).array().default([]),
    policyArea: z.object({
        name: z.string(),
    }),
});

export const BillSubjectsDetailSchema = z.object({
    subjects: BillSubjectSchema,
})
export const BillSubjectsResponseSchema = BaseArrayResponseSchema.merge(BillSubjectsDetailSchema);

/*
 * URL: /bill/<congress>/<type>/<number>/summaries
*/
export const BillSummarySchema = z.object({
    actionDate: z.string(),
    actionDesc: z.string(),
    text: z.string(),
    updateDate: z.coerce.date(),
    versionCode: z.string(),
});

export const BillSummariesDetailSchema = z.object({
    summaries: BillSummarySchema.array().default([]),
})
export const BillSummariesResponseSchema = BaseArrayResponseSchema.merge(BillSummariesDetailSchema);

/*
 * URL: /bill/<congress>/<type>/<number>/text
*/
const BillTextFormatSchema = z.object({
    type: z.enum(['Formatted Text', 'PDF', 'Formatted XML']),
    url: z.string().url(),
});

export const BillTextSchema = z.object({
    date: z.nullable(z.coerce.date()),
    formats: BillTextFormatSchema.array().default([]),
    type: z.nullable(z.string()), 
});

export const BillTextDetailSchema = z.object({
    textVersions: BillTextSchema.array().default([]),
})
export const BillTextResponseSchema = BaseArrayResponseSchema.merge(BillTextDetailSchema);

/*
 * URL: /bill/<congress>/<type>/<number>/titles
*/
export const BillTitleSchema = z.object({
    billTextVersionCode: z.string().optional(),
    billTextVersionName: z.string().optional(),
    chamberCode: ChamberCodeSchema.optional(),
    chamberName: ChamberSchema.optional(),
    title: z.string(),
    titleType: z.string(),
});

export const BillTitlesDetailSchema = z.object({
    titles: BillTitleSchema.array().default([]),
})
export const BillTitlesResponseSchema = BaseArrayResponseSchema.merge(BillTitlesDetailSchema);

// The full schema after making additional requests from the base SingleBillSchema
export const FullSingleBillSchema = SingleBillSchema.extend({
    actions: DetailSchema.extend({
        data: BillActionsDetailSchema,
    }),
    amendments: DetailSchema.extend({
        data: BillAmendmentsDetailSchema.optional(),
    }).optional(),
    committees: DetailSchema.extend({
        data: BillCommitteesDetailSchema,
    }).optional(),
    cosponsors: DetailSchema.extend({
        countIncludingWithdrawnCosponsors: z.number(),
        data: BillCosponsorsDetailSchema,
    }).optional(),
    relatedBills: DetailSchema.extend({
        data: BillRelatedBillsDetailSchema,
    }).optional(),
    subjects: DetailSchema.extend({
        data: BillSubjectsDetailSchema,
    }).optional(),
    summaries: DetailSchema.extend({
        data: BillSummariesDetailSchema,
    }).optional(),
    textVersions: DetailSchema.extend({
        data: BillTextDetailSchema,
    }).optional(),
    titles: DetailSchema.extend({
        data: BillTitlesDetailSchema,
    }),
});

export type TypeBill = NonNullable<z.infer<typeof FullSingleBillSchema>>;