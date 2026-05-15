import { createFileRoute, redirect } from "@tanstack/react-router";

import { defaultLocale } from "#/integrations/i18n/load-catalog";
import { defaultSearchParams } from "#/lib/global-params-params";

export const Route = createFileRoute("/")({
	// Pre-load the catalog before the route is even rendered
	beforeLoad({ params, search }) {
		// You could check cookies/localstorage here for a preferred lang
		throw redirect({
			search: { ...defaultSearchParams, ...search },
			params: { ...params, lang: defaultLocale },
			to: "/$lang",
		});
	},
});
