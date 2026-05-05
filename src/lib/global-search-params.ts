import z from "zod";

import { QuantitySchema, UnitNameSchema } from "./units";

export const globalSearchSchema = z.object({
	quantity: QuantitySchema.optional().default("Length"),
	to: UnitNameSchema.optional().default("Kilometre"),
	from: UnitNameSchema.optional().default("Meter"),
	fromValue: z.string().optional().default("1"),
});

export const defaultSearchParams = globalSearchSchema.parse({});
