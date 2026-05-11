import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import {
	defaultLocale,
	isLocaleValid,
	loadCatalog,
} from "#/integrations/i18n/load-catalog";
import { defaultSearchParams } from "#/lib/global-params-params";

export const Route = createFileRoute("/$lang")({
	// Pre-load the catalog before the route is even rendered
	async beforeLoad({ params, search }) {
		const { lang } = params;

		if (!isLocaleValid(lang)) {
			throw redirect({
				search: { ...defaultSearchParams, ...search },
				params: { ...params, lang: defaultLocale },
				to: "/$lang",
			});
		}

		// Load the catalog
		await loadCatalog(lang);
	},
	component: () => <Outlet />, // Simply passes through to children
});
