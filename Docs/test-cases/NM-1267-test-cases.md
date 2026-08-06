# Test Cases: NM-1267 - Setting Klasifikasi Scoring Klaim

## Test Case Information

| Field | Value |
|-------|-------|
| **No** | |
| **Requested App Testing No** | |
| **Test Requested date** | |
| **Test Priority** | Medium |
| **Application Address** | https://development.inhealth.co.id/newmicare |
| **Description** | Setting Klasifikasi Scoring Klaim |
| **Test Design by** | |
| **Test Execute by** | |
| **Test Execution date** | |
| **Follow Up Test By** | |
| **Follow Up Date** | |
| **Number Page** | 1 Of 1 |
| **Jira Reference** | NM-1267 |
| **Parent** | NM-1250 |
| **Sprint** | Claim Operation Sprint 24 |
| **Version** | TC.2026.02 |

---

## Test Cases

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Verify user kantor pusat dapat mengakses menu Setting Score Parameter | User role: Verifikator Pusat | User sudah login dengan role kantor pusat | TC01 - Akses menu Setting Score Parameter oleh user HO | Positive | 1. Login ke New MiCare sebagai user kantor pusat<br>2. Klik menu Manajemen Klaim di sidebar<br>3. Verifikasi sub menu "Setting Score Parameter" tampil<br>4. Klik sub menu "Setting Score Parameter" | Sub menu "Setting Score Parameter" tampil dan dapat diakses, halaman Claim Scoring Setting terbuka dengan benar | | | Medium | `@AC-access @smoke` Scenario: User kantor pusat berhasil mengakses menu Setting Score Parameter | Automated | Attachment TC01 |
| 2 | Verify user non-kantor pusat TIDAK dapat mengakses menu Setting Score Parameter | User role: Verifikator Cabang | User sudah login dengan role non-kantor pusat (cabang) | TC02 - Akses menu Setting Score Parameter ditolak untuk user non-HO | Negative | 1. Login ke New MiCare sebagai user non-kantor pusat<br>2. Klik menu Manajemen Klaim di sidebar<br>3. Verifikasi apakah sub menu "Setting Score Parameter" tampil | Sub menu "Setting Score Parameter" TIDAK tampil atau tidak dapat diakses | | | High | `@AC-access @negative` Scenario: User non-kantor pusat tidak dapat mengakses menu Setting Score Parameter | Automated | Attachment TC02 |
| 3 | Verify halaman list Claim Scoring Setting menampilkan tabel dengan kolom yang benar | User role: Verifikator Pusat | User sudah berada di halaman Setting Score Parameter | TC03 - Tampilan tabel list Claim Scoring Setting | Positive | 1. Login ke New MiCare sebagai user kantor pusat<br>2. Navigasi ke Setting Score Parameter<br>3. Verifikasi kolom tabel | Tabel menampilkan kolom: Action, TKP, Group, Facility, Transaction, Score, Measurement | | | Medium | `@AC-list @smoke` Scenario: Halaman list Claim Scoring Setting menampilkan kolom tabel yang benar | Automated | Attachment TC03 |
| 4 | Verify data scoring yang tersimpan tampil di list setting klasifikasi scoring | Data seed: 16 kombinasi scoring (RJTP/RITP/RJTL/RITL × CASHLESS/REIMBURSE × ManagedCare/Indemnity) | Data config_claim_score sudah terisi | TC04 - Data scoring tampil di list | Positive | 1. Login ke New MiCare sebagai user kantor pusat<br>2. Navigasi ke Setting Score Parameter<br>3. Verifikasi data tampil di tabel<br>4. Verifikasi jumlah data ("Showing 1-16 of 16 entries") | Semua 16 kombinasi scoring tampil di tabel dengan data yang benar | | | Medium | `@AC-list` Scenario: Data scoring yang tersimpan tampil lengkap di list setting klasifikasi scoring | Automated | Attachment TC04 |
| 5 | Verify tombol [+ Tambah Setting] tersedia di halaman list | User role: Verifikator Pusat | User sudah berada di halaman Setting Score Parameter | TC05 - Tombol Tambah Setting tersedia | Positive | 1. Login ke New MiCare sebagai user kantor pusat<br>2. Navigasi ke Setting Score Parameter<br>3. Verifikasi keberadaan tombol "+ Tambah Setting" | Tombol "+ Tambah Setting" tampil di atas tabel | | | Low | `@AC-add @smoke` Scenario: Tombol Tambah Setting tersedia di halaman list scoring | Automated | Attachment TC05 |
| 6 | Verify form input Claim Score Setting terbuka saat klik Tambah Setting | User role: Verifikator Pusat | User sudah berada di halaman list Claim Scoring Setting | TC06 - Form tambah setting terbuka | Positive | 1. Klik tombol "+ Tambah Setting"<br>2. Verifikasi form terbuka dengan field: TKP, Group, Facility, Transaction Type, Score, Measurement<br>3. Verifikasi tombol Simpan dan Batal tersedia | Form "FORM - CLAIM SCORING SETTING" terbuka dengan semua field dropdown dan input, serta tombol Simpan dan Batal | | | Medium | `@AC-add` Scenario: Form input Claim Score Setting terbuka dengan field yang benar | Automated | Attachment TC06 |
| 7 | Verify dropdown TKP menampilkan pilihan yang benar | User role: Verifikator Pusat | Form Claim Score Setting terbuka | TC07 - Dropdown TKP | Positive | 1. Klik dropdown TKP<br>2. Verifikasi pilihan yang tersedia | Dropdown TKP menampilkan opsi: RJTP, RITP, RJTL, RITL | | | Medium | `@AC-add @form-validation` Scenario: Dropdown TKP menampilkan opsi RJTP, RITP, RJTL, RITL | Automated | Attachment TC07 |
| 8 | Verify dropdown Group menampilkan pilihan yang benar | User role: Verifikator Pusat | Form Claim Score Setting terbuka | TC08 - Dropdown Group | Positive | 1. Klik dropdown Group<br>2. Verifikasi pilihan yang tersedia | Dropdown Group menampilkan opsi: RJ, RI | | | Medium | `@AC-add @form-validation` Scenario: Dropdown Group menampilkan opsi RJ dan RI | Automated | Attachment TC08 |
| 9 | Verify dropdown Facility menampilkan pilihan yang benar | User role: Verifikator Pusat | Form Claim Score Setting terbuka | TC09 - Dropdown Facility | Positive | 1. Klik dropdown Facility<br>2. Verifikasi pilihan yang tersedia | Dropdown Facility menampilkan opsi: CASHLESS, REIMBURSE | | | Medium | `@AC-add @form-validation` Scenario: Dropdown Facility menampilkan opsi CASHLESS dan REIMBURSE | Automated | Attachment TC09 |
| 10 | Verify dropdown Transaction Type menampilkan pilihan yang benar | User role: Verifikator Pusat | Form Claim Score Setting terbuka | TC10 - Dropdown Transaction Type | Positive | 1. Klik dropdown Transaction Type<br>2. Verifikasi pilihan yang tersedia | Dropdown Transaction Type menampilkan opsi: ManagedCare, Indemnity | | | Medium | `@AC-add @form-validation` Scenario: Dropdown Transaction Type menampilkan opsi ManagedCare dan Indemnity | Automated | Attachment TC10 |
| 11 | Verify field Score menerima input angka dengan max 10 | User role: Verifikator Pusat | Form Claim Score Setting terbuka | TC11 - Input Score valid (angka 1-10) | Positive | 1. Klik field Score<br>2. Input angka "7"<br>3. Verifikasi input diterima | Field Score menerima input angka "7" tanpa error | | | Medium | `@AC-add @form-validation` Scenario: Field Score menerima input angka valid dalam range 1-10 | Automated | Attachment TC11 |
| 12 | Verify field Score menolak input lebih dari 10 | User role: Verifikator Pusat | Form Claim Score Setting terbuka | TC12 - Input Score melebihi max (>10) | Negative | 1. Klik field Score<br>2. Input angka "15"<br>3. Verifikasi validasi | Sistem menampilkan pesan error validasi bahwa score maksimal adalah 10 | | | High | `@AC-add @form-validation @negative` Scenario: Field Score menolak input angka melebihi batas maksimum 10 | Automated | Attachment TC12 |
| 13 | Verify field Score menolak input non-numerik | User role: Verifikator Pusat | Form Claim Score Setting terbuka | TC13 - Input Score non-numerik | Negative | 1. Klik field Score<br>2. Input karakter "abc"<br>3. Verifikasi validasi | Field Score tidak menerima karakter non-numerik atau menampilkan error | | | Medium | `@AC-add @form-validation @negative` Scenario: Field Score menolak input karakter non-numerik | Automated | Attachment TC13 |
| 14 | Verify field Score menolak input 0 atau negatif | User role: Verifikator Pusat | Form Claim Score Setting terbuka | TC14 - Input Score nol atau negatif | Negative | 1. Klik field Score<br>2. Input angka "0" atau "-1"<br>3. Verifikasi validasi | Sistem menampilkan pesan error validasi bahwa score minimal harus lebih dari 0 | | | Medium | `@AC-add @form-validation @negative` Scenario: Field Score menolak input angka nol atau negatif | Automated | Attachment TC14 |
| 15 | Verify dropdown Measurement menampilkan pilihan yang benar | User role: Verifikator Pusat | Form Claim Score Setting terbuka | TC15 - Dropdown Measurement | Positive | 1. Klik dropdown Measurement<br>2. Verifikasi pilihan yang tersedia | Dropdown Measurement menampilkan opsi: minutes/case | | | Low | `@AC-add @form-validation` Scenario: Dropdown Measurement menampilkan opsi minutes/case | Automated | Attachment TC15 |
| 16 | Verify user berhasil menyimpan setting bobot case baru | TKP: RJTP, Group: RJ, Facility: CASHLESS, Transaction: ManagedCare, Score: 3, Measurement: minutes/case | Form terisi lengkap dengan data valid, kombinasi belum ada | TC16 - Simpan setting baru berhasil | Positive | 1. Isi form dengan data valid:<br>   - TKP: RJTP<br>   - Group: RJ<br>   - Facility: CASHLESS<br>   - Transaction: ManagedCare<br>   - Score: 3<br>   - Measurement: minutes/case<br>2. Klik tombol "Simpan"<br>3. Verifikasi data tersimpan | Data berhasil tersimpan, muncul notifikasi sukses, data baru tampil di list | | | High | `@AC-save @e2e` Scenario: User berhasil menyimpan setting bobot case baru dengan data valid | Automated | Attachment TC16 |
| 17 | Verify validasi form saat submit dengan field kosong | User role: Verifikator Pusat | Form Claim Score Setting terbuka, semua field kosong | TC17 - Submit form dengan field kosong | Negative | 1. Buka form tambah setting<br>2. Langsung klik "Simpan" tanpa mengisi field apapun | Sistem menampilkan validasi error pada semua mandatory field | | | High | `@AC-save @form-validation @negative` Scenario: Sistem menampilkan validasi error saat form disubmit dengan field kosong | Automated | Attachment TC17 |
| 18 | Verify validasi duplikat kombinasi TKP+Group+Facility+Transaction | Data sama dengan entry existing: TKP: RJTP, Group: RJ, Facility: CASHLESS, Transaction: ManagedCare | Data dengan kombinasi yang sama sudah ada di database | TC18 - Simpan duplikat kombinasi ditolak | Negative | 1. Isi form dengan kombinasi yang sudah ada<br>2. Klik "Simpan" | Sistem menampilkan pesan error bahwa kombinasi sudah ada / tidak boleh duplikat | | | High | `@AC-save @negative` Scenario: Sistem menolak penyimpanan setting dengan kombinasi duplikat | Automated | Attachment TC18 |
| 19 | Verify tombol Batal membatalkan input tanpa menyimpan | User role: Verifikator Pusat | Form sudah terisi sebagian | TC19 - Batal tanpa menyimpan | Positive | 1. Isi form dengan beberapa data<br>2. Klik tombol "Batal"<br>3. Verifikasi form tertutup<br>4. Verifikasi data TIDAK tersimpan di list | Form tertutup/kembali ke list, data yang diinput TIDAK tersimpan | | | Medium | `@AC-cancel` Scenario: User membatalkan input dan data tidak tersimpan | Automated | Attachment TC19 |
| 20 | Verify user dapat membuka form edit dari tombol [Edit] | User role: Verifikator Pusat | Data scoring sudah tersedia di list | TC20 - Buka form edit | Positive | 1. Di halaman list, klik tombol [Edit] pada salah satu baris<br>2. Verifikasi form edit terbuka dengan data existing | Form edit terbuka dan menampilkan data existing (TKP, Group, Facility, Transaction, Score, Measurement) yang sudah terisi sesuai record | | | Medium | `@AC-edit` Scenario: User membuka form edit dan data existing tampil dengan benar | Automated | Attachment TC20 |
| 21 | Verify user berhasil mengubah score pada record existing | Data existing: RITL, RI, CASHLESS, Indemnity, Score: 10 → Score baru: 8 | Data scoring yang akan diedit sudah ada | TC21 - Edit score berhasil | Positive | 1. Klik [Edit] pada baris RITL-RI-CASHLESS-Indemnity<br>2. Ubah Score dari 10 menjadi 8<br>3. Klik "Simpan"<br>4. Verifikasi perubahan di list | Score berhasil diubah menjadi 8, data di list terupdate, field modified_at dan modified_by terupdate | | | High | `@AC-edit @e2e` Scenario: User berhasil mengubah score pada record existing | Automated | Attachment TC21 |
| 22 | Verify perubahan bobot case berlaku sebagai parameter perhitungan point | Score RJTL-RJ-CASHLESS-ManagedCare diubah dari 4 menjadi 6 | Setting scoring sudah diubah | TC22 - Bobot diterapkan sebagai parameter | Positive | 1. Ubah score RJTL-RJ-CASHLESS-ManagedCare menjadi 6<br>2. Simpan perubahan<br>3. Verifikasi bahwa score baru digunakan dalam perhitungan assign klaim berikutnya | Score baru (6) digunakan sebagai parameter perhitungan point untuk assign klaim ke verifikator | | | High | `@AC-apply @e2e` Scenario: Bobot case yang diubah diterapkan sebagai parameter perhitungan point assign klaim | Manual / API | Attachment TC22 |
| 23 | Verify data scoring sesuai dengan score pattern yang didefinisikan | Semua 16 kombinasi sesuai INSERT statement | Data sudah di-seed di database | TC23 - Validasi data sesuai score pattern | Positive | 1. Navigasi ke halaman list Setting Score Parameter<br>2. Bandingkan data di tabel dengan score pattern:<br>   - RJTP-RJ-CASHLESS-MC: 3<br>   - RJTP-RJ-CASHLESS-IDM: 5<br>   - RJTP-RJ-REIMBURSE-MC: 4<br>   - RJTP-RJ-REIMBURSE-IDM: 6<br>   - dst (16 entries) | Semua data sesuai dengan score pattern yang didefinisikan | | | Medium | `@AC-list @data-validation` Scenario: Data scoring di list sesuai dengan score pattern yang didefinisikan | Automated | Attachment TC23 |
| 24 | Verify setiap baris memiliki tombol [Edit] pada kolom Action | User role: Verifikator Pusat | Data scoring tersedia di list | TC24 - Tombol Edit tersedia di setiap baris | Positive | 1. Navigasi ke halaman list<br>2. Verifikasi setiap baris memiliki tombol [Edit] di kolom Action | Setiap record memiliki tombol [Edit] yang dapat diklik | | | Low | `@AC-list @ui` Scenario: Setiap baris data scoring memiliki tombol Edit pada kolom Action | Automated | Attachment TC24 |
| 25 | Verify pagination tabel berfungsi dengan benar | Data: 16 entries | Data lebih dari 1 halaman (jika ada pagination setting) | TC25 - Pagination list | Positive | 1. Navigasi ke halaman list<br>2. Verifikasi informasi pagination "Showing 1-16 of 16 entries"<br>3. Jika multi-page, klik navigasi halaman | Pagination menampilkan informasi jumlah data yang benar | | | Low | `@AC-list @ui` Scenario: Pagination tabel menampilkan informasi jumlah data yang benar | Automated | Attachment TC25 |
| 26 | Verify user kantor pusat mengakses halaman via direct URL | User role: non-kantor pusat, URL langsung ke Setting Score Parameter | User login dengan role non-HO | TC26 - Direct URL access oleh non-HO | Negative | 1. Login sebagai user non-kantor pusat<br>2. Akses URL halaman Setting Score Parameter secara langsung via browser | User diredirect ke halaman unauthorized / access denied, atau halaman tidak dapat diakses | | | High | `@AC-access @negative @security` Scenario: User non-kantor pusat tidak dapat mengakses halaman via direct URL | Automated | Attachment TC26 |

---

## Coverage Summary

| Acceptance Criteria | TC Count | Type |
|-----|-----------|---------|
| AC: Akses terbatas kantor pusat | 3 (TC01, TC02, TC26) | Positive + Negative |
| AC: Tampilan list scoring | 4 (TC03, TC04, TC24, TC25) | Positive |
| AC: Form tambah setting (field & validasi) | 10 (TC05-TC15) | Positive + Negative |
| AC: Simpan bobot case | 3 (TC16, TC17, TC18) | Positive + Negative |
| AC: Batal input | 1 (TC19) | Positive |
| AC: Edit bobot case | 2 (TC20, TC21) | Positive |
| AC: Bobot diterapkan sebagai parameter | 1 (TC22) | Positive |
| AC: Validasi data score pattern | 1 (TC23) | Positive |
| **Total** | **26** | |

---

## Feature File Mapping

| TC Range | Feature Scenario | Tag |
|----------|---|---|
| TC01-TC02, TC26 | Access control Setting Score Parameter | `@AC-access` |
| TC03-TC04, TC24-TC25 | List Claim Scoring Setting display | `@AC-list` |
| TC05-TC15 | Form input dan validasi field | `@AC-add @form-validation` |
| TC16-TC18 | Save claim score setting | `@AC-save` |
| TC19 | Cancel form | `@AC-cancel` |
| TC20-TC21 | Edit claim score setting | `@AC-edit` |
| TC22 | Penerapan bobot sebagai parameter | `@AC-apply` |
| TC23 | Data validation score pattern | `@AC-list @data-validation` |

**Feature File:** `src/features/scoring/settingKlasifikasiScoring.feature`

---

## Sign-off

| Role | Name | Signature |
|------|------|-----------|
| Developer | | |
| Tester | | |
| Squad Lead | | |
| BA / PO / Tribe Lead | Elisabet Sihite | |

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
