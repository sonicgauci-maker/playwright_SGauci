# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 02_KLAIM/cc_admin_reimbursement.spec.ts >> Klaim Reimbursement Reguler >> Input Klaim Reimbursement
- Location: tests/02_KLAIM/cc_admin_reimbursement.spec.ts:44:7

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('row', { name: 'Rawat Jalan' }).getByRole('button')

```

# Test source

```ts
  1   | import { test, expect } from '../fixtures/base';
  2   | import { login } from '../commands/loginklaim';
  3   | import path from 'path';
  4   | 
  5   | // ═══════════════════════════════════════════════════════════════
  6   | // TEST DATA — ubah di sini saja
  7   | // ═══════════════════════════════════════════════════════════════
  8   | const DATA = {
  9   |   // Credentials
  10  |   username: 'tester.admin',
  11  |   password: process.env.PASSWORD1 || '',
  12  | 
  13  |   // Peserta
  14  |   nomorPeserta: '1001736785529',
  15  |   phone: '089662284227',
  16  |   email: 'indra.kurniawan@inhealth.co.id',
  17  | 
  18  |   // Tanggal Receive Date & Admission Date
  19  |   receiveDate: new Date().toISOString().split('T')[0], // default: hari ini
  20  |   admissionDate: '2026-07-28', // Tanggal Pelayanan /INDATE
  21  |   // Klaim
  22  |   icd10Code: 'A00.0',
  23  |   providerName: 'PKM MEURAXA',
  24  |   doctorName: 'dokter klaim',
  25  |   claimSubBenefit: '22,5000',
  26  |   remark: 'Tester-PW-SGC',
  27  |   benefitType: 'RJTL - Rawat Jalan Tingkat Lanjut',
  28  |   planName: 'Rawat Jalan',  // Nama plan yang dipilih di View Plan📌
  29  | 
  30  |   // Upload — taruh file di folder tests/fixtures/
  31  |   uploadFile: path.join(__dirname, '..', 'fixtures', 'DummyPDF.pdf'),
  32  | };
  33  | 
  34  | // ═══════════════════════════════════════════════════════════════
  35  | // TESTS
  36  | // ═══════════════════════════════════════════════════════════════
  37  | test.describe('Klaim Reimbursement Reguler', () => {
  38  |   test.setTimeout(180000);
  39  | 
  40  |   test.beforeEach(async ({ page }) => {
  41  |     await login(page, DATA.username, DATA.password);
  42  |   });
  43  | 
  44  |   test('Input Klaim Reimbursement', async ({ page }) => {
  45  |     // ── Navigasi ke Claim Reimbursement ──
  46  |     await page.getByText('Reimbursement').click();
  47  |     await page.getByText('Claim Reimbursement').click();
  48  | 
  49  |     // ── Add Reimbursement ──
  50  |     await page.getByRole('button', { name: 'Add Reimbursement' }).click();
  51  | 
  52  |     // ── Search Peserta ──
  53  |     await page.getByRole('textbox', { name: 'Type here..' }).fill(DATA.nomorPeserta);
  54  |     await page.getByRole('button', { name: 'Search' }).click();
  55  | 
  56  |     // ── Form Data ──
  57  |     await page.locator('input[name="ReceiveDate"]').fill(DATA.receiveDate);
  58  |     await page.locator('input[name="Phone"]').fill(DATA.phone);
  59  |     await page.locator('input[name="Email"]').fill(DATA.email);
  60  |     await page.locator('input[name="Email2"]').fill(DATA.email);
  61  | 
  62  |     // ── ICD10 ──
  63  |     await page.getByRole('button', { name: 'ICD10' }).click();
  64  |     await page.getByRole('textbox', { name: 'Text input with dropdown' }).fill(DATA.icd10Code);
  65  |     await page.locator('.fa-sharp').first().click();
  66  | 
  67  |     // ── Provider ──
  68  |     await page.getByRole('button', { name: 'Provider', exact: true }).click();
  69  |     await page.getByRole('textbox', { name: 'Type here...' }).fill(DATA.providerName);
  70  |     await page.locator('.input-group-text').click();
  71  |     await page.locator('#place-of-service-table').getByRole('button').first().click();
  72  | 
  73  |     // ── Doctor & Benefit ──
  74  |     await page.locator('input[name="doctor"]').fill(DATA.doctorName);
  75  |     await page.locator('input[name="ClaimSubBenefit"]').fill(DATA.claimSubBenefit);
  76  |     await page.locator('textarea[name="Remark"]').fill(DATA.remark);
  77  | 
  78  |     // ── Benefit Type & Admission Date ──
  79  |     // Klik dropdown TKP Type (react-select)
  80  |     const tkpContainer = page.locator(':has(> :text("TKP Type"))').last();
  81  |     await tkpContainer.getByRole('combobox').click();
  82  |     await page.getByText(DATA.benefitType, { exact: true }).click();
  83  |     await page.locator('input[name="AdmissionDate"]').fill(DATA.admissionDate);
  84  | 
  85  |     // ── View Plan ──
  86  |     await page.getByRole('button', { name: 'View Plan' }).click();
  87  |     // Klik button select di row plan yang sesuai
> 88  |     await page.getByRole('row', { name: DATA.planName }).getByRole('button').click();
      |                                                                              ^ Error: locator.click: Target page, context or browser has been closed
  89  | 
  90  |     // ── Checklist Document ──
  91  |     await page.getByRole('checkbox').check();
  92  |     await page.getByRole('button', { name: 'Checklist Document' }).click();
  93  |     // Centang document "Kuitansi" di modal checklist
  94  |     await page.getByRole('row', { name: /Kuitansi/ }).getByRole('checkbox').check();
  95  |     await page.getByRole('button', { name: 'save', exact: true }).click();
  96  | 
  97  |     // ── Upload Document ──
  98  |     await page.getByLabel('Choose File').setInputFiles(DATA.uploadFile);
  99  |     await page.getByRole('button', { name: 'Save', exact: true }).click();
  100 | 
  101 |     // ── Submit ──
  102 |     // await page.getByRole('button', { name: 'Submit' }).click();
  103 |     // await page.getByRole('button', { name: 'Submit' }).click();
  104 | 
  105 |     // Browser tetap terbuka
  106 |     await page.pause();
  107 |   });
  108 | });
  109 | 
```