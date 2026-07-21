/**
 * Public operator identity for trust / legal pages.
 * Set VITE_COMPANY_CNPJ and VITE_COMPANY_ADDRESS in .env when available —
 * never invent a CNPJ or street address in source.
 */
export const COMPANY = {
	legalName: "Voyager Tecnologias LTDA",
	email: "voyagertecnologias@gmail.com",
	country: "Brazil",
	region: "Brazil",
	responseSla: "We aim to reply within 2 business days.",
	cnpj: import.meta.env.VITE_COMPANY_CNPJ as string | undefined,
	address: import.meta.env.VITE_COMPANY_ADDRESS as string | undefined,
} as const;
