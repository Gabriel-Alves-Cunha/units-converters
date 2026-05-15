import { I18nGlobalProvider } from "#/integrations/i18n/i18n-global-provider";
import { i18n } from "@lingui/core";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { StrictMode } from "react";

import PostHogProvider from "#/integrations/posthog/provider";
import { DefaultCatchBoundary } from "./components/default-catch-boundary";
import { FallbackLoader } from "./components/default-suspense-and-error-boundary";
import { NotFound } from "./components/not-found";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const router = createTanStackRouter({
		defaultPreloadStaleTime: 0,
		defaultPreload: "intent",
		scrollRestoration: true,
		routeTree,
		search: {
			strict: false, // If you want certain params to always persist without manually spreading them every time.
		},
		context: {
			i18n,
		},
		Wrap(props) {
			return (
				<StrictMode>
					<I18nGlobalProvider i18n={i18n}>
						<PostHogProvider>{props.children}</PostHogProvider>
					</I18nGlobalProvider>
				</StrictMode>
			);
		},
		defaultPendingComponent: () => (
			<FallbackLoader fallbackText="Loading…" fallbackFor="root" />
		),
		defaultNotFoundComponent: () => <NotFound />,
		defaultErrorComponent: DefaultCatchBoundary,
		defaultPendingMinMs: 200,
		defaultPendingMs: 0,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
