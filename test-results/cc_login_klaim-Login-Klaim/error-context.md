# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cc_login_klaim.spec.ts >> Login Klaim
- Location: cc_login_klaim.spec.ts:7:5

# Error details

```
Error: page.goto: Navigation to "about:blank" is interrupted by another navigation to "chrome-error://chromewebdata/"
Call log:
  - navigating to "about:blank", waiting until "load"

```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | import path from 'path';
  3  | import dotenv from 'dotenv';
  4  | 
  5  | // Force load .env
  6  | dotenv.config({ path: path.resolve(__dirname, '../../.env'), override: true });
  7  | 
  8  | const LOGIN_URL = 'http://claim.dev.inhealth.co.id';
  9  | const FALLBACK_URL = 'https://development.inhealth.co.id/new-micare-claim-ui/auth/login';
  10 | 
  11 | /**
  12 |  * Login ke Claim Verification System
  13 |  * Fallback otomatis jika URL utama tidak bisa diakses
  14 |  */
  15 | export async function login(page: Page, username: string, password: string) {
  16 |   // Buka halaman login — coba URL utama dulu, fallback jika gagal
  17 |   try {
  18 |     await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  19 |   } catch {
  20 |     console.log('Primary URL gagal, pindah ke fallback...');
> 21 |     await page.goto('about:blank');
     |                ^ Error: page.goto: Navigation to "about:blank" is interrupted by another navigation to "chrome-error://chromewebdata/"
  22 |     await page.goto(FALLBACK_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  23 |   }
  24 | 
  25 |   // Tunggu form login muncul (cek kedua kemungkinan locator)
  26 |   const usernameField = page.getByRole('textbox', { name: 'Jhon Doe' });
  27 |   const usernameFieldAlt = page.locator('input[name="username"], input[name="clientId"], #username').first();
  28 | 
  29 |   await Promise.race([
  30 |     usernameField.waitFor({ state: 'visible', timeout: 30000 }),
  31 |     usernameFieldAlt.waitFor({ state: 'visible', timeout: 30000 }),
  32 |   ]);
  33 | 
  34 |   // Input username — pakai field yang visible
  35 |   if (await usernameField.isVisible().catch(() => false)) {
  36 |     await usernameField.fill(username);
  37 |   } else {
  38 |     await usernameFieldAlt.fill(username);
  39 |   }
  40 | 
  41 |   // Input password
  42 |   console.log('Password length:', password.length);
  43 |   await page.getByRole('textbox', { name: 'Password' }).fill(password);
  44 | 
  45 |   // Klik Login
  46 |   await page.getByRole('button', { name: 'Login', exact: true }).click();
  47 | 
  48 |   // Handle modal popup (jika muncul — skip jika tidak ada)
  49 |   const closeModal = page.getByLabel('Close modal');
  50 |   if (await closeModal.isVisible({ timeout: 5000 }).catch(() => false)) {
  51 |     await closeModal.click();
  52 |     await page.getByRole('button', { name: 'OK' }).click();
  53 |   }
  54 | }
  55 | 
```