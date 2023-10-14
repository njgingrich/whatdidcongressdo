import {z} from 'zod';

export const PaginationSchema = z.object({
    count: z.number(),
    next: z.string().url().optional(),
});
export const RequestSchema = z.object({
    congress: z.coerce.string().optional(),
    contentType: z.string(),
    format: z.enum(['json', 'xml']),
});

export const BaseArrayResponseSchema = z.object({
    pagination: PaginationSchema,
    request: RequestSchema,
});

export const BaseSingleResponseSchema = z.object({
    request: RequestSchema,
});

export const DetailSchema = z.object({
    count: z.number(),
    url: z.string().url(),
});

export const ChamberSchema = z.enum(['House', 'Senate']);
export const ChamberCodeSchema = z.enum(['H', 'S']);
export const PartyCodeSchema = z.enum(['R', 'D', 'I']);
