import {z} from 'zod';

export const BaseArrayResponseSchema = z.object({
    pagination: z.object({
        count: z.number(),
        next: z.string().url().optional(),
    }),
    request: z.object({
        congress: z.coerce.string().optional(),
        contentType: z.string(),
        format: z.enum(['json', 'xml']),
    })
});

export const BaseSingleResponseSchema = z.object({
    request: z.object({
        congress: z.coerce.string().optional(),
        contentType: z.string(),
        format: z.enum(['json', 'xml']),
    })
});

export const DetailSchema = z.object({
    count: z.number(),
    url: z.string().url(),
});

export const ChamberSchema = z.enum(['House', 'Senate']);
export const ChamberCodeSchema = z.enum(['H', 'S']);
export const PartyCodeSchema = z.enum(['R', 'D', 'I']);
