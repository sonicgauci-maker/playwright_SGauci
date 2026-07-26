import { test, expect } from '@playwright/test';
import { login } from './commands/loginklaim';
import path from 'path';

// ═══════════════════════════════════════════════════════════════
// TEST DATA — ubah di sini saja
// ═══════════════════════════════════════════════════════════════
const DATA = {
  // Credentials
  username: 'tester.admin',
  password: process.env.PASSWORD1 || '',

  // Peserta
  nomorPeserta: '1101703768029',
  phone: '089662284227',
  email: 'syaiful.gauci@inhealth.co.id',

  // Tanggal
  receiveDate: new Date().toISOString().split('T')[0], // default: hari ini
  admissionDate: '2026-07-17', // ubah sesuai kebutuhan

  // Klaim
  icd10Code: 'Z00.0',
  providerName: 'PKM MEURAXA',
  doctorName: 'dokter klaim',
  claimSubBenefit: '22,5000',
  remark: 'Tester-SGC',
  benefitType: 'RJTL - Rawat Jalan Tingkat Lanjut',

  // Upload — taruh file di folder tests/fixtures/
  uploadFile: path.join(__dirname, 'fixtures', 'DummyPDF.pdf'),
};

// ═══════════════════════════════════════════════════════════════
// TESTS
// ═══════════════════════════════════════════════════════════════
test.describe('Admin Reimbursement', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await login(page, DATA.username, DATA.password);
  });

  test('should create new reimbursement claim', async ({ page }) => {
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
    await page.locator('.css-1b8pb2h-XJ').first().click();
    await page.getByText(DATA.benefitType, { exact: true }).click();
    await page.locator('input[name="AdmissionDate"]').fill(DATA.admissionDate);

    // ── View Plan ──
    await page.getByRole('button', { name: 'View Plan' }).click();
    await page.locator('tr:nth-child(4) > td > .btn').click();

    // ── Checklist Document ──
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Checklist Document' }).click();
    await page.getByRole('row', { name: 'Y Kuitansi' }).locator('#defaultCheckbox').check();
    await page.locator('tr:nth-child(18) > td > .fs--1 > #defaultCheckbox').check();
    await page.getByRole('button', { name: 'save', exact: true }).click();

    // ── Upload Document ──
    await page.getByLabel('Choose File').setInputFiles(DATA.uploadFile);
    await page.getByRole('button', { name: 'Save' }).click();

    // ── Submit ──
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'OK' }).click();

    // Browser tetap terbuka
    await page.pause();
  });
});
