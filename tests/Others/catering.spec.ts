import { test, expect } from '@playwright/test';

const FORM_URL = 'https://forms.cloud.microsoft/pages/responsepage.aspx?id=dQnm9FNankm5tNiCGMnjdfIklF5tVuVInNm_SME8qHdUMDFONUVNRFRWTjhTWjhTOVZWTUQ4NU5DUi4u&route=shorturl';

// 📌 DATA — ubah di sini
const DATA = {
  email: 'syaiful.gauci@inhealth.co.id',
  password: process.env.PASSWORD_MS || 'Bggrlybgwpns@2020',
  nama: 'Syaiful Gauci',
  divisi: 'Teknologi Informasi',
  departemen: 'IT Applications Development',
  kehadiran: 'Hadir',
};

test('Catering Form — Login & Submit', async ({ page }) => {
  test.setTimeout(120000);

  // Buka halaman form
  await page.goto(FORM_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForLoadState('networkidle');

  // Login Microsoft — tunggu field email muncul
  const emailField = page.getByRole('textbox', { name: 'Enter your email or phone' });
  await emailField.waitFor({ state: 'visible', timeout: 30000 });
  await emailField.fill(DATA.email);
  await page.getByRole('button', { name: 'Next' }).click();

  // Tunggu field password muncul
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

  // Handle "Start now" jika muncul
  const startBtn = page.getByRole('button', { name: 'Start now' });
  if (await startBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await startBtn.click();
  }

  // Handle "Next" jika muncul
  const nextBtn = page.getByRole('button', { name: 'Next' });
  if (await nextBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await nextBtn.click();
  }

  // Isi Form
  await page.getByRole('textbox', { name: 'NamaRequired to answer' }).fill(DATA.nama);

  await page.getByRole('button', { name: 'DivisiRequired to answer' }).click();
  await page.getByLabel(DATA.divisi).click();

  await page.getByRole('button', { name: 'DepartemenRequired to answer' }).click();
  await page.getByLabel(DATA.departemen).click();

  await page.getByRole('radio', { name: DATA.kehadiran }).check();

  // Submit
  await page.getByRole('button', { name: 'Submit' }).click();

  // Verifikasi submit berhasil
  await expect(page.getByRole('link', { name: 'Submit another response' })).toBeVisible({ timeout: 15000 });

  // Browser tetap terbuka
  await page.pause();
});
