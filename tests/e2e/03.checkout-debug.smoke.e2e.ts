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
import { gotoStable, pick } from './helpers/smoke';

test('debug checkout path', async ({ page }) => {
	const requests: string[] = [];
	const responses: string[] = [];
	const consoleErrors: string[] = [];
	const pageErrors: string[] = [];

	page.on('request', (req) => {
		requests.push(`${req.method()} ${req.url()}`);
	});

	page.on('response', (res) => {
		responses.push(`${res.status()} ${res.request().method()} ${res.url()}`);
	});

	page.on('console', (msg) => {
		if (msg.type() === 'error') consoleErrors.push(msg.text());
	});

	page.on('pageerror', (err) => {
		pageErrors.push(String(err));
	});

	await gotoStable(page, '/c/connect-atx-elite');

	const donateEntry = pick(page, [
		'[data-ff-open-checkout]',
		'[data-ff-donate]',
		'.ff-donate-btn',
		'button:has-text("Donate")'
	]);

	await expect(donateEntry).toBeVisible();
	await expect(donateEntry).toBeEnabled();

	console.log('\n== URL BEFORE ENTRY ==');
	console.log(page.url());

	await donateEntry.click();

	await page.waitForTimeout(800);

	const checkoutSurface = pick(page, [
		'#ffCheckoutPanel',
		'[data-ff-checkout-panel]',
		'.ff-campaignHero__checkout',
		'.ff-modal',
		'.ff-drawer'
	]);

	await expect(checkoutSurface).toBeVisible();

	const buttonTexts = await checkoutSurface.locator('button, a.ff-btn, button.ff-btn').allTextContents();
	console.log('\n== CHECKOUT BUTTONS ==');
	console.log(buttonTexts);

	const amountTexts = await checkoutSurface.locator('.ff-chip, .ff-chip--pill, .ff-chip--impact').allTextContents();
	console.log('\n== AMOUNT CHOICES ==');
	console.log(amountTexts);

	const amountChip = pick(page, [
		'#ffCheckoutPanel .ff-chip--pill',
		'#ffCheckoutPanel .ff-chip--impact',
		'.ff-campaignHero__checkout .ff-chip--pill',
		'.ff-campaignHero__checkout .ff-chip--impact',
		'.ff-campaignHero__checkout .ff-chip'
	]);

	if (await amountChip.count()) {
		await amountChip.click();
		await page.waitForTimeout(400);
	}

	await fillDonationCheckoutForm(page);

	const formValidity = await page.locator('[data-ff-checkout-form="true"], #donationForm, .ff-campaignHero__checkout form').first().evaluate((form) => {
		const f = form as HTMLFormElement;
		const elements = Array.from(f.elements).map((el) => {
			const field = el as HTMLInputElement | HTMLTextAreaElement;
			return {
				name: field.name || field.getAttribute('data-ff-field') || field.tagName,
				value: 'value' in field ? field.value : '',
				valid: typeof field.checkValidity === 'function' ? field.checkValidity() : true,
				validationMessage: 'validationMessage' in field ? field.validationMessage : ''
			};
		});
		return {
			formValid: f.checkValidity(),
			elements
		};
	});

	const submit = page
	.locator('.ff-campaignHero__checkout button, .ff-campaignHero__checkout a, #ffCheckoutPanel button, #ffCheckoutPanel a')
	.filter({ hasText: 'Donate securely now' })
	.first();

	await expect(submit).toBeVisible();

		const donateControlsHtml = await page
		.locator('.ff-campaignHero__checkout button, .ff-campaignHero__checkout a, #ffCheckoutPanel button, #ffCheckoutPanel a')
		.filter({ hasText: 'Donate securely now' })
		.evaluateAll((nodes) => nodes.map((n) => (n as HTMLElement).outerHTML));

	console.log('\n== DONATE CONTROL HTML ==');
	console.log(donateControlsHtml);

console.log('\n== SUBMIT BUTTON ==');
	console.log('text=', await submit.textContent());
	console.log('disabled=', await submit.isDisabled());

		console.log('\n== FORM VALIDITY ==');
	console.log(formValidity);

console.log('\n== URL BEFORE SUBMIT ==');
	console.log(page.url());

	await submit.click({ force: true });

	await page.waitForTimeout(3000);

		const checkoutRootState = await checkoutSurface.getAttribute('data-ff-checkout-state');
	const submitState = await submit.getAttribute('data-ff-checkout-state');

	console.log('\n== CHECKOUT ROOT STATE ==');
	console.log(checkoutRootState);

	console.log('\n== SUBMIT STATE ==');
	console.log(submitState);

	const alerts = await page.locator('[role="alert"], .ff-alert, .error, .field-error').allTextContents();

	console.log('\n== URL AFTER SUBMIT ==');
	console.log(page.url());

	console.log('\n== ALERTS ==');
	console.log(alerts);

	console.log('\n== REQUESTS ==');
	console.log(requests);

	console.log('\n== RESPONSES ==');
	console.log(responses);

	console.log('\n== CONSOLE ERRORS ==');
	console.log(consoleErrors);

	console.log('\n== PAGE ERRORS ==');
	console.log(pageErrors);
});
