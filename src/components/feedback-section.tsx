import { useState } from "react";

export function FeedbackSection() {
	const [isSending, setIsSending] = useState(false);

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();

		if (isSending) {
			return;
		}

		const formData = new FormData(e.currentTarget);

		const description = formData.get("description") as string;

		if (!description) {
			return;
		}

		try {
			setIsSending(true);

			// Replace with your chosen service endpoint
			const response = await fetch("https://formspree.io/f/your-id", {
				headers: { Accept: "application/json" },
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				alert("Thanks for the feedback!");
				(e.target as HTMLFormElement).reset();
			}

			e.currentTarget.reset();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<form className="converter-content h-[50svh]" onSubmit={handleSubmit}>
			<div className="mb-10 text-center mobile:mt-4 px-4">
				<h5 className="text-2xl font-bold text-foreground">
					How could this website improve?
				</h5>

				<p className="text-muted-foreground">
					Describe your issue and we'll get back to you as soon as possible.
				</p>

				<p className="text-xs text-muted-foreground mt-1">
					Support email:{" "}
					<a className="link" href="mailto:team@">
						team@
					</a>
				</p>
			</div>

			<fieldset className="data-[invalid=true]:text-destructive gap-3 flex w-full flex-col *:w-full">
				<label
					className="text-sm font-medium w-fit gap-2 leading-snug"
					htmlFor="description"
				>
					Description
				</label>

				<textarea
					className="flex field-sizing-content w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 min-h-44"
					placeholder="Please provide as much detail as possible…"
					name="description"
					id="description"
					required
				/>
			</fieldset>

			<button
				className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
				disabled={isSending}
				type="submit"
			>
				{isSending ? "Sending..." : "Submit Feedback"}
			</button>
		</form>
	);
}
