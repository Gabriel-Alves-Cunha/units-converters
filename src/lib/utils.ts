import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isValidNumber(value: unknown): value is number {
	return value === 0 ? true : Number.isFinite(value || undefined);
}

export function isRecord(obj: unknown): obj is Record<string, unknown> {
	return typeof obj === "object" && obj !== null;
}

export function noop(): any {}

export function identity<In, Out = In>(value: In) {
	return value as unknown as Out;
}

export function sleep(ms: number) {
	return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

const UNITS = ["bytes", "kB", "MB", "GB", "TB", "PB"] as const;
const MATH_LOG_1024 = Math.log(1024);
export function prettyBytes(bytes: number) {
	if (!isValidNumber(bytes)) return "-";

	const number = Math.floor(Math.log(bytes) / MATH_LOG_1024);

	return `${(bytes / Math.pow(1024, Math.floor(number))).toFixed(2)} ${UNITS[number]}`;
}

export function getFirstKeyOfRecord<T extends Record<string, unknown>>(
	record: T,
): keyof T | undefined {
	for (const key in record) {
		return key;
	}

	return undefined;
}
