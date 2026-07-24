import { test, expect } from '@playwright/test';
import { login } from './commands/login';
import path from 'path';

// ─── Test Data (easy to change) ─────────────────────────────
const username = 'tester.admin';
const password = process.env.PASSWORD1 || '';
const nomorPeserta = '1101703768029';

// Receive Date — default hari ini (format: YYYY-MM-DD)
const receiveDate = new Date().toISOString().split('T')[0];

// Admission Date — ubah sesuai kebutuhan
const admissionDate = '2026-07-10';

// Data Peserta
const phone = '089662284227';
const email = 'syaiful.gauci@inhealth.co.id';
const icd10Code = 'Z00.0';
const providerName = 'PKM MEURAXA';
const doctorName = 'dokter klaim';
const claimSubBenefit = '22,5000';
const remark = 'Tester-SGC';
const benefitType = 'RJTL - Rawat Jalan Tingkat Lanjut';

// Upload file — letakkan file di folder tests/fixtures/
const uploadFile = path.join(__dirname, 'fixtures', 'DummyPDF.pdf');

// ─── Tests ───────────────────────────────────────────────────
test.describe('Admin Reimbursement', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await login(page, username, password);
  });

  test('should create new reimbursement claim', async ({ page }) => {
    // Navigasi ke Claim Reimbursement
    await page.getByText('Reimbursement').click();
    await page.getByText('Claim Reimbursement').click();

    // Klik Add Reimbursement
    await page.getByRole('button', { name: 'Add Reimbursement' }).click();

    // Search nomor peserta
    await page.getByRole('textbox', { name: 'Type here..' }).fill(nomorPeserta);
    await page.getByRole('button', { name: 'Search' }).click();

    // Receive Date (default: hari ini)
    await page.locator('input[name="ReceiveDate"]').fill(receiveDate);

    // Phone & Email
    await page.locator('input[name="Phone"]').fill(phone);
    await page.locator('input[name="Email"]').fill(email);
    await page.locator('input[name="Email2"]').fill(email);

    // ICD10
    await page.getByRole('button', { name: 'ICD10' }).click();
    await page.getByRole('textbox', { name: 'Text input with dropdown' }).fill(icd10Code);
    await page.locator('.fa-sharp').first().click();

    // Provider
    await page.getByRole('button', { name: 'Provider', exact: true }).click();
    await page.getByRole('textbox', { name: 'Type here...' }).fill(providerName);
    await page.locator('.input-group-text').click();
    await page.locator('#place-of-service-table').getByRole('button').first().click();

    // Doctor
    await page.locator('input[name="doctor"]').fill(doctorName);

    // Claim Sub Benefit
    await page.locator('input[name="ClaimSubBenefit"]').fill(claimSubBenefit);

    // Remark
    await page.locator('textarea[name="Remark"]').fill(remark);

    // Benefit Type
    await page.locator('.css-1b8pb2h-XJ').first().click();
    await page.getByText(benefitType, { exact: true }).click();

    // Admission Date
    await page.locator('input[name="AdmissionDate"]').fill(admissionDate);

    // View Plan
    await page.getByRole('button', { name: 'View Plan' }).click();
    await page.locator('tr:nth-child(4) > td > .btn').click();

    // Checklist Document
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Checklist Document' }).click();
    await page.getByRole('row', { name: 'Y Kuitansi' }).locator('#defaultCheckbox').check();
    await page.locator('tr:nth-child(18) > td > .fs--1 > #defaultCheckbox').check();
    await page.getByRole('button', { name: 'save', exact: true }).click();

    // Upload Document (file dari folder fixtures)
    await page.getByLabel('Choose File').setInputFiles(uploadFile);
    await page.getByRole('button', { name: 'Save' }).click();

    // Final Save --KLIK BUTTON-- SUBMIT -- dan -- OK --
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'OK' }).click();

    // Browser tetap terbuka -- PAUSE --
    await page.pause();
  });
});
