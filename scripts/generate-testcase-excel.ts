/**
 * Generate Test Case Excel for NM-1434: Save Without Autobatch (Negative Cases)
 * Run: npx tsx scripts/generate-testcase-excel.ts
 */
import * as XLSX from 'xlsx';
import path from 'path';

const testCases = [
  {
    no: 'NEG-01',
    scenario: 'Save tanpa nomor peserta',
    testData: 'Nomor peserta: (kosong)',
    preCondition: 'User sudah login sebagai admin klaim dan berada di halaman Add Reimbursement',
    testCase: 'Admin klaim melakukan Save tanpa mengisi nomor peserta',
    type: 'Negative',
    steps: '1. Login sebagai admin klaim (tester.admin)\n2. Masuk ke menu Reimbursement > Claim Reimbursement\n3. Klik Add Reimbursement\n4. Tidak mengisi nomor peserta\n5. Klik Save',
    expectedResult: 'Validasi gagal, muncul error message, klaim tidak tersimpan',
    actualResult: '',
    status: '',
    priority: 'High',
    notes: 'AC: Validasi saat save mengikuti aturan existing yang sudah berlaku',
  },
  {
    no: 'NEG-02',
    scenario: 'Save tanpa ICD10',
    testData: 'Noka: 1101733464183, ICD10: (kosong)',
    preCondition: 'User sudah login dan peserta sudah di-search',
    testCase: 'Admin klaim melakukan Save tanpa mengisi ICD10 (mandatory field)',
    type: 'Negative',
    steps: '1. Login sebagai admin klaim\n2. Masuk ke menu Reimbursement > Claim Reimbursement\n3. Add Reimbursement\n4. Search peserta\n5. Isi form TANPA ICD10\n6. Klik Save',
    expectedResult: 'Validasi gagal, muncul error bahwa ICD10 wajib diisi',
    actualResult: '',
    status: '',
    priority: 'High',
    notes: 'AC: Validasi saat save mengikuti aturan existing',
  },
  {
    no: 'NEG-03',
    scenario: 'Save tanpa upload document',
    testData: 'Noka: 1101733464183, Document: (tidak upload)',
    preCondition: 'User sudah login dan form klaim sudah diisi lengkap kecuali document',
    testCase: 'Admin klaim melakukan Save tanpa upload document pendukung',
    type: 'Negative',
    steps: '1. Login sebagai admin klaim\n2. Masuk ke Reimbursement > Claim Reimbursement\n3. Add Reimbursement\n4. Isi semua form lengkap\n5. SKIP upload document\n6. Klik Save',
    expectedResult: 'Validasi gagal atau muncul warning bahwa document wajib diupload',
    actualResult: '',
    status: '',
    priority: 'Medium',
    notes: 'AC: Validasi saat save mengikuti aturan existing',
  },
  {
    no: 'NEG-04',
    scenario: 'Save dengan ClaimSubBenefit = 0',
    testData: 'Noka: 1101733464183, ClaimSubBenefit: 0',
    preCondition: 'User sudah login dan peserta sudah di-search',
    testCase: 'Admin klaim melakukan Save dengan amount klaim = 0',
    type: 'Negative',
    steps: '1. Login sebagai admin klaim\n2. Masuk ke Reimbursement > Claim Reimbursement\n3. Add Reimbursement\n4. Search peserta\n5. Isi ClaimSubBenefit dengan 0\n6. Klik Save',
    expectedResult: 'Validasi gagal, amount harus lebih dari 0',
    actualResult: '',
    status: '',
    priority: 'Medium',
    notes: 'AC: Validasi saat save mengikuti aturan existing',
  },
  {
    no: 'NEG-05',
    scenario: 'Edit klaim yang sudah di-submit',
    testData: 'Noka: 1101733464183 (klaim sudah submitted)',
    preCondition: 'Klaim sudah pernah di-submit sebelumnya',
    testCase: 'Admin klaim mencoba edit klaim yang sudah di-submit',
    type: 'Negative',
    steps: '1. Login sebagai admin klaim\n2. Masuk ke Reimbursement > Claim Reimbursement\n3. Search klaim yang sudah di-submit\n4. Coba klik Edit\n5. Coba ubah data dan Save',
    expectedResult: 'Tombol Edit tidak tersedia atau form readonly, tidak bisa save perubahan',
    actualResult: '',
    status: '',
    priority: 'High',
    notes: 'AC: Admin Klaim dapat edit kapanpun SELAMA BELUM di-submit',
  },
  {
    no: 'NEG-06',
    scenario: 'Klaim saved tidak masuk antrian auto batch',
    testData: 'Noka: 1101733464183 (klaim status saved/draft)',
    preCondition: 'Klaim sudah di-save (belum submit)',
    testCase: 'Verifikasi klaim yang baru di-save TIDAK muncul di antrian auto batch pipeline',
    type: 'Negative',
    steps: '1. Login sebagai admin klaim\n2. Save klaim reimburse (tanpa submit)\n3. Cek list klaim\n4. Verifikasi status klaim bukan "Batched"/"In Process"/"Processed"\n5. Pastikan klaim TIDAK ada di pipeline batch',
    expectedResult: 'Klaim saved tidak muncul di antrian auto batch, status = draft/saved',
    actualResult: '',
    status: '',
    priority: 'High',
    notes: 'AC: Klaim yang baru di-save tidak muncul di antrian auto batch. Yang masuk pipeline = yang di-submit saja',
  },
];

// Build workbook
const wb = XLSX.utils.book_new();

// Header info
const headerData = [
  ['TEST CASE [New Micare Klaim]'],
  ['MENU : Button Save Reimbursement — NEGATIVE CASES'],
  [''],
  ['No', '', ': NM-1434', '', '', 'Test Design by', ': Syaiful Gauci'],
  ['Test Priority', '', ': High', '', '', 'Test Execute by', ': Syaiful Gauci'],
  ['Application Address', '', ': http://claim.dev.inhealth.co.id', '', '', 'Test Execution date', ': '],
  ['Description', '', ': Pemisahan antara Button Save dan Submit — Negative Cases'],
  [''],
];

// Column headers
const colHeaders = [
  'No', 'Test Scenario', 'Test Data', 'Pre Conditions', 'Test Case',
  'Type', 'Test Case Steps', 'Expected Results', 'Actual Result',
  'Status', 'Priority', 'Notes',
];

// Data rows
const dataRows = testCases.map(tc => [
  tc.no, tc.scenario, tc.testData, tc.preCondition, tc.testCase,
  tc.type, tc.steps, tc.expectedResult, tc.actualResult,
  tc.status, tc.priority, tc.notes,
]);

// Combine all
const allRows = [...headerData, colHeaders, ...dataRows];
const ws = XLSX.utils.aoa_to_sheet(allRows);

// Set column widths
ws['!cols'] = [
  { wch: 8 },   // No
  { wch: 35 },  // Test Scenario
  { wch: 40 },  // Test Data
  { wch: 45 },  // Pre Conditions
  { wch: 50 },  // Test Case
  { wch: 10 },  // Type
  { wch: 60 },  // Steps
  { wch: 50 },  // Expected Results
  { wch: 30 },  // Actual Result
  { wch: 10 },  // Status
  { wch: 10 },  // Priority
  { wch: 50 },  // Notes
];

XLSX.utils.book_append_sheet(wb, ws, 'Test Cases');

// Write file
const outputPath = path.resolve(__dirname, '..', 'test-results', 'NM-1434_Negative_TestCases.xlsx');
XLSX.writeFile(wb, outputPath);
console.log(`\n✅ Excel generated: ${outputPath}\n`);
