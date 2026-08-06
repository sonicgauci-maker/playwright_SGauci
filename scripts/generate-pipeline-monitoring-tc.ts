/**
 * Generate SIT Test Case Excel — Monitoring Pipeline Automation Process
 * Run: npx tsx scripts/generate-pipeline-monitoring-tc.ts
 */
import * as XLSX from 'xlsx';
import path from 'path';

const testCases = [
  // ═══════════════════════════════════════════════════════════
  // POSITIVE CASES
  // ═══════════════════════════════════════════════════════════
  {
    no: 'TC-001',
    scenario: 'View halaman Monitoring Pipeline — Staff HO',
    testData: 'User: Staff HO (Verifikator Pusat)',
    preCondition: 'User sudah login dengan role Staff HO / Verifikator Pusat',
    testCase: 'Staff HO membuka halaman Monitoring Pipeline Automation Process',
    type: 'Positive',
    steps: '1. Login ke sistem sebagai Staff HO\n2. Navigasi ke menu Monitoring Pipeline Automation Process\n3. Verifikasi halaman tampil',
    expectedResult: 'Halaman Monitoring Pipeline tampil dengan summary status dan tabel detail klaim',
  },
  {
    no: 'TC-002',
    scenario: 'View halaman Monitoring Pipeline — Kadep Klaim',
    testData: 'User: Kadep Klaim',
    preCondition: 'User sudah login dengan role Kadep Klaim',
    testCase: 'Kadep Klaim membuka halaman Monitoring Pipeline Automation Process',
    type: 'Positive',
    steps: '1. Login ke sistem sebagai Kadep Klaim\n2. Navigasi ke menu Monitoring Pipeline Automation Process\n3. Verifikasi halaman tampil',
    expectedResult: 'Halaman Monitoring Pipeline tampil dengan summary status dan tabel detail klaim',
  },
  {
    no: 'TC-003',
    scenario: 'Menampilkan summary jumlah klaim per status',
    testData: 'User: Staff HO, Data klaim tersedia di pipeline',
    preCondition: 'User sudah login dan berada di halaman Monitoring Pipeline',
    testCase: 'Verifikasi summary menampilkan jumlah klaim per status: SCORED, READY_TO_DISTRIBUTE, DISTRIBUTED, FAILED, MANUAL_PROCESS',
    type: 'Positive',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Lihat section summary/card status\n3. Verifikasi semua status ditampilkan dengan jumlahnya',
    expectedResult: 'Summary menampilkan 5 status beserta jumlah klaim masing-masing:\n- SCORED\n- READY_TO_DISTRIBUTE\n- DISTRIBUTED\n- FAILED\n- MANUAL_PROCESS',
  },
  {
    no: 'TC-004',
    scenario: 'Tabel detail menampilkan informasi per klaim lengkap',
    testData: 'User: Staff HO, Data klaim tersedia',
    preCondition: 'User berada di halaman Monitoring Pipeline, ada data klaim',
    testCase: 'Verifikasi tabel detail menampilkan kolom: Claim No, Register No, KOPS, Score, Umur, Status, Assigned To, tanggal terakhir update',
    type: 'Positive',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Scroll ke tabel detail\n3. Verifikasi semua kolom tersedia\n4. Verifikasi data terisi di setiap kolom',
    expectedResult: 'Tabel detail menampilkan kolom lengkap:\n- Claim No\n- Register No\n- KOPS\n- Score\n- Umur\n- Status\n- Assigned To\n- Tanggal terakhir update\nSemua kolom terisi sesuai data klaim',
  },
  {
    no: 'TC-005',
    scenario: 'Filter berdasarkan status',
    testData: 'User: Staff HO, Filter: status = DISTRIBUTED',
    preCondition: 'User berada di halaman Monitoring Pipeline',
    testCase: 'User melakukan filter klaim berdasarkan status DISTRIBUTED',
    type: 'Positive',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Klik/pilih filter status\n3. Pilih "DISTRIBUTED"\n4. Apply filter\n5. Verifikasi tabel hanya menampilkan klaim dengan status DISTRIBUTED',
    expectedResult: 'Tabel hanya menampilkan klaim dengan status DISTRIBUTED, klaim status lain tidak tampil',
  },
  {
    no: 'TC-006',
    scenario: 'Filter berdasarkan status SCORED',
    testData: 'User: Staff HO, Filter: status = SCORED',
    preCondition: 'User berada di halaman Monitoring Pipeline',
    testCase: 'User melakukan filter klaim berdasarkan status SCORED',
    type: 'Positive',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Pilih filter status = SCORED\n3. Apply filter\n4. Verifikasi hasil',
    expectedResult: 'Tabel hanya menampilkan klaim dengan status SCORED',
  },
  {
    no: 'TC-007',
    scenario: 'Filter berdasarkan status READY_TO_DISTRIBUTE',
    testData: 'User: Staff HO, Filter: status = READY_TO_DISTRIBUTE',
    preCondition: 'User berada di halaman Monitoring Pipeline',
    testCase: 'User melakukan filter klaim berdasarkan status READY_TO_DISTRIBUTE',
    type: 'Positive',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Pilih filter status = READY_TO_DISTRIBUTE\n3. Apply filter\n4. Verifikasi hasil',
    expectedResult: 'Tabel hanya menampilkan klaim dengan status READY_TO_DISTRIBUTE',
  },
  {
    no: 'TC-008',
    scenario: 'Filter berdasarkan status FAILED',
    testData: 'User: Staff HO, Filter: status = FAILED',
    preCondition: 'User berada di halaman Monitoring Pipeline',
    testCase: 'User melakukan filter klaim berdasarkan status FAILED',
    type: 'Positive',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Pilih filter status = FAILED\n3. Apply filter\n4. Verifikasi hasil',
    expectedResult: 'Tabel hanya menampilkan klaim dengan status FAILED, klaim FAILED terlihat jelas (highlight/warna berbeda) untuk follow-up',
  },
  {
    no: 'TC-009',
    scenario: 'Filter berdasarkan status MANUAL_PROCESS',
    testData: 'User: Staff HO, Filter: status = MANUAL_PROCESS',
    preCondition: 'User berada di halaman Monitoring Pipeline',
    testCase: 'User melakukan filter klaim berdasarkan status MANUAL_PROCESS',
    type: 'Positive',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Pilih filter status = MANUAL_PROCESS\n3. Apply filter\n4. Verifikasi hasil',
    expectedResult: 'Tabel hanya menampilkan klaim dengan status MANUAL_PROCESS',
  },
  {
    no: 'TC-010',
    scenario: 'Filter berdasarkan KOPS',
    testData: 'User: Staff HO, Filter: KOPS = [kode KOPS tertentu]',
    preCondition: 'User berada di halaman Monitoring Pipeline',
    testCase: 'User melakukan filter klaim berdasarkan KOPS tertentu',
    type: 'Positive',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Pilih filter KOPS\n3. Pilih KOPS tertentu\n4. Apply filter\n5. Verifikasi tabel hanya menampilkan klaim dari KOPS yang dipilih',
    expectedResult: 'Tabel hanya menampilkan klaim yang berasal dari KOPS yang dipilih',
  },
  {
    no: 'TC-011',
    scenario: 'Filter berdasarkan tanggal',
    testData: 'User: Staff HO, Filter: tanggal = 01/07/2026 - 15/07/2026',
    preCondition: 'User berada di halaman Monitoring Pipeline',
    testCase: 'User melakukan filter klaim berdasarkan rentang tanggal',
    type: 'Positive',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Set filter start date: 01/07/2026\n3. Set filter end date: 15/07/2026\n4. Apply filter\n5. Verifikasi tabel menampilkan klaim dalam rentang tersebut',
    expectedResult: 'Tabel hanya menampilkan klaim yang tanggal terakhir update-nya dalam rentang 01/07/2026 - 15/07/2026',
  },
  {
    no: 'TC-012',
    scenario: 'Kombinasi filter: status + KOPS + tanggal',
    testData: 'User: Staff HO, Status: FAILED, KOPS: [kode], Tanggal: 01/07/2026 - 31/07/2026',
    preCondition: 'User berada di halaman Monitoring Pipeline',
    testCase: 'User melakukan filter kombinasi status, KOPS, dan tanggal sekaligus',
    type: 'Positive',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Set filter status: FAILED\n3. Set filter KOPS: [kode tertentu]\n4. Set filter tanggal: 01/07/2026 - 31/07/2026\n5. Apply filter\n6. Verifikasi hasil sesuai semua kriteria',
    expectedResult: 'Tabel menampilkan klaim yang memenuhi ketiga kriteria filter sekaligus (status FAILED + KOPS tertentu + dalam rentang tanggal)',
  },
  {
    no: 'TC-013',
    scenario: 'Klik klaim untuk melihat detail timeline',
    testData: 'User: Staff HO, Klaim: [Claim No tertentu]',
    preCondition: 'User berada di halaman Monitoring Pipeline, ada data klaim di tabel',
    testCase: 'User klik salah satu klaim untuk melihat detail timeline (kapan masuk tiap status)',
    type: 'Positive',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Klik salah satu row klaim di tabel\n3. Verifikasi detail timeline tampil\n4. Cek informasi kapan klaim masuk ke setiap status',
    expectedResult: 'Detail timeline klaim tampil menunjukkan kapan klaim masuk ke setiap status:\n- Kapan SCORED\n- Kapan READY_TO_DISTRIBUTE\n- Kapan DISTRIBUTED\n- (atau FAILED/MANUAL_PROCESS jika ada)',
  },
  {
    no: 'TC-014',
    scenario: 'Klaim FAILED terlihat jelas untuk follow-up',
    testData: 'User: Staff HO, Ada klaim berstatus FAILED',
    preCondition: 'Terdapat klaim berstatus FAILED di pipeline',
    testCase: 'Verifikasi klaim berstatus FAILED ditampilkan dengan visual yang jelas (highlight, warna, icon) untuk memudahkan follow-up manual processing',
    type: 'Positive',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Cari klaim berstatus FAILED di tabel\n3. Verifikasi visual indicator yang membedakan dari status lain',
    expectedResult: 'Klaim FAILED ditampilkan dengan visual yang jelas (misal: background merah, icon warning, badge) sehingga mudah diidentifikasi untuk follow-up manual processing',
  },
  {
    no: 'TC-015',
    scenario: 'Summary jumlah klaim sesuai dengan data di tabel',
    testData: 'User: Staff HO',
    preCondition: 'User berada di halaman Monitoring Pipeline dengan data klaim tersedia',
    testCase: 'Verifikasi angka di summary card sesuai dengan jumlah data yang tampil di tabel saat di-filter per status',
    type: 'Positive',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Catat angka di summary card status DISTRIBUTED\n3. Filter tabel by status DISTRIBUTED\n4. Hitung jumlah row di tabel\n5. Bandingkan dengan angka summary',
    expectedResult: 'Angka di summary card sesuai dengan jumlah row di tabel saat di-filter per status masing-masing',
  },

  // ═══════════════════════════════════════════════════════════
  // NEGATIVE CASES
  // ═══════════════════════════════════════════════════════════
  {
    no: 'TC-016',
    scenario: 'Akses halaman oleh role non-Staff HO / non-Kadep Klaim',
    testData: 'User: SPV Cabang / Verifikator Cabang',
    preCondition: 'User login dengan role selain Staff HO atau Kadep Klaim (misal: SPV Cabang)',
    testCase: 'User dengan role non-kantor pusat mencoba akses halaman Monitoring Pipeline',
    type: 'Negative',
    steps: '1. Login sebagai SPV Cabang atau Verifikator Cabang\n2. Coba navigasi ke menu Monitoring Pipeline\n3. Verifikasi akses ditolak',
    expectedResult: 'Halaman Monitoring Pipeline TIDAK muncul di menu / tidak bisa diakses. User mendapat pesan unauthorized atau menu tidak terlihat',
  },
  {
    no: 'TC-017',
    scenario: 'Akses halaman oleh role Admin Klaim',
    testData: 'User: Admin Klaim (tester.admin)',
    preCondition: 'User login dengan role Admin Klaim',
    testCase: 'Admin Klaim mencoba akses halaman Monitoring Pipeline',
    type: 'Negative',
    steps: '1. Login sebagai Admin Klaim\n2. Coba navigasi ke Monitoring Pipeline\n3. Verifikasi akses',
    expectedResult: 'Halaman Monitoring Pipeline TIDAK tersedia untuk Admin Klaim, hanya untuk Staff HO dan Kadep Klaim',
  },
  {
    no: 'TC-018',
    scenario: 'Akses halaman tanpa login (direct URL)',
    testData: 'User: tidak login, URL: direct access',
    preCondition: 'User belum login ke sistem',
    testCase: 'User mengakses URL halaman Monitoring Pipeline secara langsung tanpa login',
    type: 'Negative',
    steps: '1. Buka browser tanpa login\n2. Akses URL Monitoring Pipeline secara langsung\n3. Verifikasi response',
    expectedResult: 'Sistem redirect ke halaman login, halaman Monitoring Pipeline tidak bisa diakses tanpa autentikasi',
  },
  {
    no: 'TC-019',
    scenario: 'Filter tanggal dengan end date lebih kecil dari start date',
    testData: 'User: Staff HO, Start: 20/07/2026, End: 01/07/2026',
    preCondition: 'User berada di halaman Monitoring Pipeline',
    testCase: 'User memasukkan filter tanggal dengan end date lebih kecil dari start date',
    type: 'Negative',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Set start date: 20/07/2026\n3. Set end date: 01/07/2026\n4. Apply filter',
    expectedResult: 'Sistem menampilkan error/warning bahwa end date tidak boleh lebih kecil dari start date, filter tidak diterapkan',
  },
  {
    no: 'TC-020',
    scenario: 'Filter tanggal kosong',
    testData: 'User: Staff HO, Start: (kosong), End: (kosong)',
    preCondition: 'User berada di halaman Monitoring Pipeline',
    testCase: 'User apply filter tanpa mengisi tanggal',
    type: 'Negative',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Kosongkan field tanggal\n3. Apply filter',
    expectedResult: 'Sistem menampilkan error bahwa tanggal wajib diisi, atau menampilkan data default (semua data / hari ini)',
  },
  {
    no: 'TC-021',
    scenario: 'Klik klaim yang tidak memiliki timeline',
    testData: 'User: Staff HO, Klaim: klaim baru (baru masuk pipeline)',
    preCondition: 'Ada klaim yang baru masuk pipeline (hanya 1 status)',
    testCase: 'User klik klaim yang baru masuk pipeline dan hanya punya 1 entry timeline',
    type: 'Negative',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Cari klaim berstatus SCORED (baru masuk)\n3. Klik klaim tersebut\n4. Verifikasi detail timeline',
    expectedResult: 'Detail timeline tampil dengan hanya 1 entry (SCORED), tidak ada error meskipun timeline belum lengkap',
  },
  {
    no: 'TC-022',
    scenario: 'Tidak ada data klaim di pipeline (empty state)',
    testData: 'User: Staff HO, Data: kosong (tidak ada klaim)',
    preCondition: 'Tidak ada klaim di pipeline / filter menghasilkan 0 data',
    testCase: 'Verifikasi halaman menampilkan empty state yang informatif',
    type: 'Negative',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Gunakan filter yang menghasilkan 0 data\n3. Verifikasi tampilan empty state',
    expectedResult: 'Halaman menampilkan pesan empty state yang informatif (misal: "Tidak ada data klaim"), bukan error/blank page',
  },
  {
    no: 'TC-023',
    scenario: 'Filter KOPS yang tidak memiliki klaim',
    testData: 'User: Staff HO, Filter: KOPS = [KOPS tanpa klaim]',
    preCondition: 'User berada di halaman Monitoring Pipeline',
    testCase: 'User filter berdasarkan KOPS yang tidak memiliki klaim di pipeline',
    type: 'Negative',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Pilih filter KOPS yang tidak punya klaim\n3. Apply filter\n4. Verifikasi tampilan',
    expectedResult: 'Tabel menampilkan empty state / pesan "Data tidak ditemukan", summary card menampilkan angka 0 untuk semua status',
  },
  {
    no: 'TC-024',
    scenario: 'Verifikasi halaman tidak bisa diakses via URL manipulation oleh role non-authorized',
    testData: 'User: Verifikator Cabang, URL: [direct URL Monitoring Pipeline]',
    preCondition: 'User login sebagai Verifikator Cabang',
    testCase: 'User non-authorized mencoba akses halaman via direct URL (URL manipulation)',
    type: 'Negative',
    steps: '1. Login sebagai Verifikator Cabang\n2. Copy URL halaman Monitoring Pipeline\n3. Paste langsung di browser\n4. Verifikasi response',
    expectedResult: 'Sistem menolak akses, redirect ke halaman unauthorized/dashboard, atau menampilkan pesan "Anda tidak memiliki akses"',
  },
  {
    no: 'TC-025',
    scenario: 'Summary tidak menampilkan status yang tidak valid',
    testData: 'User: Staff HO',
    preCondition: 'User berada di halaman Monitoring Pipeline',
    testCase: 'Verifikasi summary hanya menampilkan 5 status valid, tidak ada status anomali',
    type: 'Negative',
    steps: '1. Buka halaman Monitoring Pipeline\n2. Cek semua card summary\n3. Verifikasi hanya ada 5 status: SCORED, READY_TO_DISTRIBUTE, DISTRIBUTED, FAILED, MANUAL_PROCESS',
    expectedResult: 'Summary hanya menampilkan 5 status yang valid, tidak ada status lain yang tidak dikenal atau anomali',
  },
];

// Build workbook
const wb = XLSX.utils.book_new();

// Header info
const headerData = [
  ['TEST CASE — Monitoring Pipeline Automation Process (SIT)'],
  [''],
  ['No', ': NM-xxxx', '', '', '', 'Test Design by', ': QA Team'],
  ['Test Priority', ': Medium', '', '', '', 'Test Execute by', ': QA Team'],
  ['Application Address', ': http://claim.dev.inhealth.co.id', '', '', '', 'Test Execution date', ': '],
  ['Description', ': Monitoring Pipeline Automation Process — Melihat status antrian distribusi klaim secara keseluruhan'],
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
  { wch: 55 },  // Test Scenario
  { wch: 50 },  // Test Data
  { wch: 55 },  // Pre Conditions
  { wch: 60 },  // Test Case
  { wch: 10 },  // Type
  { wch: 70 },  // Steps
  { wch: 65 },  // Expected Results
];

XLSX.utils.book_append_sheet(wb, ws, 'Test Cases');

// Write file
const outputPath = path.resolve(__dirname, '..', 'test-results', 'Pipeline_Monitoring_Automation_SIT.xlsx');
XLSX.writeFile(wb, outputPath);
console.log(`\n✅ Excel generated: ${outputPath}\n`);
console.log(`Total test cases: ${testCases.length} (Positive: ${testCases.filter(t => t.type === 'Positive').length}, Negative: ${testCases.filter(t => t.type === 'Negative').length})`);
