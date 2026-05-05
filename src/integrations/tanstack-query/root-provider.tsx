import { QueryClient } from "@tanstack/react-query";

export function getContext() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 5 * 60 * 1000, // 5 minutes
				gcTime: 5 * 60 * 1000, // 5 minutes
				retry: 1,
			},
		},
	});

	return {
		queryClient,
	};
}
export default function TanstackQueryProvider() {}
