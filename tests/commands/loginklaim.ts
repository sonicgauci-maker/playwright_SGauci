import { Page } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

// Force load .env
dotenv.config({ path: path.resolve(__dirname, '../../.env'), override: true });

const LOGIN_URL = 'http://claim.dev.inhealth.co.id';

/**
 * Login ke Claim Verification System
 */
export async function login(page: Page, username: string, password: string) {
  // Buka halaman login
  await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

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

  // Handle modal popup (jika muncul — tunggu idle lalu close)
  const closeModal = page.getByLabel('Close modal');
  try {
    await closeModal.waitFor({ state: 'visible', timeout: 5000 });
    await page.waitForLoadState('networkidle');
    await closeModal.click();

    // Handle pop-up konfirmasi (jika muncul)
    const okButton = page.getByRole('button', { name: 'OK' });
    await okButton.waitFor({ state: 'visible', timeout: 5000 });
    await page.waitForLoadState('networkidle');
    await okButton.click();
    await okButton.waitFor({ state: 'hidden', timeout: 5000 });
  } catch {
    // Modal tidak muncul — skip
  }
}
