import { Page, expect } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

// Force load .env
dotenv.config({ path: path.resolve(__dirname, '../../.env'), override: true });

const LOGIN_URL = 'https://development.inhealth.co.id/newmicareprovideruiv2/account/login';

/**
 * Login ke Provider Portal (Icare Provider)
 * Panggil: await loginpp(page, 'username', 'password')
 */
export async function loginpp(page: Page, username: string, password: string) {
  // Buka halaman login
  await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded' });
  await page.locator('#username').waitFor({ state: 'visible' });

  // Verifikasi halaman login
  await expect(page).toHaveURL(/\/newmicareprovideruiv2\/account\/login/);

  // Input username
  await page.locator('#username').fill(username);
  await page.waitForTimeout(2000);

  // Input password
  await page.locator('#password').fill(password);
  await page.waitForTimeout(2000);

  // Klik tombol Log in
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(2000);

  // Verifikasi halaman setelah login
  await expect(page.locator('div').filter({ hasText: 'Pendaftaran peserta Inhealth' }).nth(4)).toBeVisible();
}
