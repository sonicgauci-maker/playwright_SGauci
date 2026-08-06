/**
 * Microsoft Auth Setup — Login sekali, simpan session token.
 * Jalankan dulu: npx playwright test "Others/ms-auth.setup"
 * Session tersimpan di: tests/Others/.ms-auth-state.json
 * Test berikutnya pakai session ini tanpa login ulang.
 */
import { test as setup } from '@playwright/test';
import path from 'path';

const AUTH_FILE = path.join(__dirname, '.ms-auth-state.json');

const FORM_URL = 'https://forms.cloud.microsoft/pages/responsepage.aspx?id=dQnm9FNankm5tNiCGMnjdfIklF5tVuVInNm_SME8qHdUMDFONUVNRFRWTjhTWjhTOVZWTUQ4NU5DUi4u&route=shorturl';

const DATA = {
  email: 'syaiful.gauci@inhealth.co.id',
  password: process.env.PASSWORD_MS || 'Bggrlybgwpns@2020',
};

setup('Login Microsoft & simpan session', async ({ page }) => {
  setup.setTimeout(120000);

  // Buka halaman form (redirect ke MS login)
  await page.goto(FORM_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForLoadState('networkidle');

  // Login Microsoft
  const emailField = page.getByRole('textbox', { name: 'Enter your email or phone' });
  await emailField.waitFor({ state: 'visible', timeout: 30000 });
  await emailField.fill(DATA.email);
  await page.getByRole('button', { name: 'Next' }).click();

  // Password
  const passwordField = page.locator('input[type="password"]');
  await passwordField.waitFor({ state: 'visible', timeout: 30000 });
  await passwordField.fill(DATA.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Handle "Stay signed in?" popup
  const dontShowCheckbox = page.getByRole('checkbox', { name: "Don't show this again" });
  if (await dontShowCheckbox.isVisible({ timeout: 10000 }).catch(() => false)) {
    await dontShowCheckbox.check();
    await page.getByRole('button', { name: 'Yes' }).click();
  }

  // Tunggu sampai form page terbuka (bukan login page lagi)
  await page.waitForURL(/forms\.cloud\.microsoft/, { timeout: 30000 });
  await page.waitForLoadState('networkidle');

  // Simpan session (cookies + localStorage)
  await page.context().storageState({ path: AUTH_FILE });
  console.log(`\n✅ Session tersimpan di: ${AUTH_FILE}\n`);
});

export { AUTH_FILE };
