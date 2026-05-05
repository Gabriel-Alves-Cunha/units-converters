import { Link } from "@tanstack/react-router";

import { Button } from "./ui/button";
import { defaultSearchParams } from "#/lib/global-search-params";

export function NotFound({ children }: React.PropsWithChildren) {
	return (
		<div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
			<div className="px-4py-8 flex flex-col items-center justify-center justify-self-center text-center">
				<h2 className="text-base-content mb-6 text-5xl font-semibold">
					Whoops!
				</h2>

				<h3 className="text-base-content mb-1.5 text-3xl font-semibold">
					Something went wrong
				</h3>
				{children ?? (
					<p className="text-base-content mb-6 max-w-sm">
						The page you&apos;re looking for isn&apos;t found, we suggest you
						back to home.
					</p>
				)}

				<div className="grid grid-cols-2 gap-2">
					<Button onClick={() => window.history.back()}>Go back</Button>

					<Button variant="outline">
						<Link search={defaultSearchParams} to="/">
							Back to home page
						</Link>
					</Button>
				</div>
			</div>

			<div className="relative max-h-screen w-full p-2 max-lg:hidden">
				<img
					src="https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/404/error-5.png"
					className="h-full w-full rounded-2xl"
					alt="404 background"
				/>

				<img
					className="absolute top-1/2 left-1/2 h-[clamp(300px,40vw,477px)] -translate-x-[42%] -translate-y-1/2"
					src="https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/404/error-6.png"
					alt="404 illustration"
				/>
			</div>
		</div>
	);
}
