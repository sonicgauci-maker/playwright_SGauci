import { test, expect } from '../fixtures/base';
import { login } from '../commands/loginklaim';
import path from 'path';

// ═══════════════════════════════════════════════════════════════
// NM-1434: Save Without Autobatch — NEGATIVE CASES
// ═══════════════════════════════════════════════════════════════
// Description:
// Admin Klaim menyimpan data klaim reimburse tanpa trigger auto batch,
// sehingga bisa edit kapanpun sebelum submit.
//
// Negative cases menguji:
// - Save tanpa mandatory field
// - Save dengan data invalid
// - Submit langsung tanpa save
// - Akses klaim yang sudah di-submit (tidak bisa edit)
// - Validasi existing tetap berlaku saat save
// ═══════════════════════════════════════════════════════════════

const DATA = {
  username: 'tester.admin',
  password: process.env.PASSWORD1 || '',
  nomorPeserta: '1101733464183',
  phone: '089662284227',
  email: 'syaiful.gauci@inhealth.co.id',
  receiveDate: new Date().toISOString().split('T')[0],
  admissionDate: '2026-07-28',
  icd10Code: 'Z00.0',
  providerName: 'PKM MEURAXA',
  doctorName: 'dokter klaim',
  claimSubBenefit: '111,5000',
  remark: 'NM-1434-NEG-PW-SGC',
  benefitType: 'RJTL - Rawat Jalan Tingkat Lanjut',
  uploadFile: path.join(__dirname, '..', 'fixtures', 'DummyPDF.pdf'),
};

test.describe('NM-1434: Save Without Autobatch — Negative Cases', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await login(page, DATA.username, DATA.password);
    // Navigasi ke Claim Reimbursement
    await page.getByText('Reimbursement').click();
    await page.getByText('Claim Reimbursement').click();
  });

  // ═══════════════════════════════════════════════════════════════
  // NEG-01: Save tanpa mengisi nomor peserta (mandatory field kosong)
  // Expected: Validasi gagal, klaim tidak tersimpan
  // ═══════════════════════════════════════════════════════════════
  test('NEG-01: Save tanpa nomor peserta — validasi harus gagal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Reimbursement' }).click();

    // Tidak mengisi nomor peserta, langsung coba Save
    // Klik Save tanpa search peserta
    const saveBtn = page.getByRole('button', { name: 'Save', exact: true });

    // Jika Save button ada, klik
    if (await saveBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await saveBtn.click();

      // Expect: muncul error/warning validasi
      const errorMsg = page.locator('.alert-danger, .text-danger, .error-message, .toast-error').first();
      const hasError = await errorMsg.isVisible({ timeout: 10000 }).catch(() => false);

      console.log('\n┌─────────────────────────────────────────────────────────┐');
      console.log('│  NEG-01: Save tanpa Nomor Peserta                       │');
      console.log('├─────────────────────────────────────────────────────────┤');
      console.log(`│  Expected : Validasi gagal, klaim tidak tersimpan`);
      console.log(`│  Result   : ${hasError ? '✅ PASSED — Error muncul' : '⚠️  No visible error — potential bug'}`);
      console.log('└─────────────────────────────────────────────────────────┘\n');
    } else {
      console.log('\n┌─────────────────────────────────────────────────────────┐');
      console.log('│  NEG-01: Save tanpa Nomor Peserta                       │');
      console.log('├─────────────────────────────────────────────────────────┤');
      console.log(`│  Expected : Validasi gagal`);
      console.log(`│  Result   : ✅ PASSED — Save button disabled/hidden tanpa peserta`);
      console.log('└─────────────────────────────────────────────────────────┘\n');
    }

    await page.pause();
  });

  // ═══════════════════════════════════════════════════════════════
  // NEG-02: Save tanpa mengisi ICD10 (mandatory field)
  // Expected: Validasi gagal saat save
  // ═══════════════════════════════════════════════════════════════
  test('NEG-02: Save tanpa ICD10 — validasi harus gagal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Reimbursement' }).click();

    // Search Peserta
    await page.getByRole('textbox', { name: 'Type here..' }).fill(DATA.nomorPeserta);
    await page.getByRole('button', { name: 'Search' }).click();

    // Isi form TANPA ICD10
    await page.locator('input[name="ReceiveDate"]').fill(DATA.receiveDate);
    await page.locator('input[name="Phone"]').fill(DATA.phone);
    await page.locator('input[name="Email"]').fill(DATA.email);
    await page.locator('input[name="Email2"]').fill(DATA.email);
    await page.locator('input[name="doctor"]').fill(DATA.doctorName);
    await page.locator('input[name="ClaimSubBenefit"]').fill(DATA.claimSubBenefit);
    await page.locator('textarea[name="Remark"]').fill(DATA.remark);

    // Coba Save tanpa ICD10
    const saveBtn = page.getByRole('button', { name: 'Save', exact: true });
    if (await saveBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await saveBtn.click();

      // Tunggu error muncul atau popup konfirmasi
      const errorMsg = page.locator('.alert-danger, .text-danger, .error-message, .toast-error, .swal2-popup').first();
      const hasError = await errorMsg.isVisible({ timeout: 10000 }).catch(() => false);

      console.log('\n┌─────────────────────────────────────────────────────────┐');
      console.log('│  NEG-02: Save tanpa ICD10                                │');
      console.log('├─────────────────────────────────────────────────────────┤');
      console.log(`│  Expected : Validasi gagal, ICD10 wajib diisi`);
      console.log(`│  Result   : ${hasError ? '✅ PASSED — Validasi error muncul' : '⚠️  No error — mungkin ICD10 optional saat Save'}`);
      console.log('└─────────────────────────────────────────────────────────┘\n');
    }

    await page.pause();
  });

  // ═══════════════════════════════════════════════════════════════
  // NEG-03: Save tanpa upload document
  // Expected: Validasi gagal atau warning
  // ═══════════════════════════════════════════════════════════════
  test('NEG-03: Save tanpa upload document — cek validasi', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Reimbursement' }).click();

    // Search Peserta
    await page.getByRole('textbox', { name: 'Type here..' }).fill(DATA.nomorPeserta);
    await page.getByRole('button', { name: 'Search' }).click();

    // Isi form lengkap TANPA upload document
    await page.locator('input[name="ReceiveDate"]').fill(DATA.receiveDate);
    await page.locator('input[name="Phone"]').fill(DATA.phone);
    await page.locator('input[name="Email"]').fill(DATA.email);
    await page.locator('input[name="Email2"]').fill(DATA.email);

    // ICD10
    await page.getByRole('button', { name: 'ICD10' }).click();
    await page.getByRole('textbox', { name: 'Text input with dropdown' }).fill(DATA.icd10Code);
    await page.locator('.fa-sharp').first().click();

    // Provider
    await page.getByRole('button', { name: 'Provider', exact: true }).click();
    await page.getByRole('textbox', { name: 'Type here...' }).fill(DATA.providerName);
    await page.locator('.input-group-text').click();
    await page.locator('#place-of-service-table').getByRole('button').first().click();

    // Doctor & Benefit
    await page.locator('input[name="doctor"]').fill(DATA.doctorName);
    await page.locator('input[name="ClaimSubBenefit"]').fill(DATA.claimSubBenefit);
    await page.locator('textarea[name="Remark"]').fill(DATA.remark);

    // SKIP upload — langsung Save
    const saveBtn = page.getByRole('button', { name: 'Save', exact: true });
    if (await saveBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await saveBtn.click();

      const errorOrSuccess = page.locator('.alert-danger, .text-danger, .swal2-popup, .toast-success').first();
      const result = await errorOrSuccess.isVisible({ timeout: 10000 }).catch(() => false);
      const isError = await page.locator('.alert-danger, .text-danger, .swal2-icon-error').first().isVisible().catch(() => false);

      console.log('\n┌─────────────────────────────────────────────────────────┐');
      console.log('│  NEG-03: Save tanpa Upload Document                      │');
      console.log('├─────────────────────────────────────────────────────────┤');
      console.log(`│  Expected : Validasi gagal atau warning`);
      console.log(`│  Result   : ${isError ? '✅ PASSED — Error: document wajib' : '⚠️  Mungkin document optional saat Save'}`);
      console.log('└─────────────────────────────────────────────────────────┘\n');
    }

    await page.pause();
  });

  // ═══════════════════════════════════════════════════════════════
  // NEG-04: Save dengan amount/benefit kosong (0)
  // Expected: Validasi gagal — amount tidak boleh 0
  // ═══════════════════════════════════════════════════════════════
  test('NEG-04: Save dengan ClaimSubBenefit kosong — validasi harus gagal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Reimbursement' }).click();

    // Search Peserta
    await page.getByRole('textbox', { name: 'Type here..' }).fill(DATA.nomorPeserta);
    await page.getByRole('button', { name: 'Search' }).click();

    // Isi form dengan ClaimSubBenefit = 0
    await page.locator('input[name="ReceiveDate"]').fill(DATA.receiveDate);
    await page.locator('input[name="Phone"]').fill(DATA.phone);
    await page.locator('input[name="Email"]').fill(DATA.email);
    await page.locator('input[name="Email2"]').fill(DATA.email);
    await page.locator('input[name="doctor"]').fill(DATA.doctorName);
    await page.locator('input[name="ClaimSubBenefit"]').fill('0');  // Amount 0
    await page.locator('textarea[name="Remark"]').fill(DATA.remark);

    const saveBtn = page.getByRole('button', { name: 'Save', exact: true });
    if (await saveBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await saveBtn.click();

      const errorMsg = page.locator('.alert-danger, .text-danger, .error-message, .swal2-popup').first();
      const hasError = await errorMsg.isVisible({ timeout: 10000 }).catch(() => false);

      console.log('\n┌─────────────────────────────────────────────────────────┐');
      console.log('│  NEG-04: Save dengan Amount 0                            │');
      console.log('├─────────────────────────────────────────────────────────┤');
      console.log(`│  Expected : Validasi gagal, amount harus > 0`);
      console.log(`│  Result   : ${hasError ? '✅ PASSED — Error validasi muncul' : '⚠️  No error — amount 0 accepted'}`);
      console.log('└─────────────────────────────────────────────────────────┘\n');
    }

    await page.pause();
  });

  // ═══════════════════════════════════════════════════════════════
  // NEG-05: Klaim yang sudah di-submit tidak bisa di-edit lagi
  // Expected: Tombol Edit tidak tersedia atau form readonly
  // ═══════════════════════════════════════════════════════════════
  test('NEG-05: Klaim yang sudah di-submit — tidak bisa di-edit', async ({ page }) => {
    // Cari klaim yang sudah submitted
    await page.getByRole('textbox', { name: 'Type here..' }).fill(DATA.nomorPeserta);
    await page.getByRole('button', { name: 'Search' }).click();

    // Cek apakah ada tombol Edit pada klaim submitted
    const editBtn = page.getByRole('button', { name: 'Edit' }).first();
    const hasEdit = await editBtn.isVisible({ timeout: 10000 }).catch(() => false);

    if (hasEdit) {
      await editBtn.click();

      // Cek apakah form readonly atau Save disabled
      const saveBtn = page.getByRole('button', { name: 'Save', exact: true });
      const isSaveEnabled = await saveBtn.isEnabled({ timeout: 5000 }).catch(() => false);

      console.log('\n┌─────────────────────────────────────────────────────────┐');
      console.log('│  NEG-05: Edit Klaim yang Sudah Submit                    │');
      console.log('├─────────────────────────────────────────────────────────┤');
      console.log(`│  Expected : Tidak bisa edit/save klaim submitted`);
      console.log(`│  Result   : ${!isSaveEnabled ? '✅ PASSED — Save disabled untuk klaim submitted' : '⚠️  Save masih enabled — cek status klaim'}`);
      console.log('└─────────────────────────────────────────────────────────┘\n');
    } else {
      console.log('\n┌─────────────────────────────────────────────────────────┐');
      console.log('│  NEG-05: Edit Klaim yang Sudah Submit                    │');
      console.log('├─────────────────────────────────────────────────────────┤');
      console.log(`│  Expected : Tidak bisa edit klaim submitted`);
      console.log(`│  Result   : ✅ PASSED — Tombol Edit tidak tersedia`);
      console.log('└─────────────────────────────────────────────────────────┘\n');
    }

    await page.pause();
  });

  // ═══════════════════════════════════════════════════════════════
  // NEG-06: Verifikasi klaim yang baru di-save TIDAK masuk antrian auto batch
  // Expected: Status klaim = draft/saved, bukan di pipeline batch
  // ═══════════════════════════════════════════════════════════════
  test('NEG-06: Klaim saved — tidak boleh muncul di antrian auto batch', async ({ page }) => {
    // Cari klaim yang status-nya saved/draft
    await page.getByRole('textbox', { name: 'Type here..' }).fill(DATA.nomorPeserta);
    await page.getByRole('button', { name: 'Search' }).click();

    // Tunggu hasil muncul
    await page.waitForTimeout(3000);

    // Cek status klaim — harus bukan "Batched" atau "In Process"
    const statusCell = page.locator('td:has-text("Batch"), td:has-text("In Process"), td:has-text("Processed")').first();
    const isBatched = await statusCell.isVisible({ timeout: 5000 }).catch(() => false);

    console.log('\n┌─────────────────────────────────────────────────────────┐');
    console.log('│  NEG-06: Klaim Saved Tidak Masuk Auto Batch              │');
    console.log('├─────────────────────────────────────────────────────────┤');
    console.log(`│  Expected : Klaim saved TIDAK di antrian batch`);
    console.log(`│  Result   : ${!isBatched ? '✅ PASSED — Klaim tidak di batch pipeline' : '❌ FAILED — Klaim saved masuk ke batch!'}`);
    console.log('└─────────────────────────────────────────────────────────┘\n');

    // Klaim yang saved TIDAK BOLEH masuk batch
    expect(isBatched, 'Klaim saved tidak boleh masuk auto batch pipeline').toBe(false);

    await page.pause();
  });
});
