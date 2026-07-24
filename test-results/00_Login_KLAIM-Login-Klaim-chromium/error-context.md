# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 00_Login_KLAIM.spec.ts >> Login Klaim
- Location: tests\00_Login_KLAIM.spec.ts:7:5

# Error details

```
TimeoutError: page.goto: Timeout 60000ms exceeded.
Call log:
  - navigating to "https://claim.dev.inhealth.co.id/auth/login", waiting until "domcontentloaded"

```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | 
  3  | const LOGIN_URL = 'https://claim.dev.inhealth.co.id/auth/login';
  4  | 
  5  | /**
  6  |  * Login ke Claim Verification System
  7  |  * Equivalent Cypress: cy.login(username, password)
  8  |  */
  9  | export async function login(page: Page, username: string, password: string) {
  10 |   // Buka halaman login - command login
> 11 |   await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
     |              ^ TimeoutError: page.goto: Timeout 60000ms exceeded.
  12 | 
  13 |   // Input username
  14 |   await page.getByRole('textbox', { name: 'Jhon Doe' }).fill(username);
  15 | 
  16 |   // Input password
  17 |   await page.getByRole('textbox', { name: 'Password' }).fill(password);
  18 | 
  19 |   // Klik Login
  20 |   await page.getByRole('button', { name: 'Login', exact: true }).click();
  21 | 
  22 |   // Handle modal popup - command login
  23 |   await page.getByLabel('Close modal').click();
  24 |   await page.getByRole('button', { name: 'OK' }).click();
  25 | }
  26 | 
```