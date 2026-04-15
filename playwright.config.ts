import { defineConfig, devices } from '@playwright/test';

const HOST = '127.0.0.1';
const PORT = 4173;
const baseURL = `http://${HOST}:${PORT}`;

export default defineConfig({
	testDir: 'tests/e2e',
	testMatch: '**/*.smoke.e2e.{ts,js}',
	fullyParallel: false,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	timeout: 45_000,
	expect: {
		timeout: 8_000
	},
	reporter: [
		['list'],
		['html', { open: 'never', outputFolder: 'playwright-report' }]
	],
	use: {
		baseURL,
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
		actionTimeout: 10_000,
		navigationTimeout: 20_000
	},
	webServer: {
		command: `pnpm exec vite build && pnpm exec vite preview --host ${HOST} --port ${PORT}`,
		url: baseURL,
		reuseExistingServer: !process.env.CI,
		stdout: 'pipe',
		stderr: 'pipe',
		timeout: 120_000
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome']
			}
		}
	]
});
