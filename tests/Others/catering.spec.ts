import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const FORM_URL = 'https://forms.cloud.microsoft/pages/responsepage.aspx?id=dQnm9FNankm5tNiCGMnjdfIklF5tVuVInNm_SME8qHdUMDFONUVNRFRWTjhTWjhTOVZWTUQ4NU5DUi4u&route=shorturl';
const AUTH_FILE = path.join(__dirname, '.ms-auth-state.json');

// Pakai session tersimpan jika ada
const hasAuthFile = fs.existsSync(AUTH_FILE);
if (hasAuthFile) {
  test.use({ storageState: AUTH_FILE });
}

// 📌 DATA — ubah di sini
const DATA = {
  email: 'syaiful.gauci@inhealth.co.id',
  password: process.env.PASSWORD_MS || 'Bggrlybgwpns@2020',
  nama: 'Syaiful Gauci',
  divisi: 'Teknologi Informasi',
  departemen: 'IT Applications Development',
  kehadiran: 'Hadir',
};

test('Catering Form — Login & Submit', async ({ page, context }) => {
  test.setTimeout(120000);

  // Buka halaman form
  await page.goto(FORM_URL, { waitUntil: 'networkidle', timeout: 60000 });

  // Jika token sudah tersimpan, skip login — langsung ke form
  if (!hasAuthFile) {
    // Detect: apakah di halaman login Microsoft atau sudah di form
    const emailField = page.getByRole('textbox', { name: 'Enter your email or phone' });
    const passwordField = page.locator('input[type="password"]');
    const formField = page.getByRole('textbox', { name: /Nama/i });

    const landedOn = await Promise.race([
      emailField.waitFor({ state: 'visible', timeout: 30000 }).then(() => 'email'),
      passwordField.waitFor({ state: 'visible', timeout: 30000 }).then(() => 'password'),
      formField.waitFor({ state: 'visible', timeout: 30000 }).then(() => 'form'),
    ]).catch(() => 'unknown');

    if (landedOn === 'email') {
      await emailField.fill(DATA.email);
      await page.getByRole('button', { name: 'Next' }).click();
      await passwordField.waitFor({ state: 'visible', timeout: 30000 });
      await passwordField.fill(DATA.password);
      await page.getByRole('button', { name: 'Sign in' }).click();

      const dontShowCheckbox = page.getByRole('checkbox', { name: "Don't show this again" });
      if (await dontShowCheckbox.isVisible({ timeout: 10000 }).catch(() => false)) {
        await dontShowCheckbox.check();
        await page.getByRole('button', { name: 'Yes' }).click();
      }

      await page.waitForURL(/forms\.cloud\.microsoft/, { timeout: 30000 });
      await page.waitForLoadState('networkidle');
      await context.storageState({ path: AUTH_FILE });
      console.log('✅ Session tersimpan');

    } else if (landedOn === 'password') {
      await passwordField.fill(DATA.password);
      await page.getByRole('button', { name: 'Sign in' }).click();

      const dontShowCheckbox = page.getByRole('checkbox', { name: "Don't show this again" });
      if (await dontShowCheckbox.isVisible({ timeout: 10000 }).catch(() => false)) {
        await dontShowCheckbox.check();
        await page.getByRole('button', { name: 'Yes' }).click();
      }

      await page.waitForURL(/forms\.cloud\.microsoft/, { timeout: 30000 });
      await page.waitForLoadState('networkidle');
      await context.storageState({ path: AUTH_FILE });
      console.log('✅ Session tersimpan');
    }
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

  // Tunggu form field muncul
  const namaField = page.getByRole('textbox', { name: /Nama/i });
  await namaField.waitFor({ state: 'visible', timeout: 30000 });

  // Isi Form
  await namaField.fill(DATA.nama);

  await page.getByRole('button', { name: /Divisi/i }).click();
  await page.getByLabel(DATA.divisi).click();

  await page.getByRole('button', { name: /Departemen/i }).click();
  await page.getByLabel(DATA.departemen).click();

  await page.getByRole('radio', { name: DATA.kehadiran }).check();

  // Submit
  await page.getByRole('button', { name: 'Submit' }).click();

  // Verifikasi submit berhasil
  await expect(page.getByRole('link', { name: 'Submit another response' })).toBeVisible({ timeout: 15000 });

  // Browser tetap terbuka
  await page.pause();
});
