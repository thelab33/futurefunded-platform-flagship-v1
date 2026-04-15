import { test, expect } from '@playwright/test';
import { gotoStable, trackClientIssues, expectNoClientIssues } from './helpers/smoke';

const routes = [
	{
		path: '/platform',
		title: /FutureFunded Platform/i,
		minButtons: 2
	},
	{
		path: '/platform/onboarding',
		title: /FutureFunded Onboarding/i,
		minButtons: 2
	},
	{
		path: '/platform/dashboard',
		title: /FutureFunded Dashboard/i,
		minButtons: 2
	},
	{
		path: '/c/connect-atx-elite',
		title: /Connect ATX Elite.*Spring Fundraiser/i,
		minButtons: 3
	}
];

for (const route of routes) {
	test(`${route.path} renders its core shell`, async ({ page }) => {
		const issues = trackClientIssues(page);

		await gotoStable(page, route.path);

		await expect(page).toHaveTitle(route.title);
		await expect(page.locator('main')).toBeVisible();

		const shell = page
			.locator('.ff-appbar__inner, .ff-campaignHeader__shell, #ffTopbar')
			.first();
		await expect(shell).toBeVisible();

		const buttons = page.locator('a.ff-btn, button.ff-btn, [role="button"].ff-btn');
		expect(await buttons.count()).toBeGreaterThanOrEqual(route.minButtons);

		await expectNoClientIssues(issues);
	});
}
