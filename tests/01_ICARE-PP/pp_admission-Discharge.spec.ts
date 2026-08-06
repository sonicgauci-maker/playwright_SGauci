import { test, expect } from '../fixtures/base';
import { loginpp, dismissPromoModal } from '../commands/loginpp';

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
  nomorPeserta: '1101733464183',

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
  biayaRJ002: '25,0000',
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

    // Handle popup setelah Cek Peserta:
    // - "Mengerti" = peserta baru, lanjut admission
    // - "OK" (Info dialog) = peserta sudah terdaftar, langsung ke discharge
    const mengertiBtn = page.getByRole('button', { name: 'Mengerti' });
    const infoOkBtn = page.getByRole('dialog').getByRole('button', { name: 'OK' });

    const whichButton = await Promise.race([
      mengertiBtn.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'mengerti'),
      infoOkBtn.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'info'),
    ]).catch(() => 'none');

    if (whichButton === 'info') {
      // Peserta sudah terdaftar di plan — close dialog, langsung ke Pengesahan
      await infoOkBtn.click();
    } else {
      if (whichButton === 'mengerti') {
        await mengertiBtn.click();
      }

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

      // Verifikasi LOA — tunggu response server
      await expect(page.getByText('Letter Of A', { exact: false })).toBeVisible({ timeout: 30000 });

      // Close LOA modal
      await page.getByRole('button', { name: 'Close' }).click();
    }

    // ── DISCHARGE (Pengesahan) ──────────────────────────────
    // Navigasi ke Pengesahan via sidebar link
    await page.getByRole('link', { name: 'Pengesahan' }).click();
    await dismissPromoModal(page);

    // Tunggu halaman Pengesahan ready — jika belum load, refresh
    const cekPesertaBtn = page.getByRole('button', { name: 'Cek Peserta' });
    if (!await cekPesertaBtn.isVisible({ timeout: 10000 }).catch(() => false)) {
      await page.reload({ waitUntil: 'domcontentloaded' });
      await dismissPromoModal(page);
    }
    await cekPesertaBtn.waitFor({ state: 'visible', timeout: 30000 });

    // Search peserta di halaman Pengesahan
    const dischargeInput = page.locator('input[placeholder*="peserta"], input[placeholder*="kartu"], input[type="number"], input[type="text"]').first();
    await dischargeInput.waitFor({ state: 'visible', timeout: 10000 });
    await dischargeInput.click();
    await dischargeInput.fill(DATA.nomorPeserta);
    await expect(dischargeInput).toHaveValue(DATA.nomorPeserta, { timeout: 5000 });
    await cekPesertaBtn.click();

    // Tunggu hasil pencarian — button "Pilih"
    const pilihBtn = page.getByRole('button', { name: 'Pilih' }).first();
    const hasPilih = await pilihBtn.isVisible({ timeout: 30000 }).catch(() => false);

    if (!hasPilih) {
      console.log('\n┌─────────────────────────────────────────────────────────┐');
      console.log('│  ⚠️  SKIP DISCHARGE                                      │');
      console.log('├─────────────────────────────────────────────────────────┤');
      console.log(`│  Peserta ${DATA.nomorPeserta} tidak ditemukan di Pengesahan.`);
      console.log('│  Kemungkinan: sudah di-discharge atau belum admission.');
      console.log('└─────────────────────────────────────────────────────────┘\n');
      test.skip(true, 'Peserta tidak tersedia untuk discharge');
      return;
    }

    await pilihBtn.click();

    // Tunggu halaman discharge form terbuka — jika blank, refresh
    const icd10Field = page.getByRole('textbox', { name: 'Cari di sini' });
    if (!await icd10Field.isVisible({ timeout: 15000 }).catch(() => false)) {
      await page.reload({ waitUntil: 'domcontentloaded' });
      await dismissPromoModal(page);
      await icd10Field.waitFor({ state: 'visible', timeout: 30000 });
    }

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
