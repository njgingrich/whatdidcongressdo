import {z} from 'zod';

export const BaseResponseSchema = z.object({
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

export const ChamberSchema = z.enum(['House', 'Senate']);
export const ChamberCodeSchema = z.enum(['H', 'S']);