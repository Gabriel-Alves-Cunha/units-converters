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
		context: {},
		routeTree,
		search: {
			strict: false, // If you want certain params to always persist without manually spreading them every time.
		},
		InnerWrap(props) {
			return (
				<StrictMode>
					<PostHogProvider>{props.children}</PostHogProvider>
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
