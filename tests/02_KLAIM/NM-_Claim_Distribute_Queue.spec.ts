import { test, expect } from '../fixtures/base';
import { login } from '../commands/loginklaim';

// ═══════════════════════════════════════════════════════════════
// NM-xxxx: Claim Distribution Queue — Monitoring Pipeline
// ═══════════════════════════════════════════════════════════════

const DATA = {
  username: 'verifikator.pusat',
  password: process.env.PASSWORD5 || '',

  // Filter data📌
  claimNo: '1101R0070826YI000001',  // Claim No / Register No
  status: 'Failed',               // Status filter
  kops: '0901',                   // KOPS filter
  tanggal: '01/07/2026',          // Tanggal filter
};

test.describe('Claim Distribution Queue', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await login(page, DATA.username, DATA.password);

    // Masuk ke Menu Monitoring
    await page.getByRole('button', { name: 'Monitoring' }).click();
    await page.getByRole('link', { name: 'Claim Distribute Queue' }).click();
  });

  test('View halaman & verifikasi filter tersedia', async ({ page }) => {
    await expect(page.locator('#search')).toBeVisible();
    await expect(page.locator('#status')).toBeVisible();
    await expect(page.locator('#kops')).toBeVisible();
    await expect(page.locator('#date')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reset Filter' })).toBeVisible();
    await page.pause();
  });

  test('Search berdasarkan Claim No', async ({ page }) => {
    await page.locator('#search').fill(DATA.claimNo);
    await page.getByRole('button', { name: 'Search' }).click();
    await page.pause();
  });

  test('Filter berdasarkan Status', async ({ page }) => {
    // Klik dropdown status (react-select)
    await page.locator('#react-select-7-input').click();
    // Ketik dan pilih status dari DATA (default: DISTRIBUTED, bisa diganti di DATA.status)
    await page.locator('#react-select-7-input').fill(DATA.status);
    await page.getByText(DATA.status, { exact: true }).click();
    await page.getByRole('button', { name: 'Search' }).click();
    await page.pause();
  });

  test('Filter berdasarkan KOPS', async ({ page }) => {
    await page.locator('#kops').click();
    // Pilih KOPS sesuai data yang ada
    // await page.getByText(DATA.kops, { exact: true }).click();
    await page.pause();
  });

  test('Filter berdasarkan Tanggal', async ({ page }) => {
    await page.locator('#date').click();
    await page.locator('#date').fill(DATA.tanggal);
    await page.getByRole('button', { name: 'Search' }).click();
    await page.pause();
  });

  test('Reset Filter', async ({ page }) => {
    await page.locator('#search').fill(DATA.claimNo);
    await page.getByRole('button', { name: 'Reset Filter' }).click();
    await expect(page.locator('#search')).toHaveValue('');
    await expect(page.getByText('Semua Status')).toBeVisible();
    await expect(page.getByText('Semua KOPS')).toBeVisible();
    await page.pause();
  });

  test('Filter Status FAILED', async ({ page }) => {
    await page.locator('#status').click();
    await page.getByText('FAILED', { exact: true }).click();
    await page.getByRole('button', { name: 'Search' }).click();
    await page.pause();
  });
});
