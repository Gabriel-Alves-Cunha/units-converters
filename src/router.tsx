import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { StrictMode } from "react";

import PostHogProvider from "#/integrations/posthog/provider";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { DefaultCatchBoundary } from "./components/default-catch-boundary";
import { getContext } from "./integrations/tanstack-query/root-provider";
import { NotFound } from "./components/not-found";
import { routeTree } from "./routeTree.gen";
import { FallbackLoader } from "./components/default-suspense-and-error-boundary";

export function getRouter() {
	const context = getContext();

	const router = createTanStackRouter({
		defaultPreloadStaleTime: 0,
		defaultPreload: "intent",
		scrollRestoration: true,
		routeTree,
		context,
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
			<FallbackLoader fallbackText="Loading..." fallbackFor="root" />
		),
		defaultNotFoundComponent: () => <NotFound />,
		defaultErrorComponent: DefaultCatchBoundary,
		defaultPendingMinMs: 200,
		defaultPendingMs: 0,
	});

	setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient });

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
