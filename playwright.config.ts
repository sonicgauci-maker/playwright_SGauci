import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

// Load .env global — override agar tidak di-skip oleh tool external
dotenv.config({ path: path.resolve(__dirname, '.env'), override: true });

export default defineConfig({
  testDir: 'tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: false,
    actionTimeout: 15000,
    navigationTimeout: 30000,
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    permissions: ['notifications', 'geolocation'],
    launchOptions: {
      args: ['--disable-features=DialMediaRouteProvider'], // Auto-dismiss network permission dialog
      slowMo: 0,
    },
  },
  projects: [
    {
      name: 'chromium',
      timeout:5000,
      use: {
        channel: 'chromium',
      },
    },
    //{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    //{ name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
