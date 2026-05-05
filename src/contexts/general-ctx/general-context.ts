import { create } from "zustand";
import {
	createJSONStorage,
	persist,
	subscribeWithSelector,
} from "zustand/middleware";

import { createReactSelectors } from "#/contexts/create-zustand-provider";
import { isValidNumber } from "#/lib/utils";

export type GeneralContextData = {
	count: number;
};

const generalContextStoreBase = create(
	persist(
		subscribeWithSelector<GeneralContextData>(
			(_set, _get) => ({ count: Number.NaN }) satisfies GeneralContextData,
		),
		{
			partialize(state) {
				return {
					count: state.count,
				};
			},
			storage: createJSONStorage(() => localStorage),
			name: "general-context",
			version: 0,
		},
	),
);

export const generalContextStore = createReactSelectors(
	generalContextStoreBase,
);

export function useWithGeneralStoreNotebookId() {
	const count = generalContextStore.use.count();

	if (!isValidNumber(count)) {
		throw new Error("count is not a valid number");
	}

	return count;
}
