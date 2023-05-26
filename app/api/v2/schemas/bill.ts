import {number, string, z} from 'zod';
import { BaseResponseSchema, ChamberCodeSchema, ChamberSchema } from './base';


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

export const BillResponseSchema = BaseResponseSchema.extend({
    bills: BillSchema.array().default([]),
});

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

export const BillSummariesResponseSchema = BaseResponseSchema.extend({
    summaries: BillSummarySchema.array().default([]),
});

/*
 * URL: /bill/<congress>/<type>/<number>/cosponsors
*/
export const BillCosponsorSchema = z.object({
    bioguideId: z.string(),
    district: z.number(),
    firstName: z.string(),
    fullName: z.string(),
    lastName: z.string(),
    isOriginalCosponsor: z.boolean(),
    party: z.enum(['R', 'D', 'I']),
    sponsorshipDate: z.string(),
    state: z.string(),
    url: z.string().url(),
});

export const BillCosponsorsResponseSchema = BaseResponseSchema.extend({
    cosponsors: BillCosponsorSchema.array().default([]),
});

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

export const BillTextResponseSchema = BaseResponseSchema.extend({
    textVersions: BillTextSchema.array().default([]),
});
