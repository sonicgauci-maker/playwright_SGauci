/**
 * Generate SIT Test Case Excel — Dashboard Monitoring Verifikator
 * Run: npx tsx scripts/generate-dashboard-monitoring-tc.ts
 */
import * as XLSX from 'xlsx';
import path from 'path';

const testCases = [
  // ═══════════════════════════════════════════════════════════
  // POSITIVE CASES
  // ═══════════════════════════════════════════════════════════
  {
    no: 'TC-001',
    scenario: 'View Dashboard Monitoring — Tab Daily',
    testData: 'User: SPV / Ka Kops / Kantor Pusat',
    preCondition: 'User sudah login ke sistem dengan role SPV/Ka Kops/Kantor Pusat',
    testCase: 'User membuka halaman Dashboard Monitoring dan melihat tab Daily sebagai default',
    type: 'Positive',
    steps: '1. Login ke sistem sebagai SPV/Ka Kops/Kantor Pusat\n2. Navigasi ke menu Dashboard Monitoring\n3. Verifikasi halaman dashboard tampil',
    expectedResult: 'Dashboard tampil dengan tab Daily sebagai default, menampilkan list verifikator yang terdaftar dalam 1 Kantor Pusat beserta informasi: nama verifikator, date, daily load, target bobot, total achieved, status',
  },
  {
    no: 'TC-002',
    scenario: 'View Dashboard Monitoring — Tab Summary',
    testData: 'User: SPV / Ka Kops / Kantor Pusat',
    preCondition: 'User sudah login dan berada di halaman Dashboard Monitoring',
    testCase: 'User berpindah ke tab Summary untuk melihat ringkasan kinerja verifikator',
    type: 'Positive',
    steps: '1. Buka halaman Dashboard Monitoring\n2. Klik tab Summary\n3. Verifikasi konten tab Summary',
    expectedResult: 'Tab Summary tampil dengan data summary kinerja verifikator dalam 1 bulan, tidak ada action button (hanya view & download)',
  },
  {
    no: 'TC-003',
    scenario: 'Dashboard menampilkan semua verifikator dalam 1 Kantor Pusat',
    testData: 'User: SPV, Kantor Pusat: [sesuai environment]',
    preCondition: 'User sudah login dan terdaftar di Kantor Pusat tertentu',
    testCase: 'Verifikasi semua nama verifikator yang terdaftar di Kantor Pusat yang sama tampil di dashboard',
    type: 'Positive',
    steps: '1. Login sebagai SPV\n2. Buka Dashboard Monitoring\n3. Cek list verifikator yang tampil\n4. Bandingkan dengan data master verifikator di Kantor Pusat tersebut',
    expectedResult: 'Semua verifikator yang terdaftar dalam 1 Kantor Pusat yang sama tampil di dashboard',
  },
  {
    no: 'TC-004',
    scenario: 'Dashboard renewal/reset setiap hari',
    testData: 'User: SPV, Date: hari ini vs kemarin',
    preCondition: 'Dashboard sudah pernah diakses sebelumnya',
    testCase: 'Verifikasi dashboard melakukan renewal/reset secara dinamis setiap hari',
    type: 'Positive',
    steps: '1. Akses dashboard hari ini\n2. Catat data daily load\n3. Akses kembali keesokan harinya\n4. Verifikasi data sudah ter-reset/renewal',
    expectedResult: 'Dashboard tampil renewal/reset secara dinamis setiap hari, data daily load ter-reset untuk hari baru',
  },
  {
    no: 'TC-005',
    scenario: 'Default filter tab Daily — start today end today',
    testData: 'User: SPV, Date: today',
    preCondition: 'User sudah login dan buka Dashboard Monitoring',
    testCase: 'Verifikasi default filter pada tab Daily menampilkan data hari ini',
    type: 'Positive',
    steps: '1. Buka Dashboard Monitoring\n2. Cek tab Daily\n3. Verifikasi filter tanggal default',
    expectedResult: 'Filter tab Daily default menampilkan start date = today dan end date = today',
  },
  {
    no: 'TC-006',
    scenario: 'Filter tab Daily dengan rentang tanggal valid (< 31 hari)',
    testData: 'User: SPV, Start: 01/07/2026, End: 15/07/2026',
    preCondition: 'User berada di tab Daily Dashboard Monitoring',
    testCase: 'User melakukan filter dengan rentang tanggal kurang dari 31 hari',
    type: 'Positive',
    steps: '1. Buka tab Daily\n2. Set start date: 01/07/2026\n3. Set end date: 15/07/2026\n4. Klik filter/apply\n5. Verifikasi data yang tampil',
    expectedResult: 'Data tampil sesuai rentang tanggal yang dipilih (15 hari), menampilkan daily load verifikator dalam rentang tersebut',
  },
  {
    no: 'TC-007',
    scenario: 'SPV set verifikator leave di tab Daily',
    testData: 'User: SPV, Verifikator: [nama], Status: Leave',
    preCondition: 'User login sebagai SPV, berada di tab Daily',
    testCase: 'SPV mengubah status verifikator menjadi Leave',
    type: 'Positive',
    steps: '1. Buka tab Daily\n2. Cari verifikator yang ingin diubah statusnya\n3. Klik setting/toggle status\n4. Set status ke Leave\n5. Verifikasi perubahan status',
    expectedResult: 'Status verifikator berubah menjadi Leave, verifikator tidak menerima distribusi klaim baru',
  },
  {
    no: 'TC-008',
    scenario: 'SPV set verifikator aktif di tab Daily',
    testData: 'User: SPV, Verifikator: [nama], Status: Aktif',
    preCondition: 'Verifikator sebelumnya berstatus Leave',
    testCase: 'SPV mengubah status verifikator dari Leave menjadi Aktif',
    type: 'Positive',
    steps: '1. Buka tab Daily\n2. Cari verifikator yang berstatus Leave\n3. Klik setting/toggle status\n4. Set status ke Aktif\n5. Verifikasi perubahan status',
    expectedResult: 'Status verifikator berubah menjadi Aktif, verifikator kembali menerima distribusi klaim',
  },
  {
    no: 'TC-009',
    scenario: 'SPV melakukan manual distribusi di tab Daily',
    testData: 'User: SPV, Klaim: [nomor klaim], Target verifikator: [nama]',
    preCondition: 'User login sebagai SPV, ada klaim yang belum didistribusi',
    testCase: 'SPV melakukan manual distribusi klaim ke verifikator tertentu',
    type: 'Positive',
    steps: '1. Buka tab Daily\n2. Klik tombol Manual Distribusi\n3. Pilih klaim yang akan didistribusi\n4. Pilih verifikator target\n5. Konfirmasi distribusi\n6. Verifikasi klaim terdistribusi',
    expectedResult: 'Klaim berhasil didistribusi ke verifikator target, daily load verifikator bertambah',
  },
  {
    no: 'TC-010',
    scenario: 'Download summary kinerja verifikator di tab Summary',
    testData: 'User: SPV, Periode: 1 bulan',
    preCondition: 'User berada di tab Summary, data kinerja tersedia',
    testCase: 'User mendownload summary kinerja verifikator dalam 1 bulan',
    type: 'Positive',
    steps: '1. Buka tab Summary\n2. Klik tombol Download\n3. Verifikasi file terdownload',
    expectedResult: 'File summary kinerja verifikator dalam 1 bulan berhasil didownload',
  },
  {
    no: 'TC-011',
    scenario: 'Dashboard menampilkan real-time load verifikator',
    testData: 'User: SPV, Verifikator: [nama yang sedang proses klaim]',
    preCondition: 'Ada klaim baru yang sedang diproses oleh verifikator',
    testCase: 'Verifikasi dashboard update secara real-time saat ada klaim baru masuk',
    type: 'Positive',
    steps: '1. Buka Dashboard Monitoring\n2. Catat daily load verifikator saat ini\n3. Submit klaim baru yang masuk ke verifikator tersebut\n4. Cek dashboard kembali tanpa refresh manual',
    expectedResult: 'Dashboard update secara real-time, daily load verifikator bertambah sesuai klaim baru yang masuk',
  },
  {
    no: 'TC-012',
    scenario: 'Dashboard menampilkan status verifikator belum achieve target',
    testData: 'User: SPV, Verifikator: [nama yang belum achieve]',
    preCondition: 'Ada verifikator yang total achieved < target bobot',
    testCase: 'Verifikasi informasi ditampilkan saat verifikator belum achieve target',
    type: 'Positive',
    steps: '1. Buka Dashboard Monitoring tab Daily\n2. Cari verifikator yang total achieved < target bobot\n3. Verifikasi indikator/informasi ditampilkan',
    expectedResult: 'Dashboard menampilkan informasi/indikator jelas bahwa verifikator belum achieve target (misal: warna merah, icon warning, atau label khusus)',
  },
  {
    no: 'TC-013',
    scenario: 'Filter tab Daily dengan rentang tepat 31 hari',
    testData: 'User: SPV, Start: 01/07/2026, End: 31/07/2026',
    preCondition: 'User berada di tab Daily',
    testCase: 'User melakukan filter dengan rentang tepat 31 hari (batas maksimal)',
    type: 'Positive',
    steps: '1. Buka tab Daily\n2. Set start date: 01/07/2026\n3. Set end date: 31/07/2026\n4. Klik filter/apply',
    expectedResult: 'Filter berhasil diterapkan, data tampil untuk rentang 31 hari',
  },

  // ═══════════════════════════════════════════════════════════
  // NEGATIVE CASES
  // ═══════════════════════════════════════════════════════════
  {
    no: 'TC-014',
    scenario: 'Filter tab Daily dengan rentang lebih dari 31 hari',
    testData: 'User: SPV, Start: 01/06/2026, End: 31/07/2026 (61 hari)',
    preCondition: 'User berada di tab Daily Dashboard Monitoring',
    testCase: 'User mencoba filter dengan rentang lebih dari 31 hari',
    type: 'Negative',
    steps: '1. Buka tab Daily\n2. Set start date: 01/06/2026\n3. Set end date: 31/07/2026 (rentang 61 hari)\n4. Klik filter/apply',
    expectedResult: 'Sistem menolak filter, menampilkan pesan error bahwa maksimal rentang filter adalah 31 hari',
  },
  {
    no: 'TC-015',
    scenario: 'Filter tab Daily dengan end date lebih kecil dari start date',
    testData: 'User: SPV, Start: 15/07/2026, End: 01/07/2026',
    preCondition: 'User berada di tab Daily',
    testCase: 'User memasukkan end date lebih kecil dari start date',
    type: 'Negative',
    steps: '1. Buka tab Daily\n2. Set start date: 15/07/2026\n3. Set end date: 01/07/2026\n4. Klik filter/apply',
    expectedResult: 'Sistem menolak filter, menampilkan pesan error bahwa end date tidak boleh lebih kecil dari start date',
  },
  {
    no: 'TC-016',
    scenario: 'User non-SPV mencoba set verifikator leave/aktif',
    testData: 'User: Verifikator biasa (bukan SPV)',
    preCondition: 'User login dengan role verifikator biasa',
    testCase: 'User non-SPV mencoba mengubah status verifikator',
    type: 'Negative',
    steps: '1. Login sebagai verifikator biasa\n2. Buka Dashboard Monitoring\n3. Coba akses fitur set Leave/Aktif',
    expectedResult: 'Fitur set Leave/Aktif tidak tersedia/disabled untuk user non-SPV, atau halaman tidak bisa diakses',
  },
  {
    no: 'TC-017',
    scenario: 'User non-SPV mencoba manual distribusi',
    testData: 'User: Verifikator biasa (bukan SPV)',
    preCondition: 'User login dengan role verifikator biasa',
    testCase: 'User non-SPV mencoba melakukan manual distribusi',
    type: 'Negative',
    steps: '1. Login sebagai verifikator biasa\n2. Buka Dashboard Monitoring\n3. Coba akses fitur Manual Distribusi',
    expectedResult: 'Fitur Manual Distribusi tidak tersedia/disabled untuk user non-SPV',
  },
  {
    no: 'TC-018',
    scenario: 'Tab Summary — tidak ada action button selain download',
    testData: 'User: SPV',
    preCondition: 'User berada di tab Summary',
    testCase: 'Verifikasi tab Summary tidak memiliki action button selain download',
    type: 'Negative',
    steps: '1. Buka tab Summary\n2. Verifikasi tidak ada tombol Edit, Delete, Set Leave, Manual Distribusi\n3. Hanya tombol Download yang tersedia',
    expectedResult: 'Tab Summary hanya menampilkan data dan tombol Download, tidak ada action lain (set leave, distribusi, edit)',
  },
  {
    no: 'TC-019',
    scenario: 'Dashboard tidak menampilkan verifikator dari Kantor Pusat lain',
    testData: 'User: SPV Kantor Pusat A, Verifikator: dari Kantor Pusat B',
    preCondition: 'Terdapat verifikator dari Kantor Pusat berbeda',
    testCase: 'Verifikasi dashboard hanya menampilkan verifikator dari Kantor Pusat yang sama',
    type: 'Negative',
    steps: '1. Login sebagai SPV Kantor Pusat A\n2. Buka Dashboard Monitoring\n3. Cek apakah ada verifikator dari Kantor Pusat B\n4. Bandingkan dengan data master',
    expectedResult: 'Dashboard TIDAK menampilkan verifikator dari Kantor Pusat lain, hanya dari Kantor Pusat yang sama dengan user',
  },
  {
    no: 'TC-020',
    scenario: 'Filter tab Daily dengan tanggal kosong',
    testData: 'User: SPV, Start: (kosong), End: (kosong)',
    preCondition: 'User berada di tab Daily',
    testCase: 'User mencoba apply filter tanpa mengisi tanggal',
    type: 'Negative',
    steps: '1. Buka tab Daily\n2. Kosongkan field start date dan end date\n3. Klik filter/apply',
    expectedResult: 'Sistem menampilkan error/warning bahwa tanggal wajib diisi, atau kembali ke default (today)',
  },
  {
    no: 'TC-021',
    scenario: 'Manual distribusi ke verifikator yang berstatus Leave',
    testData: 'User: SPV, Target: verifikator status Leave',
    preCondition: 'Verifikator target berstatus Leave',
    testCase: 'SPV mencoba manual distribusi klaim ke verifikator yang sedang Leave',
    type: 'Negative',
    steps: '1. Buka tab Daily\n2. Set satu verifikator ke status Leave\n3. Coba manual distribusi klaim ke verifikator tersebut',
    expectedResult: 'Sistem menolak distribusi, menampilkan pesan error bahwa verifikator sedang Leave dan tidak bisa menerima klaim',
  },
  {
    no: 'TC-022',
    scenario: 'Akses dashboard tanpa login',
    testData: 'User: tidak login, URL: direct access ke dashboard',
    preCondition: 'User belum login ke sistem',
    testCase: 'User mencoba mengakses dashboard monitoring secara langsung via URL tanpa login',
    type: 'Negative',
    steps: '1. Buka browser\n2. Akses URL dashboard monitoring secara langsung tanpa login\n3. Verifikasi response sistem',
    expectedResult: 'Sistem redirect ke halaman login, dashboard tidak bisa diakses tanpa autentikasi',
  },
];

// Build workbook
const wb = XLSX.utils.book_new();

// Header info
const headerData = [
  ['TEST CASE — Dashboard Monitoring Verifikator (SIT)'],
  [''],
  ['No', ': NM-xxxx', '', '', '', 'Test Design by', ': QA Team'],
  ['Test Priority', ': High', '', '', '', 'Test Execute by', ': QA Team'],
  ['Application Address', ': http://claim.dev.inhealth.co.id', '', '', '', 'Test Execution date', ': '],
  ['Description', ': Dashboard Monitoring real-time load tim verifikasi per cabang'],
  [''],
];

// Column headers
const colHeaders = [
  'No', 'Test Scenario', 'Test Data', 'Pre Conditions', 'Test Case',
  'Type', 'Test Case Steps', 'Expected Results',
];

// Data rows
const dataRows = testCases.map(tc => [
  tc.no, tc.scenario, tc.testData, tc.preCondition, tc.testCase,
  tc.type, tc.steps, tc.expectedResult,
]);

// Combine all
const allRows = [...headerData, colHeaders, ...dataRows];
const ws = XLSX.utils.aoa_to_sheet(allRows);

// Set column widths
ws['!cols'] = [
  { wch: 8 },   // No
  { wch: 50 },  // Test Scenario
  { wch: 45 },  // Test Data
  { wch: 50 },  // Pre Conditions
  { wch: 55 },  // Test Case
  { wch: 10 },  // Type
  { wch: 65 },  // Steps
  { wch: 60 },  // Expected Results
];

XLSX.utils.book_append_sheet(wb, ws, 'Test Cases');

// Write file
const outputPath = path.resolve(__dirname, '..', 'test-results', 'Dashboard_Monitoring_Verifikator_SIT.xlsx');
XLSX.writeFile(wb, outputPath);
console.log(`\n✅ Excel generated: ${outputPath}\n`);
console.log(`Total test cases: ${testCases.length} (Positive: ${testCases.filter(t => t.type === 'Positive').length}, Negative: ${testCases.filter(t => t.type === 'Negative').length})`);
