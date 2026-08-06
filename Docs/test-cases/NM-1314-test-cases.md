# Test Cases: NM-1314 - New Sub-menu Report Argo & SLA Klaim

## Test Case Information

| Field | Value |
|-------|-------|
| **Application** | New MiCare - Claim Verification |
| **Menu** | Monitoring > Report SLA |
| **Jira Reference** | NM-1314 |
| **Parent Epic** | NM-137 |
| **Test Design by** | |
| **Test Priority** | Medium |
| **Application Address** | https://development.inhealth.co.id/newmicare |
| **Version** | TC.2026.02 |
| **Sprint** | Claim Operation Sprint 25 |

---


## Test Cases

### AC-1: Menu & Navigation - Sub menu Report SLA tersedia di menu Monitoring

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Verify user Admin dapat mengakses sub menu Report SLA di Monitoring | User role: Admin | User sudah login dengan role Admin | TC01 - Akses menu Report SLA oleh Admin | Positive | 1. Login ke New MiCare sebagai Admin<br>2. Klik menu Monitoring di sidebar<br>3. Verifikasi sub menu "Report SLA" tampil sejajar COB Letter dan Pending Claim<br>4. Klik sub menu "Report SLA" | Sub menu "Report SLA" tampil di dalam menu Monitoring dan halaman Report SLA terbuka dengan benar | | | Medium | `@AC-access @smoke` Scenario: User Admin berhasil mengakses menu Report SLA | Automated | |
| 2 | Verify user Verifikator dapat mengakses sub menu Report SLA | User role: Verifikator | User sudah login dengan role Verifikator | TC02 - Akses menu Report SLA oleh Verifikator | Positive | 1. Login ke New MiCare sebagai Verifikator<br>2. Klik menu Monitoring di sidebar<br>3. Verifikasi sub menu "Report SLA" tampil<br>4. Klik sub menu "Report SLA" | Sub menu "Report SLA" tampil dan halaman terbuka dengan benar | | | Medium | `@AC-access` Scenario: User Verifikator berhasil mengakses menu Report SLA | Automated | |
| 3 | Verify user Ka. KLY dapat mengakses sub menu Report SLA | User role: Ka. KLY | User sudah login dengan role Ka. KLY | TC03 - Akses menu Report SLA oleh Ka. KLY | Positive | 1. Login ke New MiCare sebagai Ka. KLY<br>2. Klik menu Monitoring di sidebar<br>3. Verifikasi sub menu "Report SLA" tampil<br>4. Klik sub menu "Report SLA" | Sub menu "Report SLA" tampil dan halaman terbuka dengan benar | | | Medium | `@AC-access` Scenario: User Ka. KLY berhasil mengakses menu Report SLA | Automated | |
| 4 | Verify user Kanit dapat mengakses sub menu Report SLA | User role: Kanit | User sudah login dengan role Kanit | TC04 - Akses menu Report SLA oleh Kanit | Positive | 1. Login ke New MiCare sebagai Kanit<br>2. Klik menu Monitoring di sidebar<br>3. Verifikasi sub menu "Report SLA" tampil<br>4. Klik sub menu "Report SLA" | Sub menu "Report SLA" tampil dan halaman terbuka dengan benar | | | Medium | `@AC-access` Scenario: User Kanit berhasil mengakses menu Report SLA | Automated | |
| 5 | Verify user SPV dapat mengakses sub menu Report SLA | User role: SPV | User sudah login dengan role SPV | TC05 - Akses menu Report SLA oleh SPV | Positive | 1. Login ke New MiCare sebagai SPV<br>2. Klik menu Monitoring di sidebar<br>3. Verifikasi sub menu "Report SLA" tampil<br>4. Klik sub menu "Report SLA" | Sub menu "Report SLA" tampil dan halaman terbuka dengan benar | | | Medium | `@AC-access` Scenario: User SPV berhasil mengakses menu Report SLA | Automated | |
| 6 | Verify user Kepala Departemen dapat mengakses sub menu Report SLA | User role: Kepala Departemen | User sudah login dengan role Kepala Departemen | TC06 - Akses menu Report SLA oleh Kadept | Positive | 1. Login ke New MiCare sebagai Kepala Departemen<br>2. Klik menu Monitoring di sidebar<br>3. Verifikasi sub menu "Report SLA" tampil<br>4. Klik sub menu "Report SLA" | Sub menu "Report SLA" tampil dan halaman terbuka dengan benar | | | Medium | `@AC-access` Scenario: User Kepala Departemen berhasil mengakses menu Report SLA | Automated | |
| 7 | Verify user Kepala Divisi dapat mengakses sub menu Report SLA | User role: Kepala Divisi | User sudah login dengan role Kepala Divisi | TC07 - Akses menu Report SLA oleh Kadiv | Positive | 1. Login ke New MiCare sebagai Kepala Divisi<br>2. Klik menu Monitoring di sidebar<br>3. Verifikasi sub menu "Report SLA" tampil<br>4. Klik sub menu "Report SLA" | Sub menu "Report SLA" tampil dan halaman terbuka dengan benar | | | Medium | `@AC-access` Scenario: User Kepala Divisi berhasil mengakses menu Report SLA | Automated | |
| 8 | Verify user HO (Head Office) dapat mengakses sub menu Report SLA | User role: User HO | User sudah login dengan role User HO | TC08 - Akses menu Report SLA oleh User HO | Positive | 1. Login ke New MiCare sebagai User HO<br>2. Klik menu Monitoring di sidebar<br>3. Verifikasi sub menu "Report SLA" tampil<br>4. Klik sub menu "Report SLA" | Sub menu "Report SLA" tampil dan halaman terbuka dengan benar | | | Medium | `@AC-access` Scenario: User HO berhasil mengakses menu Report SLA | Automated | |
| 9 | Verify user tanpa role yang berwenang TIDAK dapat melihat sub menu Report SLA | User role: role non-authorized (misal: Provider) | User sudah login dengan role di luar daftar yang berwenang | TC09 - Sub menu Report SLA tidak tampil untuk unauthorized role | Negative | 1. Login ke New MiCare dengan role non-authorized<br>2. Klik menu Monitoring di sidebar<br>3. Verifikasi apakah sub menu "Report SLA" tampil | Sub menu "Report SLA" TIDAK tampil di sidebar | | | High | `@AC-access @negative @security` Scenario: User non-authorized tidak dapat melihat menu Report SLA | Automated | |
| 10 | Verify user tanpa role yang berwenang TIDAK dapat akses halaman via direct URL | User role: role non-authorized, URL langsung ke Report SLA | User login dengan role non-authorized | TC10 - Direct URL access oleh unauthorized role | Negative | 1. Login dengan role non-authorized<br>2. Akses URL halaman Report SLA secara langsung via browser | User diredirect ke halaman unauthorized / 403, bukan menampilkan halaman Report SLA | | | High | `@AC-access @negative @security` Scenario: User non-authorized tidak dapat mengakses halaman Report SLA via direct URL | Automated | |


---

### AC-2: Page Layout & Default Data Display

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 11 | Verify halaman Report SLA menampilkan area filter di atas dan tabel di bawah | User role: Admin | User sudah berada di halaman Report SLA | TC11 - Layout halaman Report SLA | Positive | 1. Login sebagai Admin<br>2. Navigasi ke Monitoring > Report SLA<br>3. Verifikasi layout halaman | Halaman menampilkan area Filter/Search di bagian atas dan area Tabel Inquiry di bagian bawah | | | Medium | `@AC-layout @smoke` Scenario: Halaman Report SLA menampilkan layout filter dan tabel | Automated | |
| 12 | Verify default load menampilkan seluruh data sesuai cakupan wilayah user | User role: Admin | User sudah login, data klaim tersedia di wilayah user | TC12 - Default load data tanpa filter | Positive | 1. Login sebagai Admin<br>2. Navigasi ke Monitoring > Report SLA<br>3. Tidak mengisi filter apapun<br>4. Verifikasi data di tabel | Tabel menampilkan seluruh data klaim (yang sudah diterima) sesuai cakupan wilayah user, pagination 10 per page | | | High | `@AC-layout @default` Scenario: Default load menampilkan seluruh data sesuai wilayah user | Automated | |
| 13 | Verify tabel menampilkan 12 kolom output yang benar | User role: Admin | User sudah berada di halaman Report SLA dengan data | TC13 - Kolom tabel output | Positive | 1. Navigasi ke halaman Report SLA<br>2. Verifikasi nama kolom tabel | Tabel menampilkan 12 kolom: No Claim, Date of Service, Receive Date Claim, Verifikator Receive Date, Kanit Approve Date, Send to FIS Date, Paid Date, SLA Admin, SLA Verifikator, SLA Paid, SLA All, Argo Claim | | | High | `@AC-layout @columns @smoke` Scenario: Tabel inquiry menampilkan 12 kolom yang sesuai | Automated | |
| 14 | Verify pagination tabel menampilkan max 10 row per page | User role: Admin | Data klaim tersedia lebih dari 10 records | TC14 - Pagination 10 per page | Positive | 1. Navigasi ke halaman Report SLA<br>2. Verifikasi jumlah baris di tabel<br>3. Verifikasi informasi pagination<br>4. Klik halaman berikutnya | Tabel menampilkan max 10 row per page, navigasi pagination berfungsi | | | Medium | `@AC-layout @pagination` Scenario: Pagination tabel menampilkan maksimal 10 row per page | Automated | |
| 15 | Verify modal loading muncul saat data sedang di-fetch | User role: Admin | User navigasi ke halaman Report SLA | TC15 - Modal loading saat fetch data | Positive | 1. Navigasi ke halaman Report SLA<br>2. Observasi tampilan saat data loading | Modal loading muncul selama proses fetch data dan hilang setelah data selesai di-load | | | Low | `@AC-layout @loading` Scenario: Modal loading tampil saat data sedang di-fetch | Automated | |


---

### AC-3: Tiering Akses Filter KOPS & KLY

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 16 | Verify filter KOPS dan KLY TIDAK tampil untuk role Admin | User role: Admin | User sudah login sebagai Admin | TC16 - Filter KOPS & KLY hidden untuk Admin | Positive | 1. Login sebagai Admin<br>2. Navigasi ke Report SLA<br>3. Verifikasi area filter | Filter KOPS dan Filter KLY TIDAK tampil. Data otomatis ter-filter sesuai wilayah user. | | | High | `@AC-tiering @admin` Scenario: Filter KOPS dan KLY tidak tampil untuk role Admin | Automated | |
| 17 | Verify filter KOPS dan KLY TIDAK tampil untuk role Verifikator | User role: Verifikator | User sudah login sebagai Verifikator | TC17 - Filter KOPS & KLY hidden untuk Verifikator | Positive | 1. Login sebagai Verifikator<br>2. Navigasi ke Report SLA<br>3. Verifikasi area filter | Filter KOPS dan Filter KLY TIDAK tampil. Data otomatis ter-filter sesuai wilayah user. | | | High | `@AC-tiering @verifikator` Scenario: Filter KOPS dan KLY tidak tampil untuk role Verifikator | Automated | |
| 18 | Verify filter KOPS dan KLY TIDAK tampil untuk role Ka. KLY | User role: Ka. KLY | User sudah login sebagai Ka. KLY | TC18 - Filter KOPS & KLY hidden untuk Ka. KLY | Positive | 1. Login sebagai Ka. KLY<br>2. Navigasi ke Report SLA<br>3. Verifikasi area filter | Filter KOPS dan Filter KLY TIDAK tampil. Data otomatis ter-filter sesuai wilayah user. | | | High | `@AC-tiering @ka-kly` Scenario: Filter KOPS dan KLY tidak tampil untuk role Ka. KLY | Automated | |
| 19 | Verify filter KLY tampil dan KOPS tidak tampil untuk role Kanit | User role: Kanit | User sudah login sebagai Kanit | TC19 - Filter KLY tampil, KOPS hidden untuk Kanit | Positive | 1. Login sebagai Kanit<br>2. Navigasi ke Report SLA<br>3. Verifikasi area filter | Filter KOPS TIDAK tampil. Filter KLY TAMPIL dengan isian KLY dalam cakupan KOPS user Kanit. | | | High | `@AC-tiering @kanit` Scenario: Filter KLY tampil dan KOPS tidak tampil untuk role Kanit | Automated | |
| 20 | Verify dropdown KLY untuk Kanit hanya berisi KLY dalam KOPS user | User role: Kanit (KOPS Semarang) | User Kanit memiliki KOPS Semarang, KLY: Jogja, Solo, Surakarta | TC20 - Dropdown KLY Kanit sesuai wilayah | Positive | 1. Login sebagai Kanit wilayah Semarang<br>2. Navigasi ke Report SLA<br>3. Klik dropdown KLY<br>4. Verifikasi isi dropdown | Dropdown KLY hanya menampilkan KLY yang berada dalam KOPS Semarang (Jogja, Solo, Surakarta, dll) | | | High | `@AC-tiering @kanit @dropdown` Scenario: Dropdown KLY Kanit hanya menampilkan KLY dalam wilayah KOPS user | Automated | |
| 21 | Verify filter KLY tampil dan KOPS tidak tampil untuk role SPV | User role: SPV | User sudah login sebagai SPV | TC21 - Filter KLY tampil, KOPS hidden untuk SPV | Positive | 1. Login sebagai SPV<br>2. Navigasi ke Report SLA<br>3. Verifikasi area filter | Filter KOPS TIDAK tampil. Filter KLY TAMPIL dengan isian KLY dalam cakupan KOPS user SPV. | | | High | `@AC-tiering @spv` Scenario: Filter KLY tampil dan KOPS tidak tampil untuk role SPV | Automated | |
| 22 | Verify dropdown KLY untuk SPV hanya berisi KLY dalam KOPS user | User role: SPV (KOPS Jakarta) | User SPV memiliki KOPS Jakarta | TC22 - Dropdown KLY SPV sesuai wilayah | Positive | 1. Login sebagai SPV wilayah Jakarta<br>2. Navigasi ke Report SLA<br>3. Klik dropdown KLY<br>4. Verifikasi isi dropdown | Dropdown KLY hanya menampilkan KLY yang berada dalam KOPS Jakarta | | | High | `@AC-tiering @spv @dropdown` Scenario: Dropdown KLY SPV hanya menampilkan KLY dalam wilayah KOPS user | Automated | |
| 23 | Verify filter KOPS dan KLY keduanya tampil untuk role Kepala Departemen | User role: Kepala Departemen | User sudah login sebagai Kadept | TC23 - Filter KOPS & KLY tampil untuk Kadept | Positive | 1. Login sebagai Kepala Departemen<br>2. Navigasi ke Report SLA<br>3. Verifikasi area filter | Filter KOPS TAMPIL (berisi semua KOPS Indonesia). Filter KLY TAMPIL. | | | High | `@AC-tiering @kadept` Scenario: Filter KOPS dan KLY keduanya tampil untuk role Kepala Departemen | Automated | |
| 24 | Verify dropdown KOPS untuk Kadept berisi semua KOPS seluruh Indonesia | User role: Kepala Departemen | User sudah login sebagai Kadept | TC24 - Dropdown KOPS Kadept all Indonesia | Positive | 1. Login sebagai Kepala Departemen<br>2. Navigasi ke Report SLA<br>3. Klik dropdown KOPS<br>4. Verifikasi isi dropdown | Dropdown KOPS berisi seluruh KOPS di Indonesia | | | High | `@AC-tiering @kadept @dropdown` Scenario: Dropdown KOPS Kadept berisi semua KOPS seluruh Indonesia | Automated | |
| 25 | Verify dropdown KLY menyesuaikan KOPS yang dipilih oleh Kadept | User role: Kepala Departemen, KOPS: Semarang | Kadept memilih KOPS Semarang | TC25 - KLY menyesuaikan KOPS dipilih Kadept | Positive | 1. Login sebagai Kepala Departemen<br>2. Navigasi ke Report SLA<br>3. Pilih KOPS "Semarang"<br>4. Klik dropdown KLY<br>5. Verifikasi isi dropdown KLY | Dropdown KLY hanya menampilkan KLY yang berada dalam KOPS Semarang | | | High | `@AC-tiering @kadept @dependent-dropdown` Scenario: Dropdown KLY menyesuaikan KOPS yang dipilih oleh Kadept | Automated | |
| 26 | Verify filter KOPS dan KLY keduanya tampil untuk role Kepala Divisi | User role: Kepala Divisi | User sudah login sebagai Kadiv | TC26 - Filter KOPS & KLY tampil untuk Kadiv | Positive | 1. Login sebagai Kepala Divisi<br>2. Navigasi ke Report SLA<br>3. Verifikasi area filter | Filter KOPS TAMPIL (berisi semua KOPS Indonesia). Filter KLY TAMPIL. | | | High | `@AC-tiering @kadiv` Scenario: Filter KOPS dan KLY keduanya tampil untuk role Kepala Divisi | Automated | |
| 27 | Verify filter KOPS dan KLY keduanya tampil untuk role User HO | User role: User HO | User sudah login sebagai User HO | TC27 - Filter KOPS & KLY tampil untuk User HO | Positive | 1. Login sebagai User HO<br>2. Navigasi ke Report SLA<br>3. Verifikasi area filter | Filter KOPS TAMPIL (berisi semua KOPS Indonesia). Filter KLY TAMPIL. | | | High | `@AC-tiering @ho` Scenario: Filter KOPS dan KLY keduanya tampil untuk role User HO | Automated | |


---

### AC-4: Filter / Search Functionality

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 28 | Verify filter Facility dropdown menampilkan opsi Reimburse dan Cashless | User role: Admin | User sudah berada di halaman Report SLA | TC28 - Dropdown Facility options | Positive | 1. Navigasi ke halaman Report SLA<br>2. Klik dropdown Facility<br>3. Verifikasi opsi | Dropdown Facility menampilkan opsi: Reimburse, Cashless. Single select. Default: blank. | | | Medium | `@AC-filter @facility` Scenario: Dropdown Facility menampilkan opsi Reimburse dan Cashless | Automated | |
| 29 | Verify filter Facility Reimburse menampilkan data klaim reimburse saja | User role: Admin, Facility: Reimburse | Data klaim reimburse dan cashless tersedia | TC29 - Filter Facility Reimburse | Positive | 1. Navigasi ke halaman Report SLA<br>2. Pilih Facility "Reimburse"<br>3. Klik Search<br>4. Verifikasi data tabel | Tabel hanya menampilkan data klaim dengan tipe Reimburse | | | Medium | `@AC-filter @facility` Scenario: Filter Facility Reimburse menampilkan data klaim reimburse | Automated | |
| 30 | Verify filter Facility Cashless menampilkan data klaim cashless saja | User role: Admin, Facility: Cashless | Data klaim cashless tersedia | TC30 - Filter Facility Cashless | Positive | 1. Navigasi ke halaman Report SLA<br>2. Pilih Facility "Cashless"<br>3. Klik Search<br>4. Verifikasi data tabel | Tabel hanya menampilkan data klaim dengan tipe Cashless | | | Medium | `@AC-filter @facility` Scenario: Filter Facility Cashless menampilkan data klaim cashless | Automated | |
| 31 | Verify filter Range Tanggal berfungsi berdasarkan Receive Date Claim | User role: Admin, Date from: 01/06/2026, Date to: 30/06/2026 | Data klaim tersedia dalam rentang tersebut | TC31 - Filter Range Tanggal | Positive | 1. Navigasi ke halaman Report SLA<br>2. Isi Range Tanggal: dari 01/06/2026 sampai 30/06/2026<br>3. Klik Search<br>4. Verifikasi data tabel | Tabel hanya menampilkan klaim dengan Receive Date Claim dalam rentang 01/06/2026 - 30/06/2026 | | | High | `@AC-filter @date-range` Scenario: Filter Range Tanggal menampilkan data berdasarkan Receive Date Claim | Automated | |
| 32 | Verify filter No Claim / No Register dengan partial match (contains) | User role: Admin, Input: "CLM-2026" | Data klaim dengan nomor mengandung "CLM-2026" tersedia | TC32 - Filter No Claim partial match | Positive | 1. Navigasi ke halaman Report SLA<br>2. Isi field No Claim/No Register: "CLM-2026"<br>3. Klik Search<br>4. Verifikasi data tabel | Tabel menampilkan semua klaim yang nomor klaim atau nomor register-nya mengandung "CLM-2026" (contains) | | | Medium | `@AC-filter @no-claim @contains` Scenario: Filter No Claim menampilkan data dengan partial match | Automated | |
| 33 | Verify kombinasi filter Facility + Range Tanggal berfungsi | User role: Admin, Facility: Reimburse, Date: 01/06/2026 - 30/06/2026 | Data sesuai kombinasi tersedia | TC33 - Kombinasi filter Facility + Tanggal | Positive | 1. Navigasi ke halaman Report SLA<br>2. Pilih Facility "Reimburse"<br>3. Isi Range Tanggal: 01/06/2026 - 30/06/2026<br>4. Klik Search | Tabel menampilkan data klaim Reimburse dengan Receive Date Claim dalam rentang yang dipilih | | | Medium | `@AC-filter @combination` Scenario: Kombinasi filter Facility dan Range Tanggal berfungsi | Automated | |
| 34 | Verify Kadept filter KOPS dipilih tanpa KLY menampilkan semua data KOPS | User role: Kadept, KOPS: Semarang, KLY: blank | Data klaim di KOPS Semarang tersedia di multiple KLY | TC34 - KOPS dipilih, KLY kosong | Positive | 1. Login sebagai Kadept<br>2. Navigasi ke Report SLA<br>3. Pilih KOPS "Semarang"<br>4. Biarkan KLY kosong<br>5. Klik Search | Tabel menampilkan seluruh data klaim dari KOPS Semarang lintas semua KLY | | | High | `@AC-filter @kops-kly @tiering` Scenario: Filter KOPS tanpa KLY menampilkan semua data lintas KLY | Automated | |
| 35 | Verify Kadept filter KOPS + KLY menampilkan data spesifik KLY | User role: Kadept, KOPS: Semarang, KLY: Jogja | Data klaim di KLY Jogja tersedia | TC35 - KOPS + KLY dipilih | Positive | 1. Login sebagai Kadept<br>2. Navigasi ke Report SLA<br>3. Pilih KOPS "Semarang"<br>4. Pilih KLY "Jogja"<br>5. Klik Search | Tabel hanya menampilkan data klaim dari KLY Jogja | | | High | `@AC-filter @kops-kly @tiering` Scenario: Filter KOPS dan KLY menampilkan data spesifik KLY yang dipilih | Automated | |
| 36 | Verify Kanit filter KLY menampilkan data sesuai KLY yang dipilih | User role: Kanit, KLY: Solo | Data klaim di KLY Solo tersedia | TC36 - Kanit filter KLY | Positive | 1. Login sebagai Kanit<br>2. Navigasi ke Report SLA<br>3. Pilih KLY "Solo"<br>4. Klik Search | Tabel menampilkan data klaim dari KLY Solo saja | | | High | `@AC-filter @kops-kly @kanit` Scenario: Kanit filter KLY menampilkan data sesuai KLY yang dipilih | Automated | |


---

### AC-5: Search & Reset Button

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 37 | Verify tombol Search menampilkan data sesuai filter yang diisi | User role: Admin, Facility: Cashless | Filter sudah diisi | TC37 - Tombol Search apply filter | Positive | 1. Navigasi ke halaman Report SLA<br>2. Pilih Facility "Cashless"<br>3. Klik tombol "Search"<br>4. Verifikasi data tabel berubah | Data tabel berubah sesuai filter, modal loading muncul selama proses | | | High | `@AC-search @smoke` Scenario: Tombol Search menampilkan data sesuai filter | Automated | |
| 38 | Verify tombol Reset Filter mengembalikan semua field ke default | User role: Admin | Filter sudah diisi dengan beberapa value | TC38 - Tombol Reset Filter | Positive | 1. Navigasi ke halaman Report SLA<br>2. Isi beberapa filter (Facility, Range Tanggal, No Claim)<br>3. Klik tombol "Reset Filter"<br>4. Verifikasi field filter dan data tabel | Semua field filter kembali ke blank (default), data tabel menampilkan ulang seluruh data sesuai cakupan wilayah user | | | High | `@AC-reset @smoke` Scenario: Tombol Reset Filter mengembalikan semua field ke default | Automated | |
| 39 | Verify setelah Reset Filter, pagination kembali ke halaman 1 | User role: Admin | User sudah di page 3 dengan filter aktif | TC39 - Reset Filter reset pagination | Positive | 1. Isi filter dan klik Search<br>2. Navigasi ke page 3<br>3. Klik Reset Filter<br>4. Verifikasi posisi pagination | Pagination kembali ke halaman 1 setelah reset | | | Medium | `@AC-reset @pagination` Scenario: Reset Filter mengembalikan pagination ke halaman 1 | Automated | |


---

### AC-6: Export SLA Report

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 40 | Verify tombol Export SLA Report tersedia di halaman | User role: Admin | User sudah berada di halaman Report SLA | TC40 - Tombol Export tersedia | Positive | 1. Navigasi ke halaman Report SLA<br>2. Verifikasi keberadaan tombol "Export SLA Report" | Tombol "Export SLA Report" tampil di halaman | | | Medium | `@AC-export @smoke` Scenario: Tombol Export SLA Report tersedia di halaman | Automated | |
| 41 | Verify export tanpa filter menghasilkan file Excel berisi seluruh data | User role: Admin | Tidak ada filter aktif, data klaim tersedia | TC41 - Export tanpa filter | Positive | 1. Navigasi ke halaman Report SLA (tanpa filter aktif)<br>2. Klik tombol "Export SLA Report"<br>3. Verifikasi file ter-download<br>4. Buka file Excel | File Excel ter-download dengan nama format ReportArgoSLA_YYYYMMDDHHmmss.xlsx, berisi seluruh data sesuai hak akses user dengan 12 kolom | | | High | `@AC-export @no-filter` Scenario: Export tanpa filter menghasilkan Excel berisi seluruh data | Automated | |
| 42 | Verify export dengan filter aktif menghasilkan file Excel sesuai filter | User role: Admin, Facility: Reimburse | Filter Facility Reimburse aktif | TC42 - Export dengan filter aktif | Positive | 1. Pilih filter Facility "Reimburse"<br>2. Klik Search<br>3. Klik tombol "Export SLA Report"<br>4. Buka file Excel | File Excel hanya berisi data klaim Reimburse (konsisten dengan data yang tampil di tabel) | | | High | `@AC-export @with-filter` Scenario: Export dengan filter aktif menghasilkan Excel sesuai filter | Automated | |
| 43 | Verify file Excel memuat semua 12 kolom yang sama dengan tabel | User role: Admin | File Excel sudah di-download | TC43 - Kolom Excel konsisten dengan tabel | Positive | 1. Export file Excel<br>2. Buka file<br>3. Verifikasi header kolom | File Excel memuat 12 kolom: No Claim, Date of Service, Receive Date Claim, Verifikator Receive Date, Kanit Approve Date, Send to FIS Date, Paid Date, SLA Admin, SLA Verifikator, SLA Paid, SLA All, Argo Claim | | | High | `@AC-export @columns` Scenario: File Excel memuat semua 12 kolom yang sama dengan tabel inquiry | Automated | |
| 44 | Verify naming file Excel sesuai format ReportArgoSLA_YYYYMMDDHHmmss | User role: Admin | User klik export | TC44 - Naming file Excel | Positive | 1. Klik tombol "Export SLA Report"<br>2. Verifikasi nama file yang ter-download | Nama file sesuai format: ReportArgoSLA_YYYYMMDDHHmmss.xlsx (contoh: ReportArgoSLA_20260708110803.xlsx) | | | Medium | `@AC-export @file-naming` Scenario: Nama file Excel sesuai format ReportArgoSLA_YYYYMMDDHHmmss | Automated | |
| 45 | Verify modal loading muncul selama proses export | User role: Admin | User klik export dengan data banyak | TC45 - Modal loading saat export | Positive | 1. Klik tombol "Export SLA Report"<br>2. Observasi tampilan selama proses export | Modal loading muncul selama proses export dan hilang setelah file berhasil di-download | | | Low | `@AC-export @loading` Scenario: Modal loading tampil selama proses export | Automated | |
| 46 | Verify export dengan filter KOPS + KLY oleh Kadept | User role: Kadept, KOPS: Semarang, KLY: Jogja | Filter aktif KOPS Semarang, KLY Jogja | TC46 - Export dengan filter wilayah | Positive | 1. Login sebagai Kadept<br>2. Pilih KOPS "Semarang", KLY "Jogja"<br>3. Klik Search<br>4. Klik "Export SLA Report"<br>5. Buka file Excel | File Excel hanya berisi data klaim dari KLY Jogja (konsisten dengan tabel) | | | High | `@AC-export @kops-kly` Scenario: Export dengan filter KOPS dan KLY menghasilkan data sesuai wilayah | Automated | |


---

### AC-7: Edge Cases & Negative Scenarios

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 47 | Verify filter menghasilkan 0 data menampilkan empty state | User role: Admin, Filter tanggal: 01/01/2020 - 31/01/2020 | Tidak ada data klaim di rentang tersebut | TC47 - Empty state saat 0 data | Positive | 1. Navigasi ke Report SLA<br>2. Isi filter Range Tanggal dengan rentang tanpa data<br>3. Klik Search | Tabel menampilkan pesan "Tidak ada data" / empty state, bukan error | | | Medium | `@AC-edge @empty-state` Scenario: Filter tanpa hasil menampilkan empty state | Automated | |
| 48 | Verify filter tanggal range terbalik (from > to) ditolak | User role: Admin, Date from: 30/06/2026, Date to: 01/06/2026 | User di halaman Report SLA | TC48 - Validasi range tanggal terbalik | Negative | 1. Navigasi ke Report SLA<br>2. Isi Date from: 30/06/2026<br>3. Isi Date to: 01/06/2026<br>4. Klik Search | Sistem menampilkan validasi error, search tidak dieksekusi | | | High | `@AC-edge @negative @date-validation` Scenario: Filter tanggal range terbalik ditolak oleh sistem | Automated | |
| 49 | Verify input No Claim dengan karakter spesial di-sanitize | User role: Admin, Input: "'; DROP TABLE--" | User di halaman Report SLA | TC49 - Sanitasi input No Claim | Negative | 1. Navigasi ke Report SLA<br>2. Isi field No Claim dengan "'; DROP TABLE--"<br>3. Klik Search | Input di-sanitize, tidak terjadi error atau SQL injection, tabel menampilkan empty state | | | High | `@AC-edge @negative @security` Scenario: Input karakter spesial di-sanitize tanpa error | Automated | |
| 50 | Verify data klaim yang belum Paid menampilkan kolom terkait kosong | User role: Admin | Data klaim tersedia yang belum sampai tahap Paid | TC50 - Klaim belum Paid | Positive | 1. Navigasi ke Report SLA<br>2. Cari klaim yang belum dibayar<br>3. Verifikasi kolom Paid Date, SLA Paid, SLA All | Kolom Paid Date, SLA Paid, SLA All menampilkan kosong/null/dash. Argo Claim tetap memiliki nilai. | | | Medium | `@AC-edge @null-data` Scenario: Klaim belum Paid menampilkan kolom terkait kosong | Automated | |
| 51 | Verify data klaim yang belum diterima Verifikator | User role: Admin | Data klaim baru diterima sistem, belum ke Verifikator | TC51 - Klaim belum diterima Verifikator | Positive | 1. Navigasi ke Report SLA<br>2. Cari klaim yang baru diterima<br>3. Verifikasi kolom | Kolom Verifikator Receive Date, SLA Verifikator kosong/null. Receive Date Claim dan Argo Claim terisi. | | | Medium | `@AC-edge @null-data` Scenario: Klaim belum diterima Verifikator menampilkan data partial | Automated | |
| 52 | Verify dropdown KLY di-reset saat KOPS diganti oleh Kadept | User role: Kadept | KLY sudah dipilih "Jogja" (KOPS Semarang) | TC52 - Reset KLY saat KOPS diganti | Positive | 1. Login sebagai Kadept<br>2. Pilih KOPS "Semarang"<br>3. Pilih KLY "Jogja"<br>4. Ganti KOPS ke "Surabaya"<br>5. Verifikasi dropdown KLY | Dropdown KLY di-reset ke blank, isi dropdown berubah ke KLY dalam KOPS Surabaya | | | High | `@AC-edge @dependent-dropdown` Scenario: Dropdown KLY di-reset saat KOPS diganti | Automated | |
| 53 | Verify input spasi saja di No Claim ditangani dengan benar | User role: Admin, Input: "   " (spaces only) | User di halaman Report SLA | TC53 - Input spasi saja | Negative | 1. Navigasi ke Report SLA<br>2. Isi field No Claim dengan "   " (hanya spasi)<br>3. Klik Search | Input di-trim, treated sebagai kosong, filter No Claim tidak di-apply, tampilkan seluruh data | | | Low | `@AC-edge @negative @input-validation` Scenario: Input spasi saja di No Claim diabaikan | Automated | |
| 54 | Verify filter baru apply setelah pagination di-reset ke page 1 | User role: Admin | User sudah di page 3 | TC54 - Apply filter reset pagination | Positive | 1. Navigasi ke Report SLA (data banyak)<br>2. Navigasi ke page 3<br>3. Apply filter baru<br>4. Klik Search | Hasil filter ditampilkan mulai page 1, bukan tetap di page 3 | | | Medium | `@AC-edge @pagination` Scenario: Filter baru mengembalikan pagination ke page 1 | Automated | |
| 55 | Verify export saat tabel kosong (0 data) | User role: Admin | Filter aktif menghasilkan 0 data | TC55 - Export saat tabel kosong | Negative | 1. Apply filter yang menghasilkan 0 data<br>2. Klik "Export SLA Report" | Tombol Export disabled / file Excel ter-generate hanya dengan header kolom / pesan informasi | | | Medium | `@AC-edge @export @empty` Scenario: Export saat tabel kosong ditangani dengan benar | Automated | |


---

## Coverage Summary

| Acceptance Criteria | TC Count | Type |
|-----|-----------|---------|
| AC-1: Sub menu Report SLA di Monitoring, access control | 10 (TC01-TC10) | Positive + Negative |
| AC-2: Page layout, default data, tabel 12 kolom, pagination | 5 (TC11-TC15) | Positive |
| AC-3: Tiering akses filter KOPS & KLY per role | 12 (TC16-TC27) | Positive |
| AC-4: Filter/Search functionality | 9 (TC28-TC36) | Positive |
| AC-5: Search & Reset button | 3 (TC37-TC39) | Positive |
| AC-6: Export SLA Report | 7 (TC40-TC46) | Positive |
| AC-7: Edge cases & negative scenarios | 9 (TC47-TC55) | Positive + Negative |
| **Total** | **55** | |

---

## Feature File Mapping

| TC Range | Feature Scenario | Tag |
|----------|---|---|
| TC01-TC10 | Access control Report SLA menu | `@AC-access @security` |
| TC11-TC15 | Page layout, columns, pagination, loading | `@AC-layout @pagination` |
| TC16-TC27 | Tiering filter KOPS & KLY per role | `@AC-tiering @dropdown` |
| TC28-TC36 | Filter/search functionality | `@AC-filter` |
| TC37-TC39 | Search & Reset button | `@AC-search @AC-reset` |
| TC40-TC46 | Export SLA Report | `@AC-export` |
| TC47-TC55 | Edge cases & validation | `@AC-edge @negative` |

**Feature File:** `src/features/monitoring/reportArgoSLA.feature` (TBD)

---

## Sign-off

| Role | Name | Signature |
|------|------|-----------|
| Developer | | |
| Tester | | |
| Squad Lead | | |
| BA / PO / Tribe Lead | | |

---

## Attachment

| Test Case ID | Attachment |
|---|---|
| TC01 | |
| TC02 | |
| TC03 | |
| TC04 | |
| TC05 | |
| TC06 | |
| TC07 | |
| TC08 | |
| TC09 | |
| TC10 | |
| TC11 | |
| TC12 | |
| TC13 | |
| TC14 | |
| TC15 | |
| TC16 | |
| TC17 | |
| TC18 | |
| TC19 | |
| TC20 | |
| TC21 | |
| TC22 | |
| TC23 | |
| TC24 | |
| TC25 | |
| TC26 | |
| TC27 | |
| TC28 | |
| TC29 | |
| TC30 | |
| TC31 | |
| TC32 | |
| TC33 | |
| TC34 | |
| TC35 | |
| TC36 | |
| TC37 | |
| TC38 | |
| TC39 | |
| TC40 | |
| TC41 | |
| TC42 | |
| TC43 | |
| TC44 | |
| TC45 | |
| TC46 | |
| TC47 | |
| TC48 | |
| TC49 | |
| TC50 | |
| TC51 | |
| TC52 | |
| TC53 | |
| TC54 | |
| TC55 | |