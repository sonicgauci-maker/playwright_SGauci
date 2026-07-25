import { test, expect } from '@playwright/test';
import { loginpp } from './commands/loginpp';

// Delay 1000ms di setiap action (click, fill, dll)
test.use({ actionTimeout: 15000, launchOptions: { slowMo: 1000 } });

// ═══════════════════════════════════════════════════════════════
// TEST DATA — ubah di sini saja
// ═══════════════════════════════════════════════════════════════
const DATA = {
  // Credentials
  username: 'rs.banyumanik',
  password: process.env.PASSWORD3 || '',

  // Peserta
  nomorPeserta: '1101733464396',

  // Admission
  jenisRawat: 'RAWAT JALAN',   // TKP (Tingkat Pelayanan)
  manfaat: 'RAWAT JALAN',
  subManfaat: 'AKUPUNTUR',
  keterangan: 'Test By PW-SGC',

  // Discharge
  icd10: 'A00.0',
  kodeProsedur: '00.01',
  catatan: 'Test By PW-SGC',
  biayaRJ001: '5,0000',
  biayaRJ002: '15,0000',
  biayaRJ004: '30,0000',
};

// ═══════════════════════════════════════════════════════════════
// TEST
// ═══════════════════════════════════════════════════════════════
test.describe('Provider Portal - Admission & Discharge', () => {
  test.setTimeout(180000);

  test('should complete admission and discharge flow', async ({ page }) => {
    await loginpp(page, DATA.username, DATA.password);

    // ── ADMISSION ────────────────────────────────────────────
    await page.getByRole('textbox', { name: 'Search' }).fill(DATA.nomorPeserta);
    await page.getByRole('button', { name: 'Cek Peserta' }).click();
    await page.getByRole('button', { name: 'Mengerti' }).click();

    // Pilih jenis rawat & manfaat
    await page.getByRole('radio', { name: DATA.jenisRawat }).check();
    await page.getByText('Pilih Manfaat disini...').click();
    await page.getByRole('option', { name: DATA.manfaat }).click();
    await page.locator('.select__input-container').click();
    await page.getByRole('option', { name: DATA.subManfaat }).click();

    // Pilih dokter
    await page.getByRole('textbox', { name: 'Pilih dokter yang merawat' }).click();
    await page.locator('#action20').click();

    // Keterangan & submit
    await page.getByRole('textbox', { name: 'Keterangan (opsional)' }).fill(DATA.keterangan);
    await page.getByRole('button', { name: 'Daftarkan Peserta' }).click();
    await page.getByRole('button', { name: 'Ya, Konfirmasi' }).click();

    // Verifikasi LOA
    await expect(page.locator('div').filter({ hasText: 'Letter Of Administration' }).nth(1)).toBeVisible();

    // ── DISCHARGE ────────────────────────────────────────────
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('link', { name: 'Pengesahan' }).click();

    // Search peserta
    await page.getByRole('spinbutton', { name: 'Search' }).fill(DATA.nomorPeserta);
    await page.getByRole('button', { name: 'Cek Peserta' }).click();
    await page.getByRole('button', { name: 'Pilih' }).first().click();

    // ICD10
    await page.getByRole('textbox', { name: 'Cari di sini' }).fill(DATA.icd10);
    await page.locator('.input-group-text').click();
    await page.locator('.lucide.lucide-circle-check').first().click();

    // Kode Prosedur
    await page.getByRole('button', { name: 'Pilih' }).nth(1).click();
    await page.getByRole('textbox', { name: 'Cari di sini' }).fill(DATA.kodeProsedur);
    await page.locator('.lucide.lucide-search').click();
    await page.locator('.lucide.lucide-circle-check').click();

    // Catatan
    await page.getByRole('textbox', { name: 'Catatan (opsional)' }).fill(DATA.catatan);

    // Biaya
    await page.locator('input[name="RJ 001"]').fill(DATA.biayaRJ001);
    await page.locator('input[name="RJ 002"]').fill(DATA.biayaRJ002);
    await page.locator('input[name="RJ 004"]').fill(DATA.biayaRJ004);

    // Submit
    await page.getByRole('button', { name: 'Simpan' }).click();
    await page.getByRole('button', { name: 'Ya, Konfirmasi' }).click(); 
    await page.getByRole('button', { name: 'OK' }).click();  

    // VERIFIKASI LOC --- need more time to explore it (tested: Sat,Jul 25,2026)
    //await expect(page.locator('div').filter({ hasText: 'Letter Of Charges' }).nth(1)).toBeVisible();

    // Browser tetap terbuka
    await page.pause();
  });
});
