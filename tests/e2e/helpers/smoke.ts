import { expect, type Page } from '@playwright/test';

type ClientIssue = {
	kind: 'console' | 'pageerror';
	text: string;
};

const IGNORED_ERROR_PATTERNS = [
	/favicon\.ico/i,
	/Failed to load resource: the server responded with a status of 404 \(Not Found\)/i,
	/Download the React DevTools/i
];

export function trackClientIssues(page: Page): ClientIssue[] {
	const issues: ClientIssue[] = [];

	page.on('pageerror', (error) => {
		issues.push({
			kind: 'pageerror',
			text: String(error)
		});
	});

	page.on('console', (msg) => {
		if (msg.type() !== 'error') return;
		const text = msg.text();
		if (IGNORED_ERROR_PATTERNS.some((pattern) => pattern.test(text))) return;

		issues.push({
			kind: 'console',
			text
		});
	});

	return issues;
}

export async function gotoStable(page: Page, path: string) {
	await page.goto(path, { waitUntil: 'domcontentloaded' });
	await page.waitForLoadState('networkidle').catch(() => {});
}

export function pick(page: Page, selectors: string[]) {
	return page.locator(selectors.join(', ')).first();
}

export async function expectNoClientIssues(issues: ClientIssue[]) {
	expect.soft(
		issues,
		issues.map((issue) => `[${issue.kind}] ${issue.text}`).join('\n')
	).toEqual([]);
}
