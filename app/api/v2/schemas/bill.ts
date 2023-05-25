import {z} from 'zod';
import { BaseResponseSchema, ChamberCodeSchema, ChamberSchema } from './base';


export const BillTypeSchema = z.enum(['HRES', 'SRES', 'HR', 'S', 'HJRES', 'SJRES', 'HCONRES', 'SCONRES']);

export const BillSchema = z.object({
    congress: z.number(),
    latestAction: z.object({
        actionDate: z.coerce.date(),
        actionTime: z.string().optional(),
        text: z.string(),
    }),
    number: z.coerce.string(),
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
