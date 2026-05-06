import * as v from "valibot";

import { QuantitySchema, UnitNameSchema } from "./units";

export const globalSearchSchema = v.object({
	quantity: v.optional(QuantitySchema, "Length"),
	to: v.optional(UnitNameSchema, "Kilometre"),
	from: v.optional(UnitNameSchema, "Meter"),
	fromValue: v.optional(v.string(), "1"),
});

export const defaultSearchParams = v.parse(globalSearchSchema, {});
