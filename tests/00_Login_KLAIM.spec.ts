import { test, expect } from '@playwright/test';
import { login } from './commands/login';

const username = 'tester.admin';
const password = process.env.PASSWORD1 || '';

test('Login Klaim', async ({ page }) => {
  test.setTimeout(180000);

  // Panggil command login
  await login(page, username, password);

  // Verifikasi login berhasil
  await expect(page).not.toHaveURL(/\/auth\/login/);

  // Browser tetap terbuka + Inspector aktif
 // await page.pause();
});
