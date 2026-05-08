import * as v from "valibot";

import { QuantitySchema, UnitNameSchema } from "./units";

export const globalParamsSchema = v.object({
	quantity: v.optional(QuantitySchema, "Length"),
	to: v.optional(UnitNameSchema, "Kilometre"),
	from: v.optional(UnitNameSchema, "Meter"),
});

export const globalSearchParamsSchema = v.object({
	fromValue: v.optional(v.string(), "1"),
});

export const defaultSearchParams = v.parse(globalSearchParamsSchema, {});
export const defaultParams = v.parse(globalParamsSchema, {});
