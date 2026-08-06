/**
 * Generate SIT Test Case Excel — Notification Verifikator
 * Run: npx tsx scripts/generate-notification-verifikator-tc.ts
 */
import * as XLSX from 'xlsx';
import path from 'path';

const testCases = [
  // ═══════════════════════════════════════════════════════════
  // POSITIVE CASES
  // ═══════════════════════════════════════════════════════════
  {
    no: 'TC-001',
    scenario: 'Notifikasi diterima secara realtime saat klaim di-assign',
    testData: 'User: Verifikator A, Klaim: [Claim No], Assign by: SPV',
    preCondition: 'Verifikator sudah login, SPV akan assign klaim ke verifikator tersebut',
    testCase: 'Verifikasi notifikasi muncul secara realtime saat SPV assign klaim ke verifikator',
    type: 'Positive',
    steps: '1. Login sebagai Verifikator A\n2. SPV melakukan assign klaim ke Verifikator A\n3. Tanpa refresh, verifikasi pop-up notification muncul secara realtime',
    expectedResult: 'Pop-up notification muncul secara realtime tanpa perlu refresh halaman',
    actualResult: '',
    status: '',
    priority: 'High',
    notes: '',
    attachment: 'Attachment TC-001',
  },
  {
    no: 'TC-002',
    scenario: 'Klik register pada notification — pindah ke halaman klaim',
    testData: 'User: Verifikator, Notification: Register yang telah di-assign',
    preCondition: 'Verifikator sudah menerima notifikasi klaim yang di-assign',
    testCase: 'Verifikasi register yang telah di-assign dapat diklik untuk pindah ke halaman klaim',
    type: 'Positive',
    steps: '1. Login sebagai Verifikator\n2. Terima notifikasi assign klaim\n3. Klik register/link pada notifikasi\n4. Verifikasi halaman klaim terbuka',
    expectedResult: 'Halaman klaim terbuka sesuai register yang diklik pada notifikasi',
    actualResult: '',
    status: '',
    priority: 'High',
    notes: '',
    attachment: 'Attachment TC-002',
  },
  {
    no: 'TC-003',
    scenario: 'Pop-up notification tidak bertumpuk',
    testData: 'User: Verifikator, Multiple assign: 3 klaim berturut-turut',
    preCondition: 'Verifikator sudah login, SPV akan assign multiple klaim',
    testCase: 'Verifikasi pop-up notification yang tampil tidak bertumpuk dalam 1 bagian',
    type: 'Positive',
    steps: '1. Login sebagai Verifikator\n2. SPV assign 3 klaim berturut-turut ke verifikator yang sama\n3. Verifikasi tampilan pop-up notification\n4. Pastikan setiap notifikasi tampil terpisah/tidak overlap',
    expectedResult: 'Pop-up notification tampil terpisah, tidak bertumpuk/overlap satu sama lain. Setiap notifikasi terlihat jelas',
    actualResult: '',
    status: '',
    priority: 'Medium',
    notes: '',
    attachment: 'Attachment TC-003',
  },
  {
    no: 'TC-004',
    scenario: 'Klik pop-up notification — buka halaman baru (new tab)',
    testData: 'User: Verifikator, Notification: pop-up assign klaim',
    preCondition: 'Verifikator menerima pop-up notification',
    testCase: 'Verifikasi klik pop-up notification membuka halaman klaim di new tab',
    type: 'Positive',
    steps: '1. Login sebagai Verifikator\n2. Terima pop-up notification\n3. Klik pop-up notification\n4. Verifikasi halaman baru (new tab) terbuka\n5. Verifikasi halaman klaim yang sesuai tampil di tab baru',
    expectedResult: 'Halaman klaim terbuka di new tab, tab sebelumnya tetap ada',
    actualResult: '',
    status: '',
    priority: 'High',
    notes: '',
    attachment: 'Attachment TC-004',
  },
  {
    no: 'TC-005',
    scenario: 'Notification diterima sesuai verifikator yang di-assign',
    testData: 'User: Verifikator A & B, Klaim di-assign ke Verifikator A saja',
    preCondition: 'Verifikator A dan B sudah login bersamaan',
    testCase: 'Verifikasi notification hanya diterima oleh verifikator yang di-assign (Verifikator A), bukan verifikator lain (B)',
    type: 'Positive',
    steps: '1. Login sebagai Verifikator A di browser 1\n2. Login sebagai Verifikator B di browser 2\n3. SPV assign klaim ke Verifikator A\n4. Verifikasi Verifikator A menerima notifikasi\n5. Verifikasi Verifikator B TIDAK menerima notifikasi',
    expectedResult: 'Hanya Verifikator A yang menerima notification, Verifikator B tidak menerima',
    actualResult: '',
    status: '',
    priority: 'High',
    notes: '',
    attachment: 'Attachment TC-005',
  },
  {
    no: 'TC-006',
    scenario: 'Notification dapat dibuka melalui menu notification',
    testData: 'User: Verifikator, Notification: sudah ada notifikasi sebelumnya',
    preCondition: 'Verifikator sudah pernah menerima notifikasi',
    testCase: 'Verifikasi notification yang sudah diterima dapat dibuka melalui menu notification (icon bell/lonceng)',
    type: 'Positive',
    steps: '1. Login sebagai Verifikator\n2. Klik menu/icon notification\n3. Verifikasi list notification tampil\n4. Verifikasi notifikasi yang pernah diterima ada di list',
    expectedResult: 'Menu notification menampilkan list semua notifikasi yang pernah diterima',
    actualResult: '',
    status: '',
    priority: 'Medium',
    notes: '',
    attachment: 'Attachment TC-006',
  },
  {
    no: 'TC-007',
    scenario: 'Notification tetap tersimpan (tidak ada penghapusan otomatis)',
    testData: 'User: Verifikator, Notifikasi: diterima kemarin',
    preCondition: 'Verifikator sudah menerima notifikasi sebelumnya (misal kemarin)',
    testCase: 'Verifikasi notification tetap tersimpan dan tidak dihapus otomatis oleh sistem',
    type: 'Positive',
    steps: '1. Login sebagai Verifikator\n2. Buka menu notification\n3. Cari notifikasi yang diterima kemarin/sebelumnya\n4. Verifikasi notifikasi masih ada',
    expectedResult: 'Notification lama tetap tersimpan di list, tidak ada penghapusan otomatis',
    actualResult: '',
    status: '',
    priority: 'Medium',
    notes: '',
    attachment: 'Attachment TC-007',
  },
  {
    no: 'TC-008',
    scenario: 'List notification — klik untuk direct move ke page klaim (new tab)',
    testData: 'User: Verifikator, Notification: yang memiliki URL path/Action',
    preCondition: 'Verifikator memiliki notifikasi discharge/charge atau yang memiliki URL path',
    testCase: 'Verifikasi klik notifikasi dari list menu notification membuka halaman klaim di new tab',
    type: 'Positive',
    steps: '1. Login sebagai Verifikator\n2. Buka menu notification\n3. Klik salah satu notifikasi yang memiliki URL path/Action\n4. Verifikasi halaman baru (new tab) terbuka\n5. Verifikasi halaman klaim verifikasi yang sesuai tampil',
    expectedResult: 'Halaman klaim verifikasi terbuka di new tab sesuai register yang diklik',
    actualResult: '',
    status: '',
    priority: 'High',
    notes: 'Khusus untuk notifikasi discharge/charge atau yang memiliki URL path/Action',
    attachment: 'Attachment TC-008',
  },
  {
    no: 'TC-009',
    scenario: 'Title notification format: Delegasi - [Nomor Register]',
    testData: 'User: Verifikator, Register No: REG-001',
    preCondition: 'Verifikator menerima notifikasi assign klaim',
    testCase: 'Verifikasi title notification sesuai format: Delegasi - [Nomor Register]',
    type: 'Positive',
    steps: '1. Login sebagai Verifikator\n2. Terima notifikasi assign\n3. Lihat title notification\n4. Verifikasi format: "Delegasi - [Nomor Register]"',
    expectedResult: 'Title notification tampil dengan format: "Delegasi - REG-001"',
    actualResult: '',
    status: '',
    priority: 'Medium',
    notes: '',
    attachment: 'Attachment TC-009',
  },
  {
    no: 'TC-010',
    scenario: 'Content notification — one batch one claim',
    testData: 'User: Verifikator, Register: one batch one claim, Claim No: CLM-001, Noka: 1101703768029, Nama: DIMAS, Facility: RS A',
    preCondition: 'Register yang di-assign sudah one batch one claim',
    testCase: 'Verifikasi content notification untuk register one batch one claim sesuai format: [Claim No] - [Nomor Kartu] - [Nama Peserta] - [Facility] telah didelegasikan ke [Nama Verifikator]',
    type: 'Positive',
    steps: '1. Login sebagai Verifikator\n2. SPV assign register one batch one claim\n3. Terima notifikasi\n4. Verifikasi content notification sesuai format',
    expectedResult: 'Content notification: "CLM-001 - 1101703768029 - DIMAS - RS A telah didelegasikan ke [Nama Verifikator]"',
    actualResult: '',
    status: '',
    priority: 'Medium',
    notes: '',
    attachment: 'Attachment TC-010',
  },
  {
    no: 'TC-011',
    scenario: 'Content notification — belum one batch one claim (multiple klaim)',
    testData: 'User: Verifikator, Register: belum one batch one claim, Jumlah klaim: 5',
    preCondition: 'Register yang di-assign belum one batch one claim (berisi multiple klaim)',
    testCase: 'Verifikasi content notification untuk register multiple klaim sesuai format: [Jumlah klaim] klaim telah didelegasikan ke [Nama Verifikator]',
    type: 'Positive',
    steps: '1. Login sebagai Verifikator\n2. SPV assign register yang berisi multiple klaim\n3. Terima notifikasi\n4. Verifikasi content notification sesuai format',
    expectedResult: 'Content notification: "5 klaim telah didelegasikan ke [Nama Verifikator]"',
    actualResult: '',
    status: '',
    priority: 'Medium',
    notes: '',
    attachment: 'Attachment TC-011',
  },

  // ═══════════════════════════════════════════════════════════
  // NEGATIVE CASES
  // ═══════════════════════════════════════════════════════════
  {
    no: 'TC-012',
    scenario: 'Verifikator lain tidak menerima notification yang bukan miliknya',
    testData: 'User: Verifikator B, Klaim di-assign ke Verifikator A',
    preCondition: 'Klaim di-assign ke Verifikator A, Verifikator B sudah login',
    testCase: 'Verifikasi Verifikator B tidak menerima notifikasi klaim yang di-assign ke Verifikator A',
    type: 'Negative',
    steps: '1. Login sebagai Verifikator B\n2. SPV assign klaim ke Verifikator A\n3. Tunggu 30 detik\n4. Verifikasi Verifikator B TIDAK menerima pop-up notification\n5. Cek menu notification — tidak ada notifikasi baru',
    expectedResult: 'Verifikator B TIDAK menerima notification apapun untuk klaim yang di-assign ke Verifikator A',
    actualResult: '',
    status: '',
    priority: 'High',
    notes: '',
    attachment: 'Attachment TC-012',
  },
  {
    no: 'TC-013',
    scenario: 'Notification tidak muncul jika user belum login',
    testData: 'User: Verifikator (belum login), Klaim di-assign',
    preCondition: 'Verifikator belum login ke sistem, SPV assign klaim',
    testCase: 'Verifikasi notification muncul setelah verifikator login (bukan hilang)',
    type: 'Negative',
    steps: '1. Pastikan Verifikator belum login\n2. SPV assign klaim ke Verifikator tersebut\n3. Verifikator login ke sistem\n4. Cek menu notification\n5. Verifikasi notifikasi tersimpan dan tampil di list',
    expectedResult: 'Notification tetap tersimpan dan tampil di menu notification setelah verifikator login, meskipun saat assign verifikator belum online',
    actualResult: '',
    status: '',
    priority: 'Medium',
    notes: '',
    attachment: 'Attachment TC-013',
  },
  {
    no: 'TC-014',
    scenario: 'Klik notification yang tidak memiliki URL path — tidak buka new tab',
    testData: 'User: Verifikator, Notification: tanpa URL path/Action',
    preCondition: 'Ada notifikasi yang tidak memiliki URL path/Action di list',
    testCase: 'Verifikasi klik notifikasi tanpa URL path tidak membuka new tab (hanya mark as read atau tidak ada action)',
    type: 'Negative',
    steps: '1. Login sebagai Verifikator\n2. Buka menu notification\n3. Klik notifikasi yang tidak memiliki URL path/Action\n4. Verifikasi tidak ada new tab yang terbuka',
    expectedResult: 'Tidak ada new tab terbuka, notifikasi hanya di-mark read atau tidak ada navigasi',
    actualResult: '',
    status: '',
    priority: 'Low',
    notes: 'Khusus notifikasi non-discharge/non-charge yang tidak memiliki URL path',
    attachment: 'Attachment TC-014',
  },
  {
    no: 'TC-015',
    scenario: 'User non-verifikator tidak menerima notification delegasi',
    testData: 'User: Admin Klaim / SPV (bukan verifikator)',
    preCondition: 'User login sebagai Admin Klaim atau SPV',
    testCase: 'Verifikasi user non-verifikator tidak menerima pop-up notification delegasi klaim',
    type: 'Negative',
    steps: '1. Login sebagai Admin Klaim\n2. SPV assign klaim ke Verifikator A\n3. Tunggu 30 detik\n4. Verifikasi Admin Klaim TIDAK menerima pop-up notification delegasi',
    expectedResult: 'Admin Klaim / SPV TIDAK menerima pop-up notification delegasi yang ditujukan ke verifikator',
    actualResult: '',
    status: '',
    priority: 'Medium',
    notes: '',
    attachment: 'Attachment TC-015',
  },
  {
    no: 'TC-016',
    scenario: 'Title notification tidak sesuai format',
    testData: 'User: Verifikator, Register: REG-001',
    preCondition: 'Verifikator menerima notifikasi assign',
    testCase: 'Verifikasi title notification TIDAK menampilkan format yang salah (misal: tanpa prefix "Delegasi -")',
    type: 'Negative',
    steps: '1. Login sebagai Verifikator\n2. Terima notifikasi assign\n3. Lihat title notification\n4. Verifikasi title HARUS mengandung "Delegasi - [Nomor Register]"\n5. Pastikan bukan format lain',
    expectedResult: 'Title notification HARUS sesuai format "Delegasi - [Nomor Register]". Jika format berbeda = bug',
    actualResult: '',
    status: '',
    priority: 'Medium',
    notes: 'Validasi format title',
    attachment: 'Attachment TC-016',
  },
  {
    no: 'TC-017',
    scenario: 'Notification tidak terhapus setelah diklik/dibaca',
    testData: 'User: Verifikator, Notification: sudah diklik sebelumnya',
    preCondition: 'Verifikator sudah pernah klik/buka notifikasi',
    testCase: 'Verifikasi notification tidak hilang/terhapus dari list setelah diklik/dibaca',
    type: 'Negative',
    steps: '1. Login sebagai Verifikator\n2. Buka menu notification\n3. Klik salah satu notifikasi\n4. Kembali ke menu notification\n5. Verifikasi notifikasi yang diklik masih ada di list',
    expectedResult: 'Notification tetap ada di list setelah diklik, tidak terhapus otomatis',
    actualResult: '',
    status: '',
    priority: 'Medium',
    notes: 'Sesuai AC: tidak ada penghapusan otomatis',
    attachment: 'Attachment TC-017',
  },
  {
    no: 'TC-018',
    scenario: 'Pop-up notification muncul bersamaan (stress test) — tidak crash',
    testData: 'User: Verifikator, Assign: 10 klaim sekaligus',
    preCondition: 'Verifikator sudah login, SPV akan assign banyak klaim sekaligus',
    testCase: 'Verifikasi sistem tidak crash ketika banyak notification muncul bersamaan',
    type: 'Negative',
    steps: '1. Login sebagai Verifikator\n2. SPV assign 10 klaim berturut-turut dalam waktu singkat\n3. Verifikasi pop-up notification muncul tanpa crash\n4. Verifikasi tidak ada notification yang hilang',
    expectedResult: 'Semua notification muncul tanpa crash/error, tidak ada notification yang hilang, pop-up tidak bertumpuk',
    actualResult: '',
    status: '',
    priority: 'Low',
    notes: 'Stress test / edge case',
    attachment: 'Attachment TC-018',
  },
];

// Build workbook
const wb = XLSX.utils.book_new();

// Header info
const headerData = [
  ['TEST CASE — Notification Verifikator (SIT)'],
  [''],
  ['No', ': NM-xxxx', '', '', '', '', 'Test Design by', ': QA Team'],
  ['Test Priority', ': Medium', '', '', '', '', 'Test Execute by', ': QA Team'],
  ['Application Address', ': http://claim.dev.inhealth.co.id', '', '', '', '', 'Test Execution date', ': '],
  ['Description', ': Interaksi melalui notification verifikator untuk langsung move ke halaman claim'],
  [''],
];

// Column headers
const colHeaders = [
  'No', 'Test Scenario', 'Test Data', 'Pre Conditions', 'Test Case',
  'Type', 'Test Case Steps', 'Expected Results', 'Actual Result',
  'Status', 'Priority', 'Notes', 'Attachment',
];

// Data rows
const dataRows = testCases.map(tc => [
  tc.no, tc.scenario, tc.testData, tc.preCondition, tc.testCase,
  tc.type, tc.steps, tc.expectedResult, tc.actualResult,
  tc.status, tc.priority, tc.notes, tc.attachment,
]);

// Combine all
const allRows = [...headerData, colHeaders, ...dataRows];
const ws = XLSX.utils.aoa_to_sheet(allRows);

// Set column widths
ws['!cols'] = [
  { wch: 8 },   // No
  { wch: 55 },  // Test Scenario
  { wch: 55 },  // Test Data
  { wch: 55 },  // Pre Conditions
  { wch: 60 },  // Test Case
  { wch: 10 },  // Type
  { wch: 70 },  // Steps
  { wch: 65 },  // Expected Results
  { wch: 30 },  // Actual Result
  { wch: 10 },  // Status
  { wch: 10 },  // Priority
  { wch: 40 },  // Notes
  { wch: 20 },  // Attachment
];

XLSX.utils.book_append_sheet(wb, ws, 'Test Cases');

// Write file
const outputPath = path.resolve(__dirname, '..', 'test-results', 'Notification_Verifikator_SIT.xlsx');
XLSX.writeFile(wb, outputPath);
console.log(`\n✅ Excel generated: ${outputPath}\n`);
console.log(`Total test cases: ${testCases.length} (Positive: ${testCases.filter(t => t.type === 'Positive').length}, Negative: ${testCases.filter(t => t.type === 'Negative').length})`);
