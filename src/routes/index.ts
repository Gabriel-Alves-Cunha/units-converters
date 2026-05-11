import { createFileRoute, redirect } from "@tanstack/react-router";
import { getRequest } from "@tanstack/react-start/server";

import { defaultLocale } from "#/integrations/i18n/load-catalog";
import { defaultSearchParams } from "#/lib/global-params-params";

export const Route = createFileRoute("/")({
	// Pre-load the catalog before the route is even rendered
	beforeLoad({ params, search, context }) {
		// 1. Try Cookies (Works on Server and Client)
		const request = getRequest();

		console.log({ request });

		const cookieHeader = request
			? request.headers.get("Cookie")
			: typeof document !== "undefined"
				? document.cookie
				: "";

		const match = cookieHeader?.match(/i18n_locale=([^;]+)/);
		const cookieLocale = match ? match[1] : null;

		// You could check cookies/localstorage here for a preferred lang
		throw redirect({
			search: { ...defaultSearchParams, ...search },
			params: { ...params, lang: defaultLocale },
			to: "/$lang",
		});
	},
});
