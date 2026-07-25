import { Page } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

// Force load .env
dotenv.config({ path: path.resolve(__dirname, '../../.env'), override: true });

const LOGIN_URL = 'http://claim.dev.inhealth.co.id';
const FALLBACK_URL = 'https://development.inhealth.co.id/new-micare-claim-ui/auth/login';

/**
 * Login ke Claim Verification System
 * Fallback otomatis jika URL utama tidak bisa diakses
 */
export async function login(page: Page, username: string, password: string) {
  // Buka halaman login — coba URL utama dulu, fallback jika gagal
  try {
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  } catch {
    console.log('Primary URL gagal, pindah ke fallback...');
    await page.goto('about:blank');
    await page.goto(FALLBACK_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  // Tunggu form login muncul (cek kedua kemungkinan locator)
  const usernameField = page.getByRole('textbox', { name: 'Jhon Doe' });
  const usernameFieldAlt = page.locator('input[name="username"], input[name="clientId"], #username').first();

  await Promise.race([
    usernameField.waitFor({ state: 'visible', timeout: 30000 }),
    usernameFieldAlt.waitFor({ state: 'visible', timeout: 30000 }),
  ]);

  // Input username — pakai field yang visible
  if (await usernameField.isVisible().catch(() => false)) {
    await usernameField.fill(username);
  } else {
    await usernameFieldAlt.fill(username);
  }

  // Input password
  console.log('Password length:', password.length);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);

  // Klik Login
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Handle modal popup (jika muncul — skip jika tidak ada)
  const closeModal = page.getByLabel('Close modal');
  if (await closeModal.isVisible({ timeout: 5000 }).catch(() => false)) {
    await closeModal.click();
    await page.getByRole('button', { name: 'OK' }).click();
  }
}
