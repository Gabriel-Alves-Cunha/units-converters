import { createFileRoute, redirect } from "@tanstack/react-router";

import { defaultLocale } from "#/integrations/i18n/load-catalog";
import { defaultSearchParams } from "#/lib/global-params-params";

export const Route = createFileRoute("/")({
	beforeLoad({ search }) {
		redirect({
			search: { ...defaultSearchParams, ...search },
			params: { lang: defaultLocale },
			to: "/$lang",
			replace: true,
		});
	},
});
