import z from 'zod';
import {ChamberSchema, PartyCodeSchema} from '~/api/v2/schemas/base';

export type TypeChamber = z.infer<typeof ChamberSchema>;
export type TypePartyCode = z.infer<typeof PartyCodeSchema>;