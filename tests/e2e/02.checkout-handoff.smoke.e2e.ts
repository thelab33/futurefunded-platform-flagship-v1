import { test, expect, type Page } from '@playwright/test';

async function fillDonationCheckoutForm(page: Page) {
	const amountInput = page.locator('[data-ff-amount-input], input[name="amount"]').first();
	const donorName = page.locator('[data-ff-donor-name], input[name="donorName"]').first();
	const donorEmail = page.locator('[data-ff-email], input[name="donorEmail"]').first();
	const donorMessage = page.locator('[data-ff-message], textarea[name="donorMessage"]').first();

	await expect(amountInput).toBeVisible();
	await amountInput.fill('75');

	await expect(donorName).toBeVisible();
	await donorName.fill('Playwright Donor');

	await expect(donorEmail).toBeVisible();
	await donorEmail.fill('playwright@example.com');

	if (await donorMessage.count()) {
		await donorMessage.fill('Automated checkout smoke test.');
	}
}
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
					return node;
				}
			} catch {}
		}
		await page.waitForTimeout(150);
	}

	throw new Error(`None of the expected selectors became visible:\n${selectors.join('\n')}`);
}

test.describe('checkout handoff', () => {
	test.skip(!process.env.PW_LIVE_CHECKOUT, 'Set PW_LIVE_CHECKOUT=1 to validate checkout handoff.');

	test('campaign donate flow reaches a real checkout handoff', async ({ page }) => {
		const issues = trackClientIssues(page);

		await gotoStable(page, '/c/connect-atx-elite');

		const donateEntry = pick(page, [
			'[data-ff-open-checkout]',
			'[data-ff-donate]',
			'.ff-donate-btn',
			'button:has-text("Donate")'
		]);

		await expect(donateEntry).toBeVisible();
		await expect(donateEntry).toBeEnabled();

		await donateEntry.click();

		await waitForAnyVisible(page, [
			'#ffCheckoutPanel',
			'[data-ff-checkout-panel]',
			'.ff-campaignHero__checkout',
			'[role="dialog"] .ff-btn--primary',
			'.ff-modal .ff-btn--primary'
		]);

		const amountChip = pick(page, [
			'#ffCheckoutPanel .ff-chip--pill',
			'#ffCheckoutPanel .ff-chip--impact',
			'.ff-campaignHero__checkout .ff-chip--pill',
			'.ff-campaignHero__checkout .ff-chip--impact',
			'.ff-campaignHero__checkout .ff-chip',
			'button[data-amount]'
		]);

		if (await amountChip.count()) {
			await amountChip.click();
		}

		await fillDonationCheckoutForm(page);

		const submit = page
			.locator('.ff-campaignHero__checkout button, .ff-campaignHero__checkout a, #ffCheckoutPanel button, #ffCheckoutPanel a')
			.filter({ hasText: 'Donate securely now' })
			.first();

		await expect(submit).toBeVisible();
		await expect(submit).toBeEnabled();

		const requestPromise = page
			.waitForRequest(
				(req) =>
					req.method() === 'POST' &&
					(/\/c\/[^/]+\/checkout/.test(req.url()) || /\/api\/.*checkout/i.test(req.url())),
				{ timeout: 15000 }
			)
			.then(() => 'request')
			.catch(() => null);

		const responsePromise = page
			.waitForResponse(
				(res) =>
					(res.request().method() === 'POST') &&
					(/\/c\/[^/]+\/checkout/.test(res.url()) || /\/api\/.*checkout/i.test(res.url())),
				{ timeout: 15000 }
			)
			.then(() => 'response')
			.catch(() => null);

		const popupPromise = page.waitForEvent('popup', { timeout: 15000 }).then(() => 'popup').catch(() => null);

		const navPromise = page
			.waitForURL(/checkout\.stripe\.com|\/checkout\/success|\/checkout\/cancel/, { timeout: 15000 })
			.then(() => 'navigation')
			.catch(() => null);

		await submit.click();

		const handoff = await Promise.race([requestPromise, responsePromise, popupPromise, navPromise]);

		if (!handoff) {
			const alerts = await page.locator('[role="alert"], .ff-alert, .error, .field-error').allTextContents();
			throw new Error(
				`No checkout handoff detected after submit. Visible alerts: ${alerts.join(' | ') || '(none)'}`
			);
		}

		await expectNoClientIssues(issues);
	});
});
