# Test Cases: NM-1286 - Setting KOPS Scoring

## Test Case Information

| Field | Value |
|-------|-------|
| **No** | |
| **Requested App Testing No** | |
| **Test Requested date** | |
| **Test Priority** | Medium |
| **Application Address** | https://development.inhealth.co.id/newmicare |
| **Description** | Setting KOPS Scoring |
| **Test Design by** | |
| **Test Execute by** | |
| **Test Execution date** | |
| **Follow Up Test By** | |
| **Follow Up Date** | |
| **Number Page** | 1 Of 1 |
| **Jira Reference** | NM-1286 |
| **Parent** | NM-1250 |
| **Sprint** | Claim Operation Sprint 24 |
| **Version** | TC.2026.02 |

---

## Test Cases

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Verify user Staff Klaim HO dapat mengakses menu KOPS Score Setting | User role: Staff Klaim Kantor Pusat | User sudah login dengan role Staff Klaim HO | TC01 - Akses menu KOPS Score Setting oleh user HO | Positive | 1. Login ke New MiCare sebagai Staff Klaim HO<br>2. Klik menu Manajemen Klaim di sidebar<br>3. Verifikasi sub menu "KOPS Score" tampil<br>4. Klik sub menu "KOPS Score" | Sub menu "KOPS Score" tampil dan dapat diakses, halaman KOPS Score Setting terbuka dengan benar | | | Medium | `@AC-access @smoke` Scenario: User Staff Klaim HO berhasil mengakses menu KOPS Score Setting | Automated | |
| 2 | Verify user Kepala Departemen Klaim dapat mengakses menu KOPS Score Setting | User role: Kepala Departemen Klaim | User sudah login dengan role Kepala Departemen Klaim | TC02 - Akses menu KOPS Score Setting oleh Kepala Departemen | Positive | 1. Login ke New MiCare sebagai Kepala Departemen Klaim<br>2. Klik menu Manajemen Klaim di sidebar<br>3. Verifikasi sub menu "KOPS Score" tampil<br>4. Klik sub menu "KOPS Score" | Sub menu "KOPS Score" tampil dan dapat diakses, halaman KOPS Score Setting terbuka dengan benar | | | Medium | `@AC-access` Scenario: User Kepala Departemen Klaim berhasil mengakses menu KOPS Score Setting | Automated | |
| 3 | Verify user non-HO TIDAK dapat mengakses menu KOPS Score Setting | User role: Verifikator Cabang | User sudah login dengan role non-HO (cabang) | TC03 - Akses menu KOPS Score Setting ditolak untuk user non-HO | Negative | 1. Login ke New MiCare sebagai user non-HO<br>2. Klik menu Manajemen Klaim di sidebar<br>3. Verifikasi apakah sub menu "KOPS Score" tampil | Sub menu "KOPS Score" TIDAK tampil atau tidak dapat diakses | | | High | `@AC-access @negative` Scenario: User non-HO tidak dapat mengakses menu KOPS Score Setting | Automated | |
| 4 | Verify user non-HO tidak dapat akses halaman via direct URL | User role: Verifikator Cabang, URL langsung ke KOPS Score Setting | User login dengan role non-HO | TC04 - Direct URL access oleh non-HO | Negative | 1. Login sebagai user non-HO<br>2. Akses URL halaman KOPS Score Setting secara langsung via browser | User diredirect ke halaman unauthorized / access denied | | | High | `@AC-access @negative @security` Scenario: User non-HO tidak dapat mengakses halaman KOPS Score via direct URL | Automated | |
| 5 | Verify halaman list KOPS Score Setting menampilkan tabel dengan kolom yang benar | User role: Staff Klaim HO | User sudah berada di halaman KOPS Score Setting | TC05 - Tampilan tabel list KOPS Score Setting | Positive | 1. Login ke New MiCare sebagai Staff Klaim HO<br>2. Navigasi ke KOPS Score Setting<br>3. Verifikasi kolom tabel | Tabel menampilkan kolom: Action, KOPS, Start Periode, End Periode, Target Score | | | Medium | `@AC-list @smoke` Scenario: Halaman list KOPS Score Setting menampilkan kolom tabel yang benar | Automated | |
| 6 | Verify filter periode berfungsi menampilkan data sesuai bulan yang dipilih | User role: Staff Klaim HO, Filter: Januari 2026 | Data KOPS Score sudah tersedia untuk Januari 2026 | TC06 - Filter periode menampilkan data sesuai bulan | Positive | 1. Navigasi ke halaman KOPS Score Setting<br>2. Klik dropdown Filter Periode<br>3. Pilih "Januari 2026"<br>4. Verifikasi data di tabel | Tabel menampilkan hanya data KOPS Score untuk periode Januari 2026 | | | Medium | `@AC-list @filter` Scenario: Filter periode menampilkan data KOPS Score sesuai bulan yang dipilih | Automated | |
| 7 | Verify filter periode tanpa data menampilkan tabel kosong | User role: Staff Klaim HO, Filter: bulan yang belum ada data | Tidak ada data KOPS Score untuk bulan yang dipilih | TC07 - Filter periode tanpa data | Positive | 1. Navigasi ke halaman KOPS Score Setting<br>2. Pilih periode bulan yang belum memiliki data<br>3. Verifikasi tampilan tabel | Tabel menampilkan pesan "Data not found" atau tabel kosong | | | Low | `@AC-list @filter` Scenario: Filter periode tanpa data menampilkan tabel kosong | Automated | |
| 8 | Verify pagination tabel berfungsi dengan benar | User role: Staff Klaim HO | Data KOPS Score tersedia | TC08 - Pagination list | Positive | 1. Navigasi ke halaman KOPS Score Setting<br>2. Verifikasi informasi pagination (e.g., "Showing 1-5 of 5 entries")<br>3. Jika multi-page, klik navigasi halaman | Pagination menampilkan informasi jumlah data yang benar dan navigasi halaman berfungsi | | | Low | `@AC-list @ui` Scenario: Pagination tabel menampilkan informasi jumlah data yang benar | Automated | |
| 9 | Verify tombol [+ Tambah Setting] tersedia di halaman list | User role: Staff Klaim HO | User sudah berada di halaman KOPS Score Setting | TC09 - Tombol Tambah Setting tersedia | Positive | 1. Navigasi ke halaman KOPS Score Setting<br>2. Verifikasi keberadaan tombol "+ Tambah Setting" | Tombol "+ Tambah Setting" tampil di halaman | | | Low | `@AC-add @smoke` Scenario: Tombol Tambah Setting tersedia di halaman list KOPS Score | Automated | |
| 10 | Verify form input KOPS Score Setting terbuka saat klik Tambah Setting | User role: Staff Klaim HO | User sudah berada di halaman list KOPS Score Setting | TC10 - Form tambah setting terbuka | Positive | 1. Klik tombol "+ Tambah Setting"<br>2. Verifikasi form terbuka dengan field: KOPS, Periode, Start Periode, End Periode, Target Score<br>3. Verifikasi tombol Simpan dan Batal tersedia | Form "FORM – KOPS SCORE SETTING" terbuka dengan semua field dan tombol Simpan/Batal | | | Medium | `@AC-add` Scenario: Form input KOPS Score Setting terbuka dengan field yang benar | Automated | |
| 11 | Verify dropdown KOPS menampilkan daftar KOPS yang tersedia | User role: Staff Klaim HO | Form KOPS Score Setting terbuka, data master KOPS tersedia | TC11 - Dropdown KOPS | Positive | 1. Klik dropdown KOPS<br>2. Verifikasi pilihan yang tersedia | Dropdown KOPS menampilkan daftar KOPS (e.g., (1101) – SEMARANG, (1102) – SURABAYA, (1103) – JAKARTA, dll) | | | Medium | `@AC-add @form-validation` Scenario: Dropdown KOPS menampilkan daftar KOPS yang tersedia | Automated | |
| 12 | Verify dropdown Periode menampilkan pilihan bulan dan tahun | User role: Staff Klaim HO | Form KOPS Score Setting terbuka | TC12 - Dropdown Periode | Positive | 1. Klik dropdown Periode<br>2. Verifikasi pilihan yang tersedia | Dropdown Periode menampilkan opsi bulan & tahun (e.g., Januari 2026, Februari 2026, dst) | | | Medium | `@AC-add @form-validation` Scenario: Dropdown Periode menampilkan pilihan bulan dan tahun | Automated | |
| 13 | Verify Start Periode otomatis terisi tanggal 1 bulan yang dipilih | User role: Staff Klaim HO, Periode: Januari 2026 | Form KOPS Score Setting terbuka | TC13 - Auto-fill Start Periode | Positive | 1. Pilih Periode "Januari 2026" di dropdown<br>2. Verifikasi field Start Periode | Start Periode otomatis terisi "1 Januari 2026" dan bersifat read-only | | | Medium | `@AC-add @auto-fill` Scenario: Start Periode otomatis terisi tanggal 1 bulan yang dipilih | Automated | |
| 14 | Verify End Periode otomatis terisi tanggal terakhir bulan yang dipilih | User role: Staff Klaim HO, Periode: Januari 2026 | Form KOPS Score Setting terbuka | TC14 - Auto-fill End Periode | Positive | 1. Pilih Periode "Januari 2026" di dropdown<br>2. Verifikasi field End Periode | End Periode otomatis terisi "31 Januari 2026" dan bersifat read-only | | | Medium | `@AC-add @auto-fill` Scenario: End Periode otomatis terisi tanggal terakhir bulan yang dipilih | Automated | |
| 15 | Verify End Periode benar untuk bulan Februari non-kabisat | User role: Staff Klaim HO, Periode: Februari 2026 | Form KOPS Score Setting terbuka | TC15 - Auto-fill End Periode Februari non-kabisat | Positive | 1. Pilih Periode "Februari 2026" di dropdown<br>2. Verifikasi field End Periode | End Periode otomatis terisi "28 Februari 2026" | | | Medium | `@AC-add @auto-fill @edge-case` Scenario: End Periode benar untuk bulan Februari tahun non-kabisat | Automated | |
| 16 | Verify End Periode benar untuk bulan Februari kabisat | User role: Staff Klaim HO, Periode: Februari 2028 | Form KOPS Score Setting terbuka | TC16 - Auto-fill End Periode Februari kabisat | Positive | 1. Pilih Periode "Februari 2028" di dropdown<br>2. Verifikasi field End Periode | End Periode otomatis terisi "29 Februari 2028" | | | Medium | `@AC-add @auto-fill @edge-case` Scenario: End Periode benar untuk bulan Februari tahun kabisat | Automated | |
| 17 | Verify Start Periode dan End Periode bersifat read-only | User role: Staff Klaim HO | Form KOPS Score Setting terbuka, Periode sudah dipilih | TC17 - Start & End Periode read-only | Positive | 1. Pilih Periode dari dropdown<br>2. Coba klik/edit field Start Periode<br>3. Coba klik/edit field End Periode | Kedua field tidak dapat diedit secara manual (read-only / disabled) | | | Medium | `@AC-add @form-validation` Scenario: Start Periode dan End Periode tidak dapat diedit manual | Automated | |
| 18 | Verify field Target Score menerima input angka valid (rentang 0-500) | User role: Staff Klaim HO | Form KOPS Score Setting terbuka | TC18 - Input Target Score valid | Positive | 1. Klik field Target Score<br>2. Input angka "200"<br>3. Verifikasi input diterima | Field Target Score menerima input angka "200" tanpa error | | | Medium | `@AC-add @form-validation` Scenario: Field Target Score menerima input angka valid dalam range 0-500 | Automated | |
| 19 | Verify field Target Score menerima nilai batas bawah (0) | User role: Staff Klaim HO | Form KOPS Score Setting terbuka | TC19 - Input Target Score boundary bawah (0) | Positive | 1. Klik field Target Score<br>2. Input angka "0"<br>3. Verifikasi input diterima | Field Target Score menerima input "0" tanpa error (sesuai AC-6: rentang 0-500) | | | Medium | `@AC-add @form-validation @boundary` Scenario: Field Target Score menerima nilai batas bawah 0 | Automated | |
| 20 | Verify field Target Score menerima nilai batas atas (500) | User role: Staff Klaim HO | Form KOPS Score Setting terbuka | TC20 - Input Target Score boundary atas (500) | Positive | 1. Klik field Target Score<br>2. Input angka "500"<br>3. Verifikasi input diterima | Field Target Score menerima input "500" tanpa error (sesuai AC-6: rentang 0-500) | | | Medium | `@AC-add @form-validation @boundary` Scenario: Field Target Score menerima nilai batas atas 500 | Automated | |
| 21 | Verify field Target Score menolak input melebihi 500 | User role: Staff Klaim HO | Form KOPS Score Setting terbuka | TC21 - Input Target Score melebihi max (>500) | Negative | 1. Klik field Target Score<br>2. Input angka "501"<br>3. Verifikasi validasi | Sistem menampilkan pesan error validasi bahwa score maksimal adalah 500 | | | High | `@AC-add @form-validation @negative @boundary` Scenario: Field Target Score menolak input angka melebihi batas maksimum 500 | Automated | |
| 22 | Verify field Target Score menolak input negatif | User role: Staff Klaim HO | Form KOPS Score Setting terbuka | TC22 - Input Target Score negatif | Negative | 1. Klik field Target Score<br>2. Input angka "-1"<br>3. Verifikasi validasi | Sistem menampilkan pesan error validasi bahwa score tidak boleh negatif | | | Medium | `@AC-add @form-validation @negative` Scenario: Field Target Score menolak input angka negatif | Automated | |
| 23 | Verify field Target Score menolak input non-numerik | User role: Staff Klaim HO | Form KOPS Score Setting terbuka | TC23 - Input Target Score non-numerik | Negative | 1. Klik field Target Score<br>2. Input karakter "abc"<br>3. Verifikasi validasi | Field Target Score tidak menerima karakter non-numerik atau menampilkan error | | | Medium | `@AC-add @form-validation @negative` Scenario: Field Target Score menolak input karakter non-numerik | Automated | |
| 24 | Verify field Target Score menolak input desimal | User role: Staff Klaim HO | Form KOPS Score Setting terbuka | TC24 - Input Target Score desimal | Negative | 1. Klik field Target Score<br>2. Input angka "150.5"<br>3. Verifikasi validasi | Field Target Score tidak menerima input desimal, hanya integer yang valid | | | Medium | `@AC-add @form-validation @negative` Scenario: Field Target Score menolak input angka desimal | Automated | |
| 25 | Verify user berhasil menyimpan setting KOPS Score baru | KOPS: (1101) – SEMARANG, Periode: Agustus 2026, Target Score: 200 | Form terisi lengkap dengan data valid, kombinasi KOPS+Periode belum ada | TC25 - Simpan setting baru berhasil | Positive | 1. Isi form dengan data valid:<br>   - KOPS: (1101) – SEMARANG<br>   - Periode: Agustus 2026<br>   - Target Score: 200<br>2. Klik tombol "Simpan"<br>3. Verifikasi data tersimpan | Data berhasil tersimpan, muncul notifikasi sukses, data baru tampil di list saat filter Agustus 2026 | | | High | `@AC-save @e2e` Scenario: User berhasil menyimpan setting KOPS Score baru dengan data valid | Automated | |
| 26 | Verify validasi form saat submit dengan field kosong | User role: Staff Klaim HO | Form KOPS Score Setting terbuka, semua field kosong | TC26 - Submit form dengan field kosong | Negative | 1. Buka form tambah setting<br>2. Langsung klik "Simpan" tanpa mengisi field apapun | Sistem menampilkan validasi error pada semua mandatory field | | | High | `@AC-save @form-validation @negative` Scenario: Sistem menampilkan validasi error saat form disubmit dengan field kosong | Automated | |
| 27 | Verify validasi duplikat KOPS + Periode yang sama | KOPS: (1101) – SEMARANG, Periode: Januari 2026 (sudah ada) | Data setting KOPS (1101) – SEMARANG untuk Januari 2026 sudah ada | TC27 - Simpan duplikat KOPS+Periode ditolak | Negative | 1. Isi form dengan KOPS dan Periode yang sudah ada di sistem<br>2. Klik "Simpan" | Sistem menampilkan pesan error bahwa setting untuk KOPS dan periode tersebut sudah ada / tidak boleh duplikat (AC-7) | | | High | `@AC-save @negative @duplicate` Scenario: Sistem menolak penyimpanan setting dengan KOPS dan Periode duplikat | Automated | |
| 28 | Verify tombol Batal membatalkan input tanpa menyimpan | User role: Staff Klaim HO | Form sudah terisi sebagian | TC28 - Batal tanpa menyimpan | Positive | 1. Isi form dengan beberapa data<br>2. Klik tombol "Batal"<br>3. Verifikasi form tertutup<br>4. Verifikasi data TIDAK tersimpan di list | Form tertutup/kembali ke list, data yang diinput TIDAK tersimpan | | | Medium | `@AC-cancel` Scenario: User membatalkan input dan data tidak tersimpan | Automated | |
| 29 | Verify user dapat membuka form edit dari tombol [Edit] | User role: Staff Klaim HO | Data KOPS Score sudah tersedia di list, periode masih di masa depan | TC29 - Buka form edit | Positive | 1. Di halaman list, klik tombol [Edit] pada salah satu baris (periode masa depan)<br>2. Verifikasi form edit terbuka dengan data existing | Form edit terbuka dan menampilkan data existing (KOPS, Periode, Start Periode, End Periode, Target Score) yang sudah terisi sesuai record | | | Medium | `@AC-edit` Scenario: User membuka form edit dan data existing tampil dengan benar | Automated | |
| 30 | Verify user berhasil mengubah Target Score pada record existing | Data existing: (1101) – SEMARANG, Januari 2027, Score: 200 → Score baru: 250 | Setting KOPS Score yang akan diedit ada dan periodenya di masa depan | TC30 - Edit Target Score berhasil | Positive | 1. Klik [Edit] pada baris KOPS (1101) – SEMARANG periode masa depan<br>2. Ubah Target Score dari 200 menjadi 250<br>3. Klik "Simpan"<br>4. Verifikasi perubahan di list | Target Score berhasil diubah menjadi 250, data di list terupdate | | | High | `@AC-edit @e2e` Scenario: User berhasil mengubah Target Score pada record existing | Automated | |
| 31 | Verify tombol Edit disabled/hidden untuk setting bulan berjalan | User role: Staff Klaim HO | Data KOPS Score tersedia untuk bulan berjalan (Juli 2026) | TC31 - Edit disabled untuk bulan berjalan | Negative | 1. Navigasi ke halaman KOPS Score Setting<br>2. Filter periode ke bulan berjalan (Juli 2026)<br>3. Verifikasi status tombol [Edit] | Tombol [Edit] disabled/hidden/tidak dapat diklik untuk setting bulan berjalan (AC-8) | | | High | `@AC-edit @negative @immutable` Scenario: Tombol Edit disabled untuk setting bulan berjalan | Automated | |
| 32 | Verify tombol Edit disabled/hidden untuk setting bulan lampau | User role: Staff Klaim HO | Data KOPS Score tersedia untuk bulan lampau (Januari 2026) | TC32 - Edit disabled untuk bulan lampau | Negative | 1. Navigasi ke halaman KOPS Score Setting<br>2. Filter periode ke bulan lampau (Januari 2026)<br>3. Verifikasi status tombol [Edit] | Tombol [Edit] disabled/hidden/tidak dapat diklik untuk setting bulan yang sudah lewat (AC-8) | | | High | `@AC-edit @negative @immutable` Scenario: Tombol Edit disabled untuk setting bulan yang sudah berlalu | Automated | |
| 33 | Verify tombol Edit aktif untuk setting bulan masa depan | User role: Staff Klaim HO | Data KOPS Score tersedia untuk bulan masa depan (Agustus 2026) | TC33 - Edit aktif untuk bulan masa depan | Positive | 1. Navigasi ke halaman KOPS Score Setting<br>2. Filter periode ke bulan masa depan (Agustus 2026)<br>3. Verifikasi status tombol [Edit] | Tombol [Edit] aktif dan dapat diklik untuk setting bulan masa depan | | | Medium | `@AC-edit` Scenario: Tombol Edit aktif untuk setting bulan masa depan | Automated | |
| 34 | Verify bobot antar KOPS bisa berbeda untuk periode yang sama | KOPS: (1101) – SEMARANG Score: 200, (1102) – SURABAYA Score: 180 | Periode yang sama: Agustus 2026 | TC34 - Bobot antar KOPS berbeda | Positive | 1. Tambah setting KOPS (1101) – SEMARANG, Agustus 2026, Score: 200<br>2. Tambah setting KOPS (1102) – SURABAYA, Agustus 2026, Score: 180<br>3. Verifikasi kedua data tersimpan dengan score berbeda | Kedua setting tersimpan dengan target score berbeda untuk periode yang sama (AC-4) | | | Medium | `@AC-save @different-score` Scenario: Bobot antar KOPS bisa disetting berbeda untuk periode yang sama | Automated | |
| 35 | Verify target setiap verifikator dalam 1 KOPS sama setiap harinya | KOPS: (1101) – SEMARANG, Periode: Agustus 2026, Score: 200 | Setting sudah tersimpan | TC35 - Target verifikator konsisten harian | Positive | 1. Setting KOPS (1101) – SEMARANG, Agustus 2026, Score: 200<br>2. Verifikasi bahwa semua verifikator di KOPS 1101 mendapat target harian 200<br>3. Verifikasi target tidak berubah di hari berbeda dalam bulan yang sama | Semua verifikator dalam KOPS tersebut memiliki target harian yang sama (200) dan konsisten setiap hari (AC-2, AC-3) | | | High | `@AC-daily-target @e2e` Scenario: Target setiap verifikator dalam 1 KOPS konsisten sama setiap harinya | Manual / API | |
| 36 | Verify setting periode harus dimulai tanggal 1 dan berakhir tanggal terakhir bulan | KOPS: (1101) – SEMARANG, Periode: Maret 2027 | Form KOPS Score Setting terbuka | TC36 - Periode selalu tanggal 1 s.d. akhir bulan | Positive | 1. Pilih Periode "Maret 2027"<br>2. Verifikasi Start Periode = "1 Maret 2027"<br>3. Verifikasi End Periode = "31 Maret 2027"<br>4. Simpan setting<br>5. Verifikasi di list | Start Periode selalu tanggal 1 dan End Periode selalu tanggal terakhir bulan (AC-9) | | | Medium | `@AC-period @auto-fill` Scenario: Setting periode selalu dimulai tanggal 1 dan berakhir tanggal terakhir bulan | Automated | |

---

## Coverage Summary

| Acceptance Criteria | TC Count | Type |
|-----|-----------|---------|
| AC-1: Menyimpan setting bobot KOPS per bulan | 3 (TC25, TC26, TC27) | Positive + Negative |
| AC-2: Target harian verifikator | 1 (TC35) | Positive |
| AC-3: Target sama setiap hari | 1 (TC35) | Positive |
| AC-4: Bobot antar KOPS berbeda | 1 (TC34) | Positive |
| AC-5: Akses terbatas Staff Klaim HO / Kepala Dept | 4 (TC01, TC02, TC03, TC04) | Positive + Negative |
| AC-6: Score rentang 0-500 | 7 (TC18-TC24) | Positive + Negative |
| AC-7: Tidak boleh duplikat KOPS+Periode | 1 (TC27) | Negative |
| AC-8: Bulan berjalan/lampau tidak dapat diubah | 3 (TC31, TC32, TC33) | Positive + Negative |
| AC-9: Periode tanggal 1 s.d. akhir bulan | 4 (TC13-TC16) | Positive |
| UI: List, Filter, Pagination, Form | 8 (TC05-TC12) | Positive |
| UX: Cancel, Edit flow | 4 (TC28-TC30, TC36) | Positive |
| **Total** | **36** | |

---

## Feature File Mapping

| TC Range | Feature Scenario | Tag |
|----------|---|---|
| TC01-TC04 | Access control KOPS Score Setting | `@AC-access` |
| TC05-TC08 | List KOPS Score Setting display & filter | `@AC-list @filter` |
| TC09-TC12 | Form input dan dropdown | `@AC-add` |
| TC13-TC17 | Auto-fill Start/End Periode | `@AC-add @auto-fill` |
| TC18-TC24 | Validasi Target Score input | `@AC-add @form-validation` |
| TC25-TC27 | Save KOPS Score setting | `@AC-save` |
| TC28 | Cancel form | `@AC-cancel` |
| TC29-TC33 | Edit KOPS Score setting & immutability | `@AC-edit @immutable` |
| TC34-TC36 | Business rules (different score, daily target, period) | `@AC-daily-target @different-score` |

**Feature File:** `src/features/scoring/settingKopsScoring.feature` (TBD)

---

## Sign-off

| Role | Name | Signature |
|------|------|-----------|
| Developer | | |
| Tester | | |
| Squad Lead | | |
| BA / PO / Tribe Lead | pujiyanto255 | |

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
