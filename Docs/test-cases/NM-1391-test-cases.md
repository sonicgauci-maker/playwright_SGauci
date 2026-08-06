# Test Cases: NM-1391 - Menampilkan Suspect Document sebagai Remark

## Test Case Information

| Field | Value |
|-------|-------|
| **No** | |
| **Requested App Testing No** | |
| **Test Requested date** | |
| **Test Priority** | Highest |
| **Application Address** | https://development.inhealth.co.id/newmicare |
| **Description** | Menampilkan suspect document sebagai Remark — penggabungan remark dari kategori dokumen rejected saat submit pending |
| **Test Design by** | |
| **Test Execute by** | |
| **Test Execution date** | |
| **Follow Up Test By** | |
| **Follow Up Date** | |
| **Number Page** | 1 Of 1 |
| **Jira Reference** | NM-1391 |
| **Parent** | NM-1130 |
| **Sprint** | Claim Operation Sprint 25, Claim Operation Sprint 26 |
| **Version** | TC.2026.07 |

---

## Test Cases

### AC-1: Penggabungan remark dari kategori dokumen rejected saat submit pending

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Verify remark dari multiple kategori dokumen rejected digabungkan saat submit pending | Klaim eClaim Reimbursement dengan 3 kategori dokumen rejected: Resume Medis (remark: "Dokumen tidak lengkap"), Kwitansi (remark: "Kwitansi tidak sesuai tanggal"), Surat Rujukan (remark: "Surat rujukan expired") | 1. User login sebagai staf administrasi klaim<br>2. Terdapat transaksi eClaim reimbursement dengan multiple dokumen rejected | TC01 - Multiple remark digabung saat submit pending | Positive | 1. Login ke New MiCare sebagai staf admin klaim<br>2. Buka transaksi eClaim reimbursement yang memiliki multiple kategori dokumen rejected<br>3. Klik Submit Pending<br>4. Verifikasi kolom remark klaim setelah submit | Kolom remark klaim berisi gabungan semua remark dari dokumen rejected: "Dokumen tidak lengkap, Kwitansi tidak sesuai tanggal, Surat rujukan expired" | | | High | `@NM-1391 @AC-1 @smoke` Scenario: TC01 - Multiple remark digabung saat submit pending | Automated | |
| 2 | Verify hanya remark dari dokumen berstatus Rejected yang digabungkan (dokumen Approved diabaikan) | Klaim dengan 4 kategori: 2 Rejected (dengan remark), 2 Approved | 1. Terdapat transaksi dengan mix status dokumen (Approved & Rejected) | TC02 - Hanya remark dokumen Rejected yang digabungkan | Positive | 1. Buka transaksi eClaim yang memiliki campuran dokumen Approved dan Rejected<br>2. Klik Submit Pending<br>3. Verifikasi kolom remark klaim hanya berisi remark dari dokumen Rejected | Kolom remark hanya berisi remark dari kategori dokumen yang berstatus Rejected. Remark dari dokumen Approved tidak termasuk | | | High | `@NM-1391 @AC-1` Scenario: TC02 - Hanya remark dokumen Rejected yang diikutsertakan | Automated | |
| 3 | Verify remark digabung saat submit pending pada transaksi eClaim Reimbursement (bukan tipe klaim lain) | Transaksi eClaim Reimbursement dengan dokumen rejected | 1. Transaksi bertipe eClaim Reimbursement | TC03 - Submit pending pada eClaim Reimbursement | Positive | 1. Buka transaksi eClaim Reimbursement<br>2. Verifikasi terdapat dokumen rejected dengan remark<br>3. Klik Submit Pending<br>4. Verifikasi remark tergabung di kolom remark klaim | Remark berhasil digabungkan dan tersimpan pada kolom remark klaim setelah submit pending | | | High | `@NM-1391 @AC-1` Scenario: TC03 - Penggabungan remark pada transaksi eClaim Reimbursement | Automated | |

### AC-2: Penggabungan remark menggunakan pemisah koma

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 4 | Verify separator koma digunakan antar remark kategori dokumen | Klaim dengan 3 dokumen rejected, masing-masing memiliki remark berbeda | Transaksi eClaim Reimbursement siap submit pending | TC04 - Separator koma antar remark | Positive | 1. Buka transaksi dengan 3 kategori dokumen rejected<br>2. Klik Submit Pending<br>3. Verifikasi remark klaim menggunakan koma sebagai pemisah antar remark | Remark tergabung dengan format: "remark1, remark2, remark3" — menggunakan koma + spasi sebagai separator | | | High | `@NM-1391 @AC-2 @smoke` Scenario: TC04 - Separator koma digunakan antar remark | Automated | |
| 5 | Verify tidak ada trailing comma di akhir remark gabungan | Klaim dengan 2 dokumen rejected | Transaksi eClaim Reimbursement siap submit pending | TC05 - Tidak ada trailing comma | Positive | 1. Submit pending klaim dengan 2 kategori rejected<br>2. Verifikasi remark gabungan<br>3. Pastikan tidak ada koma di akhir string remark | Remark gabungan tidak memiliki koma di akhir (contoh: "remark1, remark2" bukan "remark1, remark2,") | | | Medium | `@NM-1391 @AC-2` Scenario: TC05 - Tidak ada trailing comma di akhir remark gabungan | Automated | |
| 6 | Verify tidak ada leading comma di awal remark gabungan | Klaim dengan 2 dokumen rejected | Transaksi eClaim Reimbursement siap submit pending | TC06 - Tidak ada leading comma | Positive | 1. Submit pending klaim dengan kategori rejected<br>2. Verifikasi remark gabungan<br>3. Pastikan tidak ada koma di awal string remark | Remark gabungan tidak memiliki koma di awal (contoh: "remark1, remark2" bukan ", remark1, remark2") | | | Medium | `@NM-1391 @AC-2` Scenario: TC06 - Tidak ada leading comma di awal remark gabungan | Automated | |

### AC-3: Hasil penggabungan disimpan dan ditampilkan pada kolom remark klaim

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 7 | Verify remark gabungan tersimpan di kolom remark klaim setelah submit pending | Klaim dengan 2 dokumen rejected: "Dokumen tidak lengkap", "Kwitansi expired" | Transaksi eClaim Reimbursement siap submit pending | TC07 - Remark gabungan tersimpan di kolom remark klaim | Positive | 1. Submit pending klaim dengan dokumen rejected<br>2. Navigasi ke detail klaim<br>3. Verifikasi kolom remark klaim terisi dengan gabungan remark | Kolom remark klaim menampilkan: "Dokumen tidak lengkap, Kwitansi expired" | | | High | `@NM-1391 @AC-3 @smoke` Scenario: TC07 - Remark gabungan tersimpan di kolom remark klaim | Automated | |
| 8 | Verify remark gabungan tampil di detail klaim setelah reload halaman | Klaim yang sudah di-submit pending | Klaim sudah berhasil di-submit pending dengan remark | TC08 - Remark persisten setelah reload | Positive | 1. Setelah submit pending berhasil<br>2. Refresh/reload halaman detail klaim<br>3. Verifikasi remark gabungan masih tampil di kolom remark | Remark gabungan tetap tampil setelah reload halaman — data tersimpan di database | | | Medium | `@NM-1391 @AC-3` Scenario: TC08 - Remark gabungan tetap tampil setelah reload halaman | Automated | |
| 9 | Verify remark gabungan tampil di list klaim (jika kolom remark ada di list) | Klaim yang sudah di-submit pending | Klaim sudah berhasil di-submit pending | TC09 - Remark gabungan tampil di list klaim | Positive | 1. Setelah submit pending berhasil<br>2. Navigasi ke halaman list klaim<br>3. Verifikasi remark gabungan tampil pada baris klaim tersebut | Remark gabungan ditampilkan di kolom remark pada halaman list klaim | | | Medium | `@NM-1391 @AC-3` Scenario: TC09 - Remark gabungan tampil di halaman list klaim | Automated | |

### AC-4: Satu kategori dokumen rejected — remark tanpa koma tambahan

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 10 | Verify single remark ditampilkan tanpa koma | Klaim dengan hanya 1 kategori dokumen rejected (remark: "Surat rujukan expired") | Transaksi eClaim Reimbursement dengan 1 dokumen rejected | TC10 - Single remark tanpa koma tambahan | Positive | 1. Buka transaksi dengan hanya 1 kategori dokumen rejected<br>2. Klik Submit Pending<br>3. Verifikasi kolom remark klaim | Kolom remark menampilkan: "Surat rujukan expired" — tanpa koma di awal, akhir, atau di mana pun | | | High | `@NM-1391 @AC-4 @smoke` Scenario: TC10 - Single remark ditampilkan tanpa koma tambahan | Automated | |
| 11 | Verify single remark tidak memiliki separator apapun | Klaim dengan 1 kategori rejected, 3 kategori Approved | Transaksi dengan 4 kategori, hanya 1 rejected | TC11 - Single remark bebas separator | Positive | 1. Buka transaksi dengan campuran (1 Rejected, 3 Approved)<br>2. Klik Submit Pending<br>3. Verifikasi kolom remark hanya berisi satu remark tanpa karakter separator | Remark klaim hanya berisi satu remark utuh tanpa karakter separator (koma) di posisi manapun | | | Medium | `@NM-1391 @AC-4` Scenario: TC11 - Single remark tidak mengandung separator apapun | Automated | |

### AC-5: Tidak ada remark — kolom remark tetap kosong

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 12 | Verify kolom remark tetap kosong jika semua dokumen Approved (tidak ada rejected) | Klaim dengan semua kategori dokumen berstatus Approved | Transaksi eClaim Reimbursement tanpa dokumen rejected | TC12 - Remark kosong saat semua dokumen Approved | Positive | 1. Buka transaksi dimana semua kategori dokumen berstatus Approved<br>2. Klik Submit Pending<br>3. Verifikasi kolom remark klaim | Kolom remark klaim tetap kosong (empty string), tidak terisi separator atau karakter apapun | | | High | `@NM-1391 @AC-5 @smoke` Scenario: TC12 - Remark kosong saat semua dokumen Approved | Automated | |
| 13 | Verify kolom remark kosong jika dokumen rejected tapi remark-nya null/empty | Klaim dengan 2 dokumen rejected tapi field remark kosong/null | Transaksi dengan dokumen rejected tanpa remark | TC13 - Remark kosong saat rejected docs tanpa remark | Negative | 1. Buka transaksi dengan dokumen rejected yang memiliki remark kosong/null<br>2. Klik Submit Pending<br>3. Verifikasi kolom remark klaim | Kolom remark klaim tetap kosong — tidak berisi separator koma tanpa remark di antaranya | | | High | `@NM-1391 @AC-5` Scenario: TC13 - Remark kosong saat semua rejected docs memiliki remark null/empty | Automated | |
| 14 | Verify tidak ada karakter separator jika tidak ada remark yang valid | Klaim tanpa remark yang valid (semua null/empty) | Dokumen rejected ada, tapi remark semuanya kosong | TC14 - Tidak ada separator tanpa remark valid | Negative | 1. Setup klaim dengan dokumen rejected yang remark-nya kosong<br>2. Submit Pending<br>3. Verifikasi kolom remark tidak berisi koma atau karakter separator | Kolom remark bersih dari karakter apapun — tidak ada "," atau ", " atau whitespace saja | | | Medium | `@NM-1391 @AC-5 @negative` Scenario: TC14 - Tidak ada karakter separator jika semua remark kosong | Automated | |

### AC-6: Remark gabungan terlihat di history klaim

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 15 | Verify remark gabungan muncul di history klaim setelah submit pending | Klaim dengan 2 dokumen rejected: "Diagnosis tidak sesuai", "Lab result incomplete" | Klaim sudah di-submit pending | TC15 - Remark gabungan tampil di history klaim | Positive | 1. Submit pending klaim dengan dokumen rejected<br>2. Navigasi ke halaman history klaim<br>3. Verifikasi record history submit pending menampilkan remark gabungan | History klaim menampilkan record submit pending dengan remark: "Diagnosis tidak sesuai, Lab result incomplete" | | | High | `@NM-1391 @AC-6 @smoke` Scenario: TC15 - Remark gabungan tampil di history klaim | Automated | |
| 16 | Verify history klaim mencatat aksi submit pending dengan remark lengkap | Klaim yang sudah di-submit pending dengan 3 remark | History klaim accessible | TC16 - History mencatat aksi submit pending | Positive | 1. Setelah submit pending berhasil<br>2. Navigasi ke history klaim<br>3. Verifikasi terdapat record baru dengan action "Submit Pending"<br>4. Verifikasi remark pada record tersebut berisi gabungan lengkap | History mencatat: action = Submit Pending, remark = gabungan lengkap dari semua remark kategori rejected | | | High | `@NM-1391 @AC-6` Scenario: TC16 - History mencatat aksi submit pending dengan remark lengkap | Automated | |
| 17 | Verify remark di history bisa dilihat untuk keperluan tracking/audit | Klaim dengan history submit pending | History klaim tersedia | TC17 - Remark di history untuk audit trail | Positive | 1. Navigasi ke history klaim<br>2. Cari record submit pending<br>3. Verifikasi remark ditampilkan secara lengkap dan readable | Remark gabungan ditampilkan lengkap tanpa truncation di halaman history, dapat digunakan untuk audit | | | Medium | `@NM-1391 @AC-6` Scenario: TC17 - Remark di history readable untuk audit trail | Automated | |
| 18 | Verify history kosong untuk remark jika submit pending tanpa dokumen rejected | Klaim dengan semua dokumen Approved | Klaim di-submit pending tanpa rejected docs | TC18 - History remark kosong jika tidak ada rejected | Positive | 1. Submit pending klaim tanpa dokumen rejected<br>2. Navigasi ke history klaim<br>3. Verifikasi record history submit pending memiliki remark kosong | Record history submit pending ada dengan remark kosong (bukan null, bukan separator) | | | Medium | `@NM-1391 @AC-6` Scenario: TC18 - History remark kosong jika submit tanpa dokumen rejected | Automated | |

### Edge Cases & Negative Scenarios

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 19 | Verify remark yang mengandung karakter koma di dalamnya tetap terhandle | Dokumen rejected dengan remark: "Surat tidak lengkap, halaman 2 hilang" (mengandung koma) | Remark kategori dokumen sendiri mengandung koma | TC19 - Remark mengandung karakter koma internal | Positive | 1. Setup dokumen rejected dengan remark yang mengandung koma<br>2. Submit Pending<br>3. Verifikasi remark gabungan tetap menampilkan seluruh teks termasuk koma internal | Remark gabungan menyertakan koma internal dari masing-masing remark. Contoh: "Surat tidak lengkap, halaman 2 hilang, Kwitansi expired" | | | Medium | `@NM-1391 @edge-case` Scenario: TC19 - Remark dengan karakter koma internal | Automated | |
| 20 | Verify remark gabungan dari campuran dokumen (sebagian remark null, sebagian terisi) | 3 dokumen rejected: Remark1 = "Tidak lengkap", Remark2 = null/empty, Remark3 = "Expired" | Dokumen rejected dengan remark campuran (ada dan null) | TC20 - Campuran remark terisi dan null | Positive | 1. Setup klaim dengan 3 dokumen rejected, salah satu remark null<br>2. Submit Pending<br>3. Verifikasi hanya remark yang terisi yang digabungkan | Kolom remark: "Tidak lengkap, Expired" — remark null/empty tidak diikutsertakan, tidak ada double comma | | | High | `@NM-1391 @edge-case` Scenario: TC20 - Campuran remark terisi dan null tidak menghasilkan double comma | Automated | |
| 21 | Verify submit pending berulang mengupdate remark sesuai state terkini | Klaim yang sudah pernah submit pending, lalu status dokumen berubah | Klaim dengan remark sebelumnya dari submit pending pertama | TC21 - Submit pending berulang update remark | Positive | 1. Submit pending pertama kali (misal remark: "A, B")<br>2. Ubah status dokumen (misal dokumen B menjadi Approved, dokumen C menjadi Rejected dengan remark "C")<br>3. Submit pending ulang<br>4. Verifikasi remark diupdate | Remark klaim diupdate menjadi state terbaru: "A, C" (bukan append ke remark lama) | | | Medium | `@NM-1391 @edge-case` Scenario: TC21 - Submit pending berulang update remark sesuai state terkini | Automated | |
| 22 | Verify remark sangat panjang (banyak kategori rejected) | Klaim dengan 10+ kategori dokumen rejected, masing-masing remark panjang | Banyak kategori dokumen rejected | TC22 - Remark gabungan sangat panjang | Positive | 1. Setup klaim dengan banyak kategori dokumen rejected (masing-masing memiliki remark panjang)<br>2. Submit Pending<br>3. Verifikasi remark gabungan tersimpan lengkap tanpa truncation | Remark gabungan tersimpan dan ditampilkan lengkap tanpa terpotong | | | Low | `@NM-1391 @edge-case @boundary` Scenario: TC22 - Remark gabungan sangat panjang tidak di-truncate | Automated | |
| 23 | Verify remark mengandung karakter spesial (quotes, semicolon, HTML tags) | Dokumen rejected dengan remark mengandung: single quote, double quote, semicolon, angle brackets | Remark mengandung karakter spesial | TC23 - Remark dengan karakter spesial | Negative | 1. Setup dokumen rejected dengan remark yang mengandung karakter spesial<br>2. Submit Pending<br>3. Verifikasi remark gabungan tetap tersimpan dan ditampilkan dengan benar | Karakter spesial ditampilkan apa adanya (atau di-escape jika ada XSS concern), tidak menyebabkan error | | | Medium | `@NM-1391 @edge-case @security` Scenario: TC23 - Remark dengan karakter spesial tersimpan dengan benar | Manual | |
| 24 | Verify remark dengan whitespace berlebih (leading/trailing spaces) | Dokumen rejected dengan remark: "  Dokumen tidak lengkap  " (ada spasi di awal/akhir) | Remark per kategori mengandung whitespace berlebih | TC24 - Remark dengan whitespace berlebih | Positive | 1. Setup remark kategori dengan leading/trailing whitespace<br>2. Submit Pending<br>3. Verifikasi remark gabungan di kolom klaim | Remark di-trim per kategori sebelum digabungkan (atau jika tidak trim, tetap tampil tanpa error) | | | Low | `@NM-1391 @edge-case` Scenario: TC24 - Handling whitespace berlebih pada remark kategori | Automated | |
| 25 | Verify submit pending gagal jika ada error — remark tidak tersimpan partial | Klaim dengan dokumen rejected, tapi simulasi error saat proses submit | Simulasi error/timeout saat submit | TC25 - Remark tidak tersimpan partial saat error | Negative | 1. Setup klaim dengan dokumen rejected<br>2. Trigger submit pending dengan kondisi yang menyebabkan error (misal timeout)<br>3. Verifikasi kolom remark klaim tidak berubah dari state sebelumnya | Remark klaim tidak berubah — tidak ada partial save. Proses submit pending bersifat atomic | | | Medium | `@NM-1391 @negative` Scenario: TC25 - Remark tidak tersimpan partial saat submit pending gagal | Manual | |
| 26 | Verify kolom remark tidak terisi karakter separator saja (edge case logic error) | Klaim dengan semua rejected docs memiliki remark null | Semua remark null/empty tapi status rejected | TC26 - Tidak ada separator-only content | Negative | 1. Setup beberapa dokumen rejected dengan semua remark null<br>2. Submit Pending<br>3. Inspect kolom remark klaim | Kolom remark kosong (empty string), bukan berisi ",", ", ,", atau whitespace saja | | | High | `@NM-1391 @AC-5 @negative` Scenario: TC26 - Kolom remark tidak berisi separator-only content | Automated | |

---

## Gherkin Scenarios (Automation Ready)

```gherkin
@NM-1391 @suspect-document @remark
Feature: Menampilkan Suspect Document sebagai Remark
  As a staf administrasi klaim
  I want remark dari setiap kategori dokumen yang di-reject digabungkan menjadi satu
  So that history penolakan dokumen dapat dilihat secara lengkap dan jelas dalam satu tempat

  # Reference:
  # Story: NM-1391
  # Test Cases: docs/test-cases/NM-1391-test-cases.md
  # Steps: src/steps/suspectDocumentRemark.steps.ts

  Background:
    Given user is on login page
    And user logs in as "staf_admin_klaim"

  # ============================================================
  # AC-1: Penggabungan remark dari kategori dokumen rejected
  # ============================================================

  @AC-1 @smoke
  Scenario: TC01 - Multiple remark digabung saat submit pending
    Given there is an eClaim Reimbursement transaction with multiple rejected documents:
      | kategori_dokumen | status   | remark                          |
      | Resume Medis     | Rejected | Dokumen tidak lengkap           |
      | Kwitansi         | Rejected | Kwitansi tidak sesuai tanggal   |
      | Surat Rujukan    | Rejected | Surat rujukan expired           |
    When user opens the eClaim Reimbursement transaction
    And user clicks Submit Pending
    Then claim remark field should contain "Dokumen tidak lengkap, Kwitansi tidak sesuai tanggal, Surat rujukan expired"

  @AC-1
  Scenario: TC02 - Hanya remark dokumen Rejected yang diikutsertakan
    Given there is an eClaim Reimbursement transaction with documents:
      | kategori_dokumen | status   | remark                    |
      | Resume Medis     | Rejected | Dokumen tidak lengkap     |
      | Kwitansi         | Approved | -                         |
      | Hasil Lab        | Approved | -                         |
      | Surat Rujukan    | Rejected | Surat rujukan expired     |
    When user opens the eClaim Reimbursement transaction
    And user clicks Submit Pending
    Then claim remark field should contain "Dokumen tidak lengkap, Surat rujukan expired"
    And claim remark field should NOT contain any remark from Approved documents

  @AC-1
  Scenario: TC03 - Penggabungan remark pada transaksi eClaim Reimbursement
    Given there is an eClaim Reimbursement transaction with rejected documents
    When user opens the eClaim Reimbursement transaction
    And user clicks Submit Pending
    Then claim remark field should be populated with concatenated remarks from rejected documents

  # ============================================================
  # AC-2: Separator koma antar remark
  # ============================================================

  @AC-2 @smoke
  Scenario: TC04 - Separator koma digunakan antar remark
    Given there is an eClaim Reimbursement transaction with 3 rejected documents each having remark
    When user clicks Submit Pending
    Then claim remark field should use ", " (comma + space) as separator between remarks

  @AC-2
  Scenario: TC05 - Tidak ada trailing comma di akhir remark gabungan
    Given there is an eClaim Reimbursement transaction with 2 rejected documents
    When user clicks Submit Pending
    Then claim remark field should NOT end with comma character

  @AC-2
  Scenario: TC06 - Tidak ada leading comma di awal remark gabungan
    Given there is an eClaim Reimbursement transaction with rejected documents
    When user clicks Submit Pending
    Then claim remark field should NOT start with comma character

  # ============================================================
  # AC-3: Remark disimpan dan ditampilkan pada kolom remark klaim
  # ============================================================

  @AC-3 @smoke
  Scenario: TC07 - Remark gabungan tersimpan di kolom remark klaim
    Given there is an eClaim Reimbursement transaction with rejected documents:
      | kategori_dokumen | remark                    |
      | Resume Medis     | Dokumen tidak lengkap     |
      | Kwitansi         | Kwitansi expired          |
    When user clicks Submit Pending
    And user navigates to claim detail page
    Then claim remark field should display "Dokumen tidak lengkap, Kwitansi expired"

  @AC-3
  Scenario: TC08 - Remark gabungan tetap tampil setelah reload halaman
    Given a claim has been submitted pending with concatenated remark
    When user reloads the claim detail page
    Then claim remark field should still display the concatenated remark

  @AC-3
  Scenario: TC09 - Remark gabungan tampil di halaman list klaim
    Given a claim has been submitted pending with concatenated remark
    When user navigates to claim list page
    Then the claim row should display the concatenated remark in remark column

  # ============================================================
  # AC-4: Single remark tanpa koma tambahan
  # ============================================================

  @AC-4 @smoke
  Scenario: TC10 - Single remark ditampilkan tanpa koma tambahan
    Given there is an eClaim Reimbursement transaction with only 1 rejected document:
      | kategori_dokumen | remark                |
      | Surat Rujukan    | Surat rujukan expired |
    When user clicks Submit Pending
    Then claim remark field should display "Surat rujukan expired"
    And claim remark field should NOT contain comma character

  @AC-4
  Scenario: TC11 - Single remark tidak mengandung separator apapun
    Given there is an eClaim Reimbursement transaction with 1 rejected and 3 approved documents
    When user clicks Submit Pending
    Then claim remark field should contain only the single remark text
    And claim remark field should NOT contain any separator characters

  # ============================================================
  # AC-5: Kolom remark tetap kosong jika tidak ada remark
  # ============================================================

  @AC-5 @smoke
  Scenario: TC12 - Remark kosong saat semua dokumen Approved
    Given there is an eClaim Reimbursement transaction with all documents Approved
    When user clicks Submit Pending
    Then claim remark field should be empty
    And claim remark field should NOT contain comma or any separator

  @AC-5
  Scenario: TC13 - Remark kosong saat semua rejected docs memiliki remark null/empty
    Given there is an eClaim Reimbursement transaction with rejected documents but all remarks are null or empty
    When user clicks Submit Pending
    Then claim remark field should be empty

  @AC-5 @negative
  Scenario: TC14 - Tidak ada karakter separator jika semua remark kosong
    Given there is an eClaim Reimbursement transaction with rejected documents having empty remarks
    When user clicks Submit Pending
    Then claim remark field should be empty string
    And claim remark field should NOT contain "," or ", " or whitespace only

  # ============================================================
  # AC-6: Remark terlihat di history klaim
  # ============================================================

  @AC-6 @smoke
  Scenario: TC15 - Remark gabungan tampil di history klaim
    Given there is an eClaim Reimbursement transaction with rejected documents:
      | kategori_dokumen | remark                    |
      | Resume Medis     | Diagnosis tidak sesuai    |
      | Hasil Lab        | Lab result incomplete     |
    When user clicks Submit Pending
    And user navigates to claim history page
    Then claim history should contain a record with action "Submit Pending"
    And that history record should display remark "Diagnosis tidak sesuai, Lab result incomplete"

  @AC-6
  Scenario: TC16 - History mencatat aksi submit pending dengan remark lengkap
    Given a claim has been submitted pending with 3 rejected document remarks
    When user navigates to claim history page
    Then claim history should have a Submit Pending record
    And the record remark should contain all concatenated remarks with comma separator

  @AC-6
  Scenario: TC17 - Remark di history readable untuk audit trail
    Given a claim has been submitted pending with concatenated remark
    When user navigates to claim history page
    Then the remark in history should be displayed completely without truncation
    And the remark should be readable for audit purposes

  @AC-6
  Scenario: TC18 - History remark kosong jika submit tanpa dokumen rejected
    Given there is an eClaim Reimbursement transaction with all documents Approved
    When user clicks Submit Pending
    And user navigates to claim history page
    Then claim history should contain a record with action "Submit Pending"
    And that history record should have empty remark

  # ============================================================
  # Edge Cases & Negative Scenarios
  # ============================================================

  @edge-case
  Scenario: TC19 - Remark dengan karakter koma internal
    Given there is a rejected document with remark "Surat tidak lengkap, halaman 2 hilang"
    And there is another rejected document with remark "Kwitansi expired"
    When user clicks Submit Pending
    Then claim remark field should contain "Surat tidak lengkap, halaman 2 hilang, Kwitansi expired"

  @edge-case
  Scenario: TC20 - Campuran remark terisi dan null tidak menghasilkan double comma
    Given there is an eClaim Reimbursement transaction with rejected documents:
      | kategori_dokumen | remark            |
      | Resume Medis     | Tidak lengkap     |
      | Kwitansi         |                   |
      | Surat Rujukan    | Expired           |
    When user clicks Submit Pending
    Then claim remark field should contain "Tidak lengkap, Expired"
    And claim remark field should NOT contain ",," (double comma)

  @edge-case
  Scenario: TC21 - Submit pending berulang update remark sesuai state terkini
    Given a claim was previously submitted pending with remark "A, B"
    And document status has changed (B now Approved, C now Rejected with remark "C")
    When user clicks Submit Pending again
    Then claim remark field should be updated to "A, C"
    And previous remark "A, B" should remain in history

  @edge-case @boundary
  Scenario: TC22 - Remark gabungan sangat panjang tidak di-truncate
    Given there is an eClaim Reimbursement transaction with 10+ rejected documents each having long remark
    When user clicks Submit Pending
    Then claim remark field should store all concatenated remarks completely
    And no remark should be truncated

  @edge-case @security
  Scenario: TC23 - Remark dengan karakter spesial tersimpan dengan benar
    Given there is a rejected document with remark containing special characters (quotes, semicolons, angle brackets)
    When user clicks Submit Pending
    Then claim remark should be stored and displayed correctly
    And special characters should not cause any error or XSS vulnerability

  @edge-case
  Scenario: TC24 - Handling whitespace berlebih pada remark kategori
    Given there is a rejected document with remark "  Dokumen tidak lengkap  " (extra whitespace)
    When user clicks Submit Pending
    Then claim remark should handle whitespace appropriately (trimmed or as-is without error)

  @negative
  Scenario: TC25 - Remark tidak tersimpan partial saat submit pending gagal
    Given there is an eClaim Reimbursement transaction with rejected documents
    And submit pending process encounters an error
    Then claim remark field should remain unchanged from previous state
    And no partial remark should be saved

  @AC-5 @negative
  Scenario: TC26 - Kolom remark tidak berisi separator-only content
    Given there is an eClaim Reimbursement transaction with multiple rejected documents all having null/empty remarks
    When user clicks Submit Pending
    Then claim remark field should be empty
    And claim remark field should NOT contain only separator characters like "," or ", , ,"
```

---

## Coverage Summary

| AC# | Description | Positive | Negative | Boundary | Total |
|-----|-------------|----------|----------|----------|-------|
| AC-1 | Penggabungan remark dari dokumen rejected saat submit pending | 3 | 0 | 0 | 3 |
| AC-2 | Separator koma antar remark | 3 | 0 | 0 | 3 |
| AC-3 | Remark disimpan dan ditampilkan di kolom remark klaim | 3 | 0 | 0 | 3 |
| AC-4 | Single remark tanpa koma tambahan | 2 | 0 | 0 | 2 |
| AC-5 | Kolom remark kosong jika tidak ada remark | 1 | 2 | 0 | 3 |
| AC-6 | Remark terlihat di history klaim | 4 | 0 | 0 | 4 |
| Edge Cases | Karakter spesial, whitespace, panjang, repeat submit | 4 | 2 | 1 | 8 |
| **Total** | | **20** | **4** | **1** | **26** |

> Note: Beberapa TC cover multiple AC (misal TC20 cover AC-1 + AC-2 + AC-5)

---

## Feature File Mapping

| TC Range | Feature File | Scenario Tags |
|----------|-------------|---------------|
| TC01–TC03 | `src/features/suspectDocumentRemark/remarkConcatenation.feature` | `@NM-1391 @AC-1` |
| TC04–TC06 | `src/features/suspectDocumentRemark/remarkSeparator.feature` | `@NM-1391 @AC-2` |
| TC07–TC09 | `src/features/suspectDocumentRemark/remarkStorage.feature` | `@NM-1391 @AC-3` |
| TC10–TC11 | `src/features/suspectDocumentRemark/singleRemark.feature` | `@NM-1391 @AC-4` |
| TC12–TC14 | `src/features/suspectDocumentRemark/emptyRemark.feature` | `@NM-1391 @AC-5` |
| TC15–TC18 | `src/features/suspectDocumentRemark/remarkHistory.feature` | `@NM-1391 @AC-6` |
| TC19–TC26 | `src/features/suspectDocumentRemark/edgeCases.feature` | `@NM-1391 @edge-case` |

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | Muhammad Taufiqul Rahman | | |
| Tester | | | |
| Squad Lead | | | |
| BA / PO | pujiyanto255 | | |

---

## Attachment

| TC# | Evidence Link | Notes |
|-----|--------------|-------|
| TC01 | | |
| TC02 | | |
| TC03 | | |
| TC04 | | |
| TC05 | | |
| TC06 | | |
| TC07 | | |
| TC08 | | |
| TC09 | | |
| TC10 | | |
| TC11 | | |
| TC12 | | |
| TC13 | | |
| TC14 | | |
| TC15 | | |
| TC16 | | |
| TC17 | | |
| TC18 | | |
| TC19 | | |
| TC20 | | |
| TC21 | | |
| TC22 | | |
| TC23 | | |
| TC24 | | |
| TC25 | | |
| TC26 | | |
