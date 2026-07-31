import { test, expect } from '../fixtures/base';
import { login } from '../commands/loginklaim';
import path from 'path';

// ═══════════════════════════════════════════════════════════════
// TEST DATA — ubah di sini saja
// ═══════════════════════════════════════════════════════════════
const DATA = {
  // Credentials
  username: 'qa.claim.admin',
  password: process.env.PASSWORD2 || '',

  // Peserta
  nomorPeserta: '1001736783235',
  phone: '089662284227',
  email: 'indra.kurniawan@inhealth.co.id',

  // Tanggal Receive Date & Admission Date
  receiveDate: new Date().toISOString().split('T')[0], // default: hari ini
  admissionDate: '2026-07-28', // Tanggal Pelayanan /INDATE
  // Klaim
  icd10Code: 'A00.0',
  providerName: 'KLINIK KASIH IBU DENPASAR',
  doctorName: 'dokter klaim',
  claimSubBenefit: '55000',
  remark: 'Tester-PW-SGC',
  benefitType: 'RJTL - Rawat Jalan Tingkat Lanjut',
  planName: 'Rawat Inap',  // Nama plan yang dipilih di View Plan📌

  // Upload — taruh file di folder tests/fixtures/
  uploadFile: path.join(__dirname, '..', 'fixtures', 'DummyPDF.pdf'),
};

// ═══════════════════════════════════════════════════════════════
// TESTS
// ═══════════════════════════════════════════════════════════════
test.describe('Klaim Reimbursement Reguler', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await login(page, DATA.username, DATA.password);
  });

  test('Input Klaim Reimbursement', async ({ page }) => {
    // ── Navigasi ke Claim Reimbursement ──
    await page.getByText('Reimbursement').click();
    await page.getByText('Claim Reimbursement').click();

    // ── Add Reimbursement ──
    await page.getByRole('button', { name: 'Add Reimbursement' }).click();

    // ── Search Peserta ──
    await page.getByRole('textbox', { name: 'Type here..' }).fill(DATA.nomorPeserta);
    await page.getByRole('button', { name: 'Search' }).click();

    // ── Form Data ──
    await page.locator('input[name="ReceiveDate"]').fill(DATA.receiveDate);
    await page.locator('input[name="Phone"]').fill(DATA.phone);
    await page.locator('input[name="Email"]').fill(DATA.email);
    await page.locator('input[name="Email2"]').fill(DATA.email);

    // ── ICD10 ──
    await page.getByRole('button', { name: 'ICD10' }).click();
    await page.getByRole('textbox', { name: 'Text input with dropdown' }).fill(DATA.icd10Code);
    await page.locator('.fa-sharp').first().click();

    // ── Provider ──
    await page.getByRole('button', { name: 'Provider', exact: true }).click();
    await page.getByRole('textbox', { name: 'Type here...' }).fill(DATA.providerName);
    await page.locator('.input-group-text').click();
    await page.locator('#place-of-service-table').getByRole('button').first().click();

    // ── Doctor & Benefit ──
    await page.locator('input[name="doctor"]').fill(DATA.doctorName);
    await page.locator('input[name="ClaimSubBenefit"]').fill(DATA.claimSubBenefit);
    await page.locator('textarea[name="Remark"]').fill(DATA.remark);

    // ── Benefit Type & Admission Date ──
    // Klik dropdown TKP Type (react-select)
    const tkpContainer = page.locator(':has(> :text("TKP Type"))').last();
    await tkpContainer.getByRole('combobox').click();
    await page.getByText(DATA.benefitType, { exact: true }).click();
    await page.locator('input[name="AdmissionDate"]').fill(DATA.admissionDate);

    // ── View Plan ──
    await page.getByRole('button', { name: 'View Plan' }).click();
    // Klik button select di row plan yang sesuai
    await page.getByRole('row', { name: DATA.planName }).getByRole('button').click();

    // ── Checklist Document ──
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Checklist Document' }).click();
    // Centang document "Kuitansi" di modal checklist
    await page.getByRole('row', { name: /Kuitansi/ }).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'save', exact: true }).click();

    // ── Upload Document ──
    await page.getByLabel('Choose File').first().setInputFiles(DATA.uploadFile);
    await page.getByRole('button', { name: 'Save', exact: true }).click();

    // ── Submit ──
    // await page.getByRole('button', { name: 'Submit' }).click();
    // await page.getByRole('button', { name: 'Submit' }).click();

    // Browser tetap terbuka
    await page.pause();
  });
});
