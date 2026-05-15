import type { ErrorComponentProps } from "@tanstack/react-router";
import {
	ErrorComponent,
	Link,
	rootRouteId,
	useMatch,
	useRouter,
} from "@tanstack/react-router";

import { defaultSearchParams } from "#/lib/global-params-params";
import { Trans } from "@lingui/react/macro";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
	const router = useRouter();
	const isRoot = useMatch({
		select: (state) => state.id === rootRouteId,
		strict: false,
	});

	console.error(error);

	return (
		<div className="min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6">
			<ErrorComponent error={error} />

			<div className="flex gap-2 items-center flex-wrap">
				<button
					onClick={() => {
						router.invalidate();
					}}
					className="px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold"
					type="button"
				>
					<Trans>Try Again</Trans>
				</button>

				{isRoot ? (
					<Link
						className="px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold"
						search={defaultSearchParams}
						to="/"
					>
						Home
					</Link>
				) : (
					<Link
						onClick={(e) => {
							e.preventDefault();
							window.history.back();
						}}
						className="px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold"
						search={defaultSearchParams}
						to="/"
					>
						<Trans>Go Back</Trans>
					</Link>
				)}
			</div>
		</div>
	);
}
