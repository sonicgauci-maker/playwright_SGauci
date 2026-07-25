import { test, expect } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

// Force load .env
dotenv.config({ path: path.resolve(__dirname, '..', '.env'), override: true });

// ═══════════════════════════════════════════════════════════════
// TEST DATA — ubah di sini saja
// ═══════════════════════════════════════════════════════════════
const username = 'rs.banyumanik';
const password = process.env.PASSWORD3 || '';
const loginUrl = 'https://development.inhealth.co.id/newmicareprovideruiv2/account/login';

// ═══════════════════════════════════════════════════════════════
// TEST
// ═══════════════════════════════════════════════════════════════
test('Login Provider', async ({ page }) => {
  test.setTimeout(180000);

  // Buka halaman login
  await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
  await page.locator('#username').waitFor({ state: 'visible' });

  // Verifikasi Halaman Web
  await expect(page).toHaveURL(/\/newmicareprovideruiv2\/account\/login/);

  // Input username
  await page.locator('#username').fill(username);
  await page.waitForTimeout(2000);

  // Input password
  await page.getByRole('textbox', { name: '*********' }).click();
  await page.getByRole('textbox', { name: '*********' }).fill(password);
  await page.waitForTimeout(2000);

  // Klik tombol Log in
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(2000);

  // Verifikasi title halaman setelah login
  await expect(page).toHaveTitle(/Icare Provider/);

  // Browser tetap terbuka
  await page.pause();
});
