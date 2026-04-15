import { test } from '@playwright/test';

test('debug rendered checkout sources', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/c/connect-atx-elite', { waitUntil: 'networkidle' });

  const allDonate = await page.locator('button', { hasText: 'Donate securely now' }).evaluateAll((nodes) =>
    nodes.map((n, i) => ({
      index: i,
      html: (n as HTMLElement).outerHTML,
      inCheckoutHero: !!n.closest('.ff-campaignHero__checkout'),
      formHtml: n.closest('form') ? (n.closest('form') as HTMLElement).outerHTML : null
    }))
  );

  console.log('\n== DONATE BUTTON COUNT ==');
  console.log(allDonate.length);

  console.log('\n== DONATE BUTTON DETAILS ==');
  console.log(allDonate);

  const checkoutRoots = await page.locator('.ff-campaignHero__checkout').evaluateAll((nodes) =>
    nodes.map((n, i) => ({
      index: i,
      html: (n as HTMLElement).outerHTML.slice(0, 2500)
    }))
  );

  console.log('\n== CHECKOUT ROOT COUNT ==');
  console.log(checkoutRoots.length);

  console.log('\n== CHECKOUT ROOT DETAILS ==');
  console.log(checkoutRoots);
});
