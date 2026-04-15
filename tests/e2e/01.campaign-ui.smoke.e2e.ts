import { test, expect, type Page } from '@playwright/test';
import {
	gotoStable,
	trackClientIssues,
	expectNoClientIssues,
	pick
} from './helpers/smoke';

async function waitForAnyVisible(page: Page, selectors: string[], timeout = 8000) {
	const deadline = Date.now() + timeout;

	while (Date.now() < deadline) {
		for (const selector of selectors) {
			const node = page.locator(selector).first();
			try {
				if ((await node.count()) > 0 && (await node.isVisible())) {
					return selector;
				}
			} catch {}
		}
		await page.waitForTimeout(150);
	}

	throw new Error(`None of the expected selectors became visible:\n${selectors.join('\n')}`);
}

test('theme toggle flips the page theme on platform', async ({ page }) => {
	const issues = trackClientIssues(page);

	await gotoStable(page, '/platform');

	const html = page.locator('html');
	const toggle = pick(page, [
		'button:has-text("Theme")',
		'[aria-label*="theme" i]',
		'.ff-themeToggle',
		'.ff-iconbtn:has-text("Theme")'
	]);

	await expect(toggle).toBeVisible();

	const before = await html.getAttribute('data-theme');
	await toggle.click();

	await expect
		.poll(async () => await html.getAttribute('data-theme'))
		.not.toBe(before);

	await expectNoClientIssues(issues);
});

test('campaign page exposes flagship conversion controls', async ({ page }) => {
	const issues = trackClientIssues(page);

	await gotoStable(page, '/c/connect-atx-elite');

	await expect(page.locator('#heroTitle, .ff-heroTitle').first()).toBeVisible();
	await expect(page.locator('.ff-campaignHeader__goal, .ff-topbarGoal').first()).toBeVisible();
	await expect(page.locator('.ff-campaignHero__checkout').first()).toBeVisible();

	const donate = pick(page, [
		'[data-ff-open-checkout]',
		'[data-ff-donate]',
		'.ff-donate-btn',
		'button:has-text("Donate")'
	]);
	const sponsor = pick(page, [
		'[data-ff-open-sponsor]',
		'button:has-text("Sponsor")',
		'a:has-text("Sponsor")'
	]);
	const share = pick(page, [
		'[data-ff-share]',
		'button:has-text("Share")'
	]);

	await expect(donate).toBeVisible();
	await expect(donate).toBeEnabled();
	await expect(sponsor).toBeVisible();
	await expect(sponsor).toBeEnabled();
	await expect(share).toBeVisible();
	await expect(share).toBeEnabled();

	const amountChoices = page.locator(
		'.ff-campaignHero__checkout .ff-chip, .ff-campaignHero__checkout .ff-chip--pill, .ff-campaignHero__checkout .ff-chip--impact'
	);
	expect(await amountChoices.count()).toBeGreaterThan(0);

	await sponsor.click();

	await waitForAnyVisible(page, [
		'[role="dialog"]',
		'dialog[open]',
		'.ff-modal',
		'.ff-drawer',
		'#ffSponsorModal',
		'#ffSponsorDrawer',
		'[data-ff-sponsor-surface]',
		'[data-ff-sponsor-form]',
		'form:has(input[type="email"])',
		'input[name="sponsorBusiness"]',
		'input[name="business"]',
		'input[name="sponsorEmail"]',
		'input[type="email"]'
	]);

	await expectNoClientIssues(issues);
});
