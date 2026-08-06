# Test Cases: [JIRA-ID] - [Nama Fitur]

## Test Case Information

| Field | Value |
|-------|-------|
| **Test Priority** | [High/Medium/Low] |
| **Application Address** | https://development.inhealth.co.id/newmicare |
| **Description** | [Deskripsi singkat fitur yang di-test] |
| **Test Design by** | [Nama QA] |
| **Jira Reference** | [JIRA-ID] |
| **Parent** | [Parent JIRA-ID] |
| **Sprint** | [Sprint Name] |
| **Version** | TC.YYYY.MM |

---

## Validation Standards Applied

> Referensi: QA Work of Way Bible - Section 14 (Standarisasi Validasi)

| Tipe Fitur | Standar Wajib | Standar Conditional | Applied |
|------------|---------------|---------------------|---------|
| Form CRUD | 14.1 + 14.3 + 14.5 + 14.6 | 14.4 (jika ada status) | [ ] |
| List / Grid / Tabel | 14.2 + 14.3 + 14.6 | 14.7 (jika ada export) | [ ] |
| Report / Export | 14.10 + 14.3 + 14.6 | - | [ ] |
| File Management | 14.7 + 14.3 + 14.5 | - | [ ] |
| Background Job | 14.9 + 14.8 + 14.5 | - | [ ] |
| Status Workflow | 14.4 + 14.5 + 14.6 | 14.3 (jika API driven) | [ ] |
| API-only (tanpa UI) | 14.3 + 14.6 | 14.8 (jika ada kalkulasi) | [ ] |
| Scoring / Calculation | 14.8 + 14.3 + 14.9 | - | [ ] |

**Standar yang digunakan untuk story ini:**

```
Story: [JIRA-ID] ([Nama Fitur])
Tipe: [Tipe Fitur]

Standar yang digunakan:
├── 14.X [Nama Standar] ([Alasan])
├── 14.X [Nama Standar] ([Alasan])
├── 14.X [Nama Standar] ([Alasan])
└── 14.X [Nama Standar] ([Alasan])
```

---

## Test Cases

### AC-1: [Deskripsi Acceptance Criteria]

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | [Deskripsi skenario] | [Data test] | [Prekondisi] | TC01 - [Nama singkat] | Positive | 1. [Step 1]<br>2. [Step 2]<br>3. [Step 3] | [Expected result] | | | High | `@[JIRA-ID] @AC-1 @smoke` Scenario: TC01 - [Nama] | [Automated/Manual] | |

---

### 14.1 Validasi Form / Input Fields

> Gunakan section ini jika fitur memiliki form input. Hapus jika tidak applicable.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | Required field kosong | Field [nama] dikosongkan | User di halaman form | TC-F01 - Required empty | Negative | 1. User mengosongkan field "[nama]"<br>2. User klik "Simpan" | Tampil error "[Nama Field] wajib diisi", data tidak tersimpan | | | High | `@[JIRA-ID] @validation @form` Scenario: Required field kosong | Automated | |
| | Max length exceeded | Field [nama] diisi [N+1] karakter | User di halaman form | TC-F02 - Max length | Negative | 1. User mengisi field "[nama]" dengan [N+1] karakter<br>2. User klik "Simpan" | Tampil error "[Nama Field] maksimal [N] karakter" | | | Medium | `@[JIRA-ID] @validation @form` Scenario: Max length exceeded | Automated | |
| | Invalid data type | Field numeric diisi huruf | User di halaman form | TC-F03 - Invalid type | Negative | 1. User mengisi field numeric dengan "abc" | Field hanya menerima angka / tampil error "Format tidak valid" | | | Medium | `@[JIRA-ID] @validation @form` Scenario: Invalid data type | Automated | |
| | Boundary values | Field [nama] diisi nilai min, max, min-1, max+1 | User di halaman form | TC-F04 - Boundary | Boundary | 1. Isi nilai min → valid<br>2. Isi nilai max → valid<br>3. Isi min-1 → error<br>4. Isi max+1 → error | Sesuai boundary | | | Medium | `@[JIRA-ID] @validation @form @boundary` Scenario: Boundary values | Automated | |
| | Special characters / XSS | Input: `<script>alert('xss')</script>` | User di halaman form | TC-F05 - XSS prevention | Negative | 1. Isi field dengan script tag<br>2. Simpan | Input di-sanitize atau ditolak, tidak ada XSS execution | | | High | `@[JIRA-ID] @validation @form @security` Scenario: XSS prevention | Automated | |
| | SQL Injection attempt | Input: `' OR 1=1 --` | User di halaman form | TC-F06 - SQL injection | Negative | 1. Isi field dengan SQL injection string<br>2. Simpan | Input ditolak atau di-escape, tidak ada SQL execution | | | High | `@[JIRA-ID] @validation @form @security` Scenario: SQL injection | Automated | |
| | Whitespace handling | Input: "  [value]  " (leading/trailing spaces) | User di halaman form | TC-F07 - Whitespace | Positive | 1. Isi field dengan spasi di awal/akhir<br>2. Simpan | Spasi di-trim, data tersimpan tanpa leading/trailing space | | | Low | `@[JIRA-ID] @validation @form` Scenario: Whitespace trim | Automated | |
| | Duplicate entry | Data yang sudah ada di DB | Data existing di database | TC-F08 - Duplicate | Negative | 1. Isi field dengan value yang sudah ada<br>2. Simpan | Tampil error "[Nama Field] sudah terdaftar" | | | High | `@[JIRA-ID] @validation @form` Scenario: Duplicate entry | Automated | |

---

### 14.2 Validasi Tabel / Grid / List

> Gunakan section ini jika fitur memiliki tabel/list data. Hapus jika tidak applicable.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | Verify kolom tampil lengkap | - | User di halaman list | TC-T01 - Kolom lengkap | Positive | 1. Navigasi ke halaman list<br>2. Cek kolom yang tampil | Semua kolom sesuai requirement dengan urutan benar | | | High | `@[JIRA-ID] @validation @table` Scenario: Kolom tampil lengkap | Automated | |
| | Data accuracy vs DB/API | Data dari API/DB | Data ada di database | TC-T02 - Data accuracy | Positive | 1. Query data dari API/DB<br>2. Bandingkan dengan tampilan UI | Data di UI = data di API/DB | | | High | `@[JIRA-ID] @validation @table` Scenario: Data accuracy | Automated | |
| | Default sorting | - | Data ada di list | TC-T03 - Default sort | Positive | 1. Buka halaman list<br>2. Cek urutan data | Data ter-sort sesuai default (sesuai spec) | | | Medium | `@[JIRA-ID] @validation @table` Scenario: Default sort | Automated | |
| | Pagination navigation | Data > 1 page | Data banyak di DB | TC-T04 - Pagination | Positive | 1. Navigasi ke page 2, 3, dst<br>2. Cek data di tiap page | Data berbeda per page, jumlah per page sesuai setting | | | Medium | `@[JIRA-ID] @validation @table` Scenario: Pagination | Automated | |
| | Empty state | - | Tidak ada data yang match | TC-T05 - Empty state | Negative | 1. Buka halaman list tanpa data<br>2. Atau filter tanpa hasil | Tampil pesan "Data tidak ditemukan" | | | Medium | `@[JIRA-ID] @validation @table @negative` Scenario: Empty state | Automated | |
| | Filter single criteria | Filter value tertentu | Data ada di DB | TC-T06 - Filter single | Positive | 1. Pilih filter [field]=[value]<br>2. Cek hasil | Hanya data yang match yang tampil | | | High | `@[JIRA-ID] @validation @table` Scenario: Filter single | Automated | |
| | Filter kombinasi | Multiple filter values | Data ada di DB | TC-T07 - Filter combo | Positive | 1. Pilih filter A + filter B<br>2. Cek hasil | Data yang tampil = interseksi filter A dan B | | | Medium | `@[JIRA-ID] @validation @table` Scenario: Filter combination | Automated | |
| | Filter + Pagination persist | Filter aktif + pindah page | Data > 1 page | TC-T08 - Filter persist | Positive | 1. Aktifkan filter<br>2. Pindah ke page 2 | Filter tetap aktif, data page 2 masih sesuai filter | | | Medium | `@[JIRA-ID] @validation @table` Scenario: Filter persist on page | Automated | |
| | Search partial match | Keyword parsial | Data ada di DB | TC-T09 - Search partial | Positive | 1. Ketik sebagian kata di search<br>2. Cek hasil | Hasil pencarian menampilkan data yang mengandung keyword | | | Medium | `@[JIRA-ID] @validation @table` Scenario: Search partial | Automated | |
| | Reset filter | Filter aktif | Data tersaring | TC-T10 - Reset filter | Positive | 1. Aktifkan filter<br>2. Klik reset/clear<br>3. Cek data | Semua data tampil kembali (tanpa filter) | | | Low | `@[JIRA-ID] @validation @table` Scenario: Reset filter | Automated | |

---

### 14.3 Validasi API Response

> Gunakan section ini jika fitur melibatkan endpoint API. Hapus jika tidak applicable.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | API success - valid payload | Valid request body | Endpoint aktif, token valid | TC-A01 - Success | Positive | 1. Kirim request dengan payload valid<br>2. Cek response | Status 200/201, response body sesuai schema, time < 3s | | | High | `@[JIRA-ID] @validation @api` Scenario: Valid payload success | Automated | |
| | API reject - missing required field | Payload tanpa field wajib | Endpoint aktif, token valid | TC-A02 - Missing field | Negative | 1. Kirim request tanpa field [nama]<br>2. Cek response | Status 400, error: "[field] is required" | | | High | `@[JIRA-ID] @validation @api @negative` Scenario: Missing required field | Automated | |
| | API reject - invalid data type | Field numeric diisi string | Endpoint aktif, token valid | TC-A03 - Invalid type | Negative | 1. Kirim request dengan data type salah<br>2. Cek response | Status 400, validation error | | | Medium | `@[JIRA-ID] @validation @api @negative` Scenario: Invalid data type | Automated | |
| | API reject - unauthorized | - | Tanpa token / token expired | TC-A04 - Unauthorized | Negative | 1. Kirim request tanpa auth header<br>2. Cek response | Status 401, "Unauthorized" | | | High | `@[JIRA-ID] @validation @api @security` Scenario: Unauthorized | Automated | |
| | API reject - forbidden | - | Token valid tapi role tidak sesuai | TC-A05 - Forbidden | Negative | 1. Kirim request dengan token role berbeda<br>2. Cek response | Status 403, "Forbidden" | | | High | `@[JIRA-ID] @validation @api @security` Scenario: Forbidden | Automated | |
| | API - resource not found | ID yang tidak ada | Token valid | TC-A06 - Not found | Negative | 1. Kirim request ke resource ID yang tidak ada<br>2. Cek response | Status 404, "Not found" | | | Medium | `@[JIRA-ID] @validation @api @negative` Scenario: Not found | Automated | |
| | API - duplicate entry | Data yang sudah ada | Data existing di DB | TC-A07 - Duplicate | Negative | 1. Kirim request create dengan data yang sudah ada<br>2. Cek response | Status 409/400, pesan duplicate | | | High | `@[JIRA-ID] @validation @api @negative` Scenario: Duplicate entry | Automated | |
| | API - response time threshold | Valid request | Endpoint aktif | TC-A08 - Response time | Positive | 1. Kirim request valid<br>2. Ukur response time | Response time < 3000ms | | | Medium | `@[JIRA-ID] @validation @api @performance` Scenario: Response time | Automated | |
| | API - pagination metadata | - | Data > 1 page | TC-A09 - Pagination meta | Positive | 1. Kirim GET list request<br>2. Cek response pagination | totalItems, totalPages, currentPage, pageSize ada dan benar | | | Medium | `@[JIRA-ID] @validation @api` Scenario: Pagination metadata | Automated | |

---

### 14.4 Validasi Status / State Transition

> Gunakan section ini jika fitur memiliki status workflow. Hapus jika tidak applicable.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | Happy path - transisi valid | Data dengan status [A] | User dengan role yang sesuai | TC-S01 - Valid transition | Positive | 1. User klik [aksi]<br>2. Cek status berubah | Status berubah dari [A] ke [B], audit trail tercatat | | | High | `@[JIRA-ID] @validation @state-transition` Scenario: Valid transition | Automated | |
| | Invalid transition | Data dengan status [A] | User dengan role yang sesuai | TC-S02 - Invalid transition | Negative | 1. User mencoba [aksi] yang tidak diperbolehkan dari status [A] | Tombol tidak tersedia / error "Transisi tidak diperbolehkan" | | | High | `@[JIRA-ID] @validation @state-transition @negative` Scenario: Invalid transition | Automated | |
| | Permission per status | Data dengan status [A] | User dengan role TIDAK sesuai | TC-S03 - Wrong role | Negative | 1. User dengan role [X] mencoba ubah status<br>2. Cek akses | Tombol tidak tampil / aksi ditolak | | | High | `@[JIRA-ID] @validation @state-transition @permission` Scenario: Wrong role | Automated | |
| | Audit trail tercatat | Data dengan status [A] | User dengan role yang sesuai | TC-S04 - Audit trail | Positive | 1. User ubah status<br>2. Cek audit log | Tercatat: who, when, from status → to status | | | Medium | `@[JIRA-ID] @validation @state-transition` Scenario: Audit trail | Automated | |

#### Transition Matrix

| Current Status | Action | Next Status | Allowed | Role |
|----------------|--------|-------------|---------|------|
| [Status A] | [Aksi] | [Status B] | ✓ | [Role] |
| [Status A] | [Aksi invalid] | - | ✗ | - |

---

### 14.5 Validasi Notifikasi & Alert

> Gunakan section ini jika fitur menampilkan notifikasi/alert. Hapus jika tidak applicable.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | Success message tampil | Data valid | User di halaman form | TC-N01 - Success toast | Positive | 1. User melakukan aksi yang berhasil<br>2. Cek notifikasi | Tampil toast "Data berhasil [disimpan/diupdate/dihapus]", auto-dismiss 3-5 detik | | | Medium | `@[JIRA-ID] @validation @notification` Scenario: Success message | Automated | |
| | Error message tampil | Data invalid / server error | User di halaman form | TC-N02 - Error message | Positive | 1. User melakukan aksi yang gagal<br>2. Cek notifikasi | Tampil error "Gagal [aksi]. [Alasan spesifik]", TIDAK auto-dismiss | | | Medium | `@[JIRA-ID] @validation @notification` Scenario: Error message | Automated | |
| | Confirmation dialog sebelum delete | - | Data ada di list | TC-N03 - Confirm delete | Positive | 1. User klik "Hapus"<br>2. Cek dialog | Tampil dialog "Apakah Anda yakin ingin menghapus data ini?" + tombol "Ya" dan "Batal" | | | High | `@[JIRA-ID] @validation @notification` Scenario: Confirm dialog | Automated | |
| | Cancel pada confirmation | - | Dialog konfirmasi tampil | TC-N04 - Cancel confirm | Positive | 1. Dialog tampil<br>2. User klik "Batal" | Dialog tertutup, data TIDAK terhapus | | | Medium | `@[JIRA-ID] @validation @notification` Scenario: Cancel confirm | Automated | |

---

### 14.6 Validasi Permission / Authorization

> Gunakan section ini untuk semua fitur. Minimal test dengan 2 role berbeda.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | Authorized role - akses berhasil | - | User login sebagai [Role A] | TC-P01 - Authorized access | Positive | 1. Login sebagai [Role A]<br>2. Navigasi ke halaman fitur<br>3. Cek akses | Menu tampil, halaman bisa diakses, aksi tersedia | | | High | `@[JIRA-ID] @validation @permission` Scenario: Authorized access | Automated | |
| | Unauthorized role - akses ditolak | - | User login sebagai [Role B] (tidak berhak) | TC-P02 - Unauthorized access | Negative | 1. Login sebagai [Role B]<br>2. Cek menu/sidebar | Menu tidak tampil untuk [Role B] | | | High | `@[JIRA-ID] @validation @permission @negative` Scenario: Unauthorized access | Automated | |
| | Direct URL access tanpa permission | URL halaman fitur | User login sebagai [Role B] | TC-P03 - Direct URL | Negative | 1. Login sebagai [Role B]<br>2. Akses langsung via URL | Redirect ke halaman error / tampil "403 - Forbidden" | | | High | `@[JIRA-ID] @validation @permission @security` Scenario: Direct URL blocked | Automated | |
| | Session expired | - | Session habis / token expired | TC-P04 - Session expired | Negative | 1. Tunggu session expired<br>2. Coba aksi apa pun | Redirect ke halaman login | | | Medium | `@[JIRA-ID] @validation @permission` Scenario: Session expired | Manual | |

#### Role-based Testing Matrix

| Feature / Action | [Role A] | [Role B] | [Role C] |
|------------------|----------|----------|----------|
| View list | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |
| Create | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |
| Edit | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |
| Delete | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |
| Approve/Reject | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |

---

### 14.7 Validasi File Upload / Download

> Gunakan section ini jika fitur memiliki upload/download file. Hapus jika tidak applicable.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | Upload valid file type | File [format].pdf (2MB) | User di halaman upload | TC-U01 - Valid upload | Positive | 1. Pilih file valid<br>2. Klik upload<br>3. Cek progress | File terupload, progress 100%, nama file tampil | | | High | `@[JIRA-ID] @validation @upload` Scenario: Valid upload | Automated | |
| | Reject file melebihi batas | File 15MB (max: 10MB) | User di halaman upload | TC-U02 - Over size | Negative | 1. Pilih file > max size<br>2. Cek response | Error "Ukuran file maksimal [N]MB" | | | High | `@[JIRA-ID] @validation @upload @negative` Scenario: Over size | Automated | |
| | Reject format tidak diperbolehkan | File .exe / .bat | User di halaman upload | TC-U03 - Invalid format | Negative | 1. Pilih file format tidak didukung | Error "Format file tidak didukung. Gunakan [list format]" | | | High | `@[JIRA-ID] @validation @upload @negative` Scenario: Invalid format | Automated | |
| | Upload empty file (0 byte) | File 0 byte | User di halaman upload | TC-U04 - Empty file | Negative | 1. Pilih file kosong (0 byte) | Error "File kosong / tidak valid" | | | Medium | `@[JIRA-ID] @validation @upload @negative` Scenario: Empty file | Automated | |
| | Download file | File yang sudah diupload | File tersedia di server | TC-U05 - Download | Positive | 1. Klik download<br>2. Cek file | File ter-download dengan nama dan isi benar | | | High | `@[JIRA-ID] @validation @upload` Scenario: Download file | Manual | |

---

### 14.8 Validasi Kalkulasi / Business Logic

> Gunakan section ini jika fitur memiliki perhitungan/formula. Hapus jika tidak applicable.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | Formula accuracy - normal case | [Input values] | [Preconditions] | TC-C01 - Formula normal | Positive | 1. Input [values]<br>2. Trigger kalkulasi<br>3. Cek result | Result = [expected berdasarkan formula] | | | High | `@[JIRA-ID] @validation @calculation` Scenario: Formula normal | Automated | |
| | Zero division handling | Divisor = 0 | [Preconditions] | TC-C02 - Zero division | Boundary | 1. Setup divisor=0<br>2. Trigger kalkulasi | Tidak error, hasil = 0 atau pesan yang sesuai | | | High | `@[JIRA-ID] @validation @calculation @boundary` Scenario: Zero division | Automated | |
| | Negative result handling | Input menghasilkan negatif | [Preconditions] | TC-C03 - Negative result | Boundary | 1. Input values yang menghasilkan negatif<br>2. Cek result | Jika tidak boleh negatif: result = 0 atau MAX(0, result) | | | High | `@[JIRA-ID] @validation @calculation @boundary` Scenario: Negative result | Automated | |
| | Decimal precision | Input dengan decimal | [Preconditions] | TC-C04 - Precision | Positive | 1. Input decimal values<br>2. Cek precision result | Decimal precision konsisten (2 digit untuk currency) | | | Medium | `@[JIRA-ID] @validation @calculation` Scenario: Decimal precision | Automated | |
| | Boundary max value | Input value sangat besar | [Preconditions] | TC-C05 - Max value | Boundary | 1. Input maximum value<br>2. Trigger kalkulasi | Kalkulasi benar tanpa overflow | | | Medium | `@[JIRA-ID] @validation @calculation @boundary` Scenario: Max value | Automated | |

---

### 14.9 Validasi Scheduler / Background Job

> Gunakan section ini jika fitur memiliki scheduler/cron job. Hapus jika tidak applicable.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | Job terpicu pada waktu yang ditentukan | Cron schedule | Scheduler aktif | TC-J01 - Trigger time | Positive | 1. Tunggu/mock waktu trigger<br>2. Cek execution log | Job terpicu pada waktu yang benar (WIB) | | | High | `@[JIRA-ID] @validation @scheduler` Scenario: Trigger time | Manual | |
| | Idempotency - re-trigger tidak duplikat | - | Job sudah sukses hari ini | TC-J02 - Idempotent | Positive | 1. Job sudah sukses<br>2. Trigger ulang<br>3. Cek data | Data tidak terduplikat | | | High | `@[JIRA-ID] @validation @scheduler` Scenario: Idempotent | Automated | |
| | Error handling + alert | Simulasi error | Kondisi error | TC-J03 - Error alert | Positive | 1. Simulasi error<br>2. Trigger job<br>3. Cek alert | Alert terkirim, 0 data corrupt | | | High | `@[JIRA-ID] @validation @scheduler` Scenario: Error alert | Manual | |
| | Rollback on partial failure | Multiple data, error di tengah | Simulasi partial fail | TC-J04 - Rollback | Negative | 1. Simulasi error di tengah proses<br>2. Cek data | 0 data tersimpan (rollback), alert terkirim | | | High | `@[JIRA-ID] @validation @scheduler @negative` Scenario: Rollback | Automated | |
| | Skip condition (hari libur/kondisi khusus) | Hari libur | Tabel referensi libur | TC-J05 - Skip condition | Positive | 1. Set kondisi skip<br>2. Trigger job | Job skip, 0 data dibuat, log "Skipped" | | | Medium | `@[JIRA-ID] @validation @scheduler` Scenario: Skip condition | Automated | |
| | Execution logging | - | Job berjalan | TC-J06 - Logging | Positive | 1. Trigger job<br>2. Cek execution log | Log: start time, end time, record count, status | | | Medium | `@[JIRA-ID] @validation @scheduler` Scenario: Logging | Manual | |

---

### 14.10 Validasi Report / Export

> Gunakan section ini jika fitur memiliki report/export. Hapus jika tidak applicable.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | Export data sesuai filter | Filter aktif | Data ada di DB | TC-R01 - Export with filter | Positive | 1. Set filter<br>2. Klik "Export"<br>3. Buka file | Data di file = data di UI sesuai filter | | | High | `@[JIRA-ID] @validation @report` Scenario: Export with filter | Automated | |
| | Column header sesuai requirement | - | Data ada di DB | TC-R02 - Column header | Positive | 1. Export file<br>2. Cek header kolom | Header sesuai requirement (urutan, nama) | | | Medium | `@[JIRA-ID] @validation @report` Scenario: Column header | Automated | |
| | Empty report (no data) | Filter tanpa hasil | Tidak ada data match | TC-R03 - Empty report | Negative | 1. Filter tanpa data<br>2. Export | File ter-download dengan header tapi tanpa data row, tidak error | | | Medium | `@[JIRA-ID] @validation @report @negative` Scenario: Empty report | Automated | |
| | Download naming convention | - | Data ada | TC-R04 - File naming | Positive | 1. Export file<br>2. Cek nama file | Nama file: "[Tipe]_[Identifier]_[Tanggal].[ext]" | | | Low | `@[JIRA-ID] @validation @report` Scenario: File naming | Automated | |
| | Total/Summary accuracy | Data > 1 row | Data ada di DB | TC-R05 - Summary | Positive | 1. Export file<br>2. Hitung manual total<br>3. Bandingkan | Angka total = SUM detail row | | | High | `@[JIRA-ID] @validation @report` Scenario: Summary accuracy | Automated | |

---

### Edge Cases & Boundary Scenarios

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | [Edge case spesifik fitur] | [Data] | [Preconditions] | TC-E01 - [Nama] | Boundary | 1. [Steps] | [Expected] | | | [Priority] | `@[JIRA-ID] @edge-case @boundary` Scenario: [Nama] | [Automated/Manual] | |

---

## Coverage Summary

| Section | Description | Positive | Negative | Boundary | Total |
|---------|-------------|----------|----------|----------|-------|
| AC-1 | [Deskripsi] | 0 | 0 | 0 | 0 |
| 14.1 | Validasi Form | 0 | 0 | 0 | 0 |
| 14.2 | Validasi Tabel | 0 | 0 | 0 | 0 |
| 14.3 | Validasi API | 0 | 0 | 0 | 0 |
| 14.4 | Validasi Status | 0 | 0 | 0 | 0 |
| 14.5 | Validasi Notifikasi | 0 | 0 | 0 | 0 |
| 14.6 | Validasi Permission | 0 | 0 | 0 | 0 |
| 14.7 | Validasi Upload/Download | 0 | 0 | 0 | 0 |
| 14.8 | Validasi Kalkulasi | 0 | 0 | 0 | 0 |
| 14.9 | Validasi Scheduler | 0 | 0 | 0 | 0 |
| 14.10 | Validasi Report | 0 | 0 | 0 | 0 |
| Edge | Edge Cases & Boundary | 0 | 0 | 0 | 0 |
| **Total** | | **0** | **0** | **0** | **0** |

---

## Validation Standards Checklist (Review)

> Checklist ini digunakan saat review test cases sebelum eksekusi.

- [ ] Standar validasi yang applicable sudah diidentifikasi (lihat Decision Table di atas)
- [ ] Positive + Negative scenario tercakup per standar
- [ ] Boundary values dipertimbangkan (min, max, zero, null)
- [ ] Error message sesuai standar format (Section 14.1 / 14.5)
- [ ] Permission/authorization dicek minimal 2 role (Section 14.6)
- [ ] Contoh di Bible Section 14 digunakan sebagai referensi format Gherkin
- [ ] Test data realistis dan reproducible
- [ ] Section yang tidak applicable sudah dihapus dari dokumen

---

## Feature File Mapping

| TC Range | Feature File | Tags |
|----------|-------------|------|
| TC01-TCxx | `src/features/[module]/[feature].feature` | `@[JIRA-ID] @[tag]` |

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| Tester | | | |
| Squad Lead | | | |
| BA / PO | | | |

---

## Attachment

| TC# | Evidence Link | Notes |
|-----|--------------|-------|
| | | |
