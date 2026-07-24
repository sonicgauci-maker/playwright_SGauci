import { Page } from '@playwright/test';

const LOGIN_URL = 'https://claim.dev.inhealth.co.id/auth/login';

/**
 * Login ke Claim Verification System
 * Equivalent Cypress: cy.login(username, password)
 */
export async function login(page: Page, username: string, password: string) {
  // Buka halaman login - command login
  await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Input username
  await page.getByRole('textbox', { name: 'Jhon Doe' }).fill(username);

  // Input password
  await page.getByRole('textbox', { name: 'Password' }).fill(password);

  // Klik Login
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Handle modal popup - command login
  await page.getByLabel('Close modal').click();
  await page.getByRole('button', { name: 'OK' }).click();
}
