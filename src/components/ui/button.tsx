import { cn } from "#/lib/utils";

type ButtonProps = React.PropsWithChildren<{} & React.ComponentProps<"button">>;

export function Button({ children, className, ...props }: ButtonProps) {
	return (
		<button
			className={cn(
				"bg-primary text-primary-foreground hover:bg-primary/90",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}
