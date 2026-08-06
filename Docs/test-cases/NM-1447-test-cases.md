# Test Cases: NM-1447 - Menampilkan Score Claim

## Test Case Information

| Field | Value |
|-------|-------|
| **No** | |
| **Requested App Testing No** | |
| **Test Requested date** | |
| **Test Priority** | High |
| **Application Address** | https://development.inhealth.co.id/newmicare |
| **Description** | Menampilkan kolom Claim Score di halaman-halaman existing yang menampilkan daftar klaim |
| **Test Design by** | |
| **Test Execute by** | |
| **Test Execution date** | |
| **Follow Up Test By** | |
| **Follow Up Date** | |
| **Number Page** | 1 Of 1 |
| **Jira Reference** | NM-1447 |
| **Parent** | NM-1441 |
| **Sprint** | Claim Operation Sprint 26 |
| **Version** | TC.2026.07 |

---

## Test Cases

### AC-1: Kolom Claim Score muncul di halaman View List Reimburse (Role Admin)

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Verify kolom Claim Score tampil di halaman View List Reimburse | User role: Admin | User sudah login sebagai Admin | TC01 - Kolom Claim Score tampil di View List Reimburse | Positive | 1. Login ke New MiCare sebagai Admin<br>2. Navigasi ke menu Reimbursement > List Reimbursement<br>3. Verifikasi tabel list menampilkan kolom "Claim Score" | Kolom "Claim Score" tampil di tabel list reimburse | | | High | `@NM-1447 @AC-1 @smoke` Scenario: TC01 - Kolom Claim Score tampil di halaman View List Reimburse | Automated | |
| 2 | Verify posisi kolom Claim Score setelah kolom Received Date | User role: Admin | User sudah berada di halaman List Reimbursement | TC02 - Posisi kolom Claim Score setelah Received Date | Positive | 1. Navigasi ke halaman List Reimbursement<br>2. Verifikasi urutan kolom pada tabel<br>3. Pastikan kolom "Claim Score" berada tepat setelah kolom "Received Date" | Kolom "Claim Score" posisinya tepat setelah kolom "Received Date" (sesuai wireframe) | | | Medium | `@NM-1447 @AC-1` Scenario: TC02 - Posisi kolom Claim Score setelah Received Date di View List Reimburse | Automated | |
| 3 | Verify nilai Claim Score tampil sebagai angka integer | User role: Admin, Klaim dengan score: 85 | Terdapat klaim yang sudah memiliki claim_score di database | TC03 - Nilai Claim Score tampil sebagai angka | Positive | 1. Navigasi ke halaman List Reimbursement<br>2. Cari klaim yang sudah memiliki score<br>3. Verifikasi kolom Claim Score menampilkan angka integer | Kolom Claim Score menampilkan angka integer (misal: 85) tanpa desimal, tanpa prefix/suffix | | | High | `@NM-1447 @AC-1 @AC-5` Scenario: TC03 - Nilai Claim Score tampil sebagai angka integer di View List Reimburse | Automated | |
| 4 | Verify klaim tanpa score menampilkan tanda "-" | User role: Admin, Klaim tanpa score (null) | Terdapat klaim yang belum memiliki claim_score (null) di database | TC04 - Klaim tanpa score menampilkan dash | Positive | 1. Navigasi ke halaman List Reimbursement<br>2. Cari klaim yang belum memiliki score (claim_score = null)<br>3. Verifikasi kolom Claim Score menampilkan "-" | Kolom Claim Score menampilkan tanda "-" untuk klaim yang belum memiliki score | | | High | `@NM-1447 @AC-1 @AC-6` Scenario: TC04 - Klaim tanpa score menampilkan dash di View List Reimburse | Automated | |
| 5 | Verify API response menyertakan field claim_score untuk View List Reimburse | API params: `page=1&size=10&rangeType=receive_date&claimStatus=1199&productCode=IDM&isJetrules=false&is3307=false` | Endpoint accessible | TC05 - API response claim_score untuk View List Reimburse | Positive | 1. Hit API GET `/api/Reimbursement/V2/GetReimburse` dengan parameter is3307=false<br>2. Verifikasi response body menyertakan field `claim_score`<br>3. Verifikasi tipe data: integer atau null | Response body mengandung field `claim_score` dengan tipe integer (jika ada) atau null (jika belum ada score) | | | High | `@NM-1447 @AC-1 @api` Scenario: TC05 - API response menyertakan field claim_score untuk View List Reimburse | Automated | |

### AC-2: Kolom Claim Score muncul di halaman Pending Eclaim (Role Admin)

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 6 | Verify kolom Claim Score tampil di halaman Pending Eclaim | User role: Admin | User sudah login sebagai Admin | TC06 - Kolom Claim Score tampil di Pending Eclaim | Positive | 1. Login ke New MiCare sebagai Admin<br>2. Navigasi ke halaman Pending Eclaim<br>3. Verifikasi tabel list menampilkan kolom "Claim Score" | Kolom "Claim Score" tampil di tabel Pending Eclaim | | | High | `@NM-1447 @AC-2 @smoke` Scenario: TC06 - Kolom Claim Score tampil di halaman Pending Eclaim | Automated | |
| 7 | Verify posisi kolom Claim Score setelah kolom Receive Date di Pending Eclaim | User role: Admin | User sudah berada di halaman Pending Eclaim | TC07 - Posisi kolom Claim Score setelah Receive Date di Pending Eclaim | Positive | 1. Navigasi ke halaman Pending Eclaim<br>2. Verifikasi urutan kolom pada tabel<br>3. Pastikan kolom "Claim Score" berada tepat setelah kolom "Receive Date" | Kolom "Claim Score" posisinya tepat setelah kolom "Receive Date" | | | Medium | `@NM-1447 @AC-2` Scenario: TC07 - Posisi kolom Claim Score setelah Receive Date di Pending Eclaim | Automated | |
| 8 | Verify nilai Claim Score tampil di Pending Eclaim untuk klaim dengan score | User role: Admin, Klaim eclaim dengan score | Terdapat klaim eclaim (status 3307) yang memiliki claim_score | TC08 - Nilai Claim Score tampil di Pending Eclaim | Positive | 1. Navigasi ke halaman Pending Eclaim<br>2. Verifikasi klaim yang memiliki score menampilkan angka<br>3. Verifikasi klaim tanpa score menampilkan "-" | Klaim dengan score menampilkan angka integer; klaim tanpa score menampilkan "-" | | | High | `@NM-1447 @AC-2 @AC-5 @AC-6` Scenario: TC08 - Nilai Claim Score dan null handling di Pending Eclaim | Automated | |
| 9 | Verify API response menyertakan field claim_score untuk Pending Eclaim | API params: `page=1&size=10&claimStatus=3307&is3307=true&productCode=IDM` | Endpoint accessible | TC09 - API response claim_score untuk Pending Eclaim | Positive | 1. Hit API GET `/api/Reimbursement/V2/GetReimburse` dengan parameter is3307=true<br>2. Verifikasi response body menyertakan field `claim_score`<br>3. Verifikasi tipe data: integer atau null | Response body mengandung field `claim_score` dengan tipe integer atau null | | | High | `@NM-1447 @AC-2 @api` Scenario: TC09 - API response menyertakan field claim_score untuk Pending Eclaim | Automated | |

### AC-3: Kolom Claim Score muncul di halaman Follow Up Pending Claim (Role Admin)

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 10 | Verify kolom Claim Score tampil di halaman Follow Up Pending Claim | User role: Admin | User sudah login sebagai Admin | TC10 - Kolom Claim Score tampil di Follow Up Pending Claim | Positive | 1. Login ke New MiCare sebagai Admin<br>2. Navigasi ke halaman Follow Up Pending Claim<br>3. Verifikasi tabel list menampilkan kolom "Claim Score" | Kolom "Claim Score" tampil di tabel Follow Up Pending Claim | | | High | `@NM-1447 @AC-3 @smoke` Scenario: TC10 - Kolom Claim Score tampil di halaman Follow Up Pending Claim | Automated | |
| 11 | Verify posisi kolom Claim Score setelah kolom Status di Follow Up Pending Claim | User role: Admin | User sudah berada di halaman Follow Up Pending Claim | TC11 - Posisi kolom Claim Score setelah Status | Positive | 1. Navigasi ke halaman Follow Up Pending Claim<br>2. Verifikasi urutan kolom pada tabel<br>3. Pastikan kolom "Claim Score" berada tepat setelah kolom "Status" | Kolom "Claim Score" posisinya tepat setelah kolom "Status" | | | Medium | `@NM-1447 @AC-3` Scenario: TC11 - Posisi kolom Claim Score setelah Status di Follow Up Pending Claim | Automated | |
| 12 | Verify nilai Claim Score tampil di Follow Up Pending Claim | User role: Admin, Klaim dengan status 2205/2206 | Terdapat klaim follow up pending (status 2205/2206) yang memiliki claim_score | TC12 - Nilai Claim Score tampil di Follow Up Pending Claim | Positive | 1. Navigasi ke halaman Follow Up Pending Claim<br>2. Verifikasi klaim yang memiliki score menampilkan angka<br>3. Verifikasi klaim tanpa score menampilkan "-" | Klaim dengan score menampilkan angka integer; klaim tanpa score menampilkan "-" | | | High | `@NM-1447 @AC-3 @AC-5 @AC-6` Scenario: TC12 - Nilai Claim Score dan null handling di Follow Up Pending Claim | Automated | |
| 13 | Verify API response menyertakan field claim_score untuk Follow Up Pending Claim | API params: `page=1&size=10&status=2205&status=2206&branchCode=1101&isClaimMigration=false&useRemarkPending=true&productCode=IDM` | Endpoint accessible | TC13 - API response claim_score untuk Follow Up Pending Claim | Positive | 1. Hit API GET `/api/Claim/GetClaimByProvider` dengan parameter status 2205/2206<br>2. Verifikasi response body menyertakan field `claim_score`<br>3. Verifikasi tipe data: integer atau null | Response body mengandung field `claim_score` dengan tipe integer atau null | | | High | `@NM-1447 @AC-3 @api` Scenario: TC13 - API response menyertakan field claim_score untuk Follow Up Pending Claim | Automated | |

### AC-4: Kolom Claim Score muncul di List Claim Module Adjustment (Role Verifikator, Kanit, SPV, HO, Kadep)

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 14 | Verify kolom Claim Score tampil di List Claim Module Adjustment (role Verifikator) | User role: Verifikator | User sudah login sebagai Verifikator | TC14 - Kolom Claim Score tampil di List Claim Adjustment (Verifikator) | Positive | 1. Login ke New MiCare sebagai Verifikator<br>2. Navigasi ke Claim > Claims > List<br>3. Filter Register dengan status 5003 atau 5004<br>4. Verifikasi tabel menampilkan kolom "Claim Score" | Kolom "Claim Score" tampil di tabel List Claim Module Adjustment | | | High | `@NM-1447 @AC-4 @smoke` Scenario: TC14 - Kolom Claim Score tampil di List Claim Module Adjustment | Automated | |
| 15 | Verify posisi kolom Claim Score sebelum kolom Provider Name | User role: Verifikator | User sudah berada di halaman List Claim Adjustment | TC15 - Posisi kolom Claim Score sebelum Provider Name | Positive | 1. Navigasi ke List Claim Module Adjustment<br>2. Verifikasi urutan kolom pada tabel<br>3. Pastikan kolom "Claim Score" berada tepat sebelum kolom "Provider Name" | Kolom "Claim Score" posisinya tepat sebelum kolom "Provider Name" | | | Medium | `@NM-1447 @AC-4` Scenario: TC15 - Posisi kolom Claim Score sebelum Provider Name di Module Adjustment | Automated | |
| 16 | Verify nilai Claim Score tampil di List Claim Module Adjustment | User role: Verifikator, Klaim adjustment dengan score | Terdapat klaim dengan status 5003/5004 yang memiliki claim_score | TC16 - Nilai Claim Score tampil di Module Adjustment | Positive | 1. Navigasi ke List Claim Module Adjustment<br>2. Verifikasi klaim yang memiliki score menampilkan angka<br>3. Verifikasi klaim tanpa score menampilkan "-" | Klaim dengan score menampilkan angka integer; klaim tanpa score menampilkan "-" | | | High | `@NM-1447 @AC-4 @AC-5 @AC-6` Scenario: TC16 - Nilai Claim Score dan null handling di Module Adjustment | Automated | |
| 17 | Verify kolom Claim Score tampil untuk role SPV | User role: SPV | User sudah login sebagai SPV | TC17 - Kolom Claim Score tampil untuk role SPV | Positive | 1. Login sebagai SPV<br>2. Navigasi ke List Claim Module Adjustment<br>3. Verifikasi kolom "Claim Score" tampil | Kolom "Claim Score" tampil di tabel untuk role SPV | | | Medium | `@NM-1447 @AC-4` Scenario: TC17 - Kolom Claim Score tampil untuk role SPV di Module Adjustment | Automated | |
| 18 | Verify kolom Claim Score tampil untuk role Kanit Klaim | User role: Kanit Klaim | User sudah login sebagai Kanit Klaim | TC18 - Kolom Claim Score tampil untuk role Kanit Klaim | Positive | 1. Login sebagai Kanit Klaim<br>2. Navigasi ke List Claim Module Adjustment<br>3. Verifikasi kolom "Claim Score" tampil | Kolom "Claim Score" tampil di tabel untuk role Kanit Klaim | | | Medium | `@NM-1447 @AC-4` Scenario: TC18 - Kolom Claim Score tampil untuk role Kanit Klaim di Module Adjustment | Automated | |
| 19 | Verify kolom Claim Score tampil untuk role Staff HO / Kadep Klaim | User role: Staff HO / Kadep Klaim | User sudah login sebagai Staff HO atau Kadep Klaim | TC19 - Kolom Claim Score tampil untuk role Staff HO / Kadep | Positive | 1. Login sebagai Staff HO atau Kadep Klaim<br>2. Navigasi ke List Claim Module Adjustment<br>3. Verifikasi kolom "Claim Score" tampil | Kolom "Claim Score" tampil di tabel untuk role Staff HO / Kadep Klaim | | | Medium | `@NM-1447 @AC-4` Scenario: TC19 - Kolom Claim Score tampil untuk role Staff HO dan Kadep Klaim di Module Adjustment | Automated | |
| 20 | Verify API response menyertakan field claim_score untuk Module Adjustment | API params: `page=1&size=10&registerNo=1101R072600042&useRemarkPending=true` | Endpoint accessible | TC20 - API response claim_score untuk Module Adjustment | Positive | 1. Hit API GET `/api/Claim/V3/GetClaimByProvider` dengan parameter yang sesuai<br>2. Verifikasi response body menyertakan field `claim_score`<br>3. Verifikasi tipe data: integer atau null | Response body mengandung field `claim_score` dengan tipe integer atau null | | | High | `@NM-1447 @AC-4 @api` Scenario: TC20 - API response menyertakan field claim_score untuk Module Adjustment | Automated | |

### AC-5 & AC-6: Score ditampilkan sebagai angka final dan null handling

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 21 | Verify score ditampilkan tanpa breakdown detail (hanya angka final) | User role: Admin, Klaim dengan score 75 | Klaim memiliki claim_score di database | TC21 - Score ditampilkan tanpa breakdown | Positive | 1. Navigasi ke halaman View List Reimburse<br>2. Verifikasi kolom Claim Score hanya menampilkan satu angka<br>3. Verifikasi tidak ada tooltip/detail TKP/Facility/Transaction | Kolom hanya menampilkan satu angka integer (misal: 75), tanpa breakdown TKP/Facility/Transaction | | | Medium | `@NM-1447 @AC-5` Scenario: TC21 - Score ditampilkan sebagai angka final tanpa breakdown | Automated | |
| 22 | Verify score = 0 ditampilkan sebagai "0" (bukan dash) | User role: Admin, Klaim dengan claim_score = 0 | Terdapat klaim yang memiliki claim_score = 0 di database | TC22 - Score 0 ditampilkan sebagai angka 0 | Positive | 1. Navigasi ke salah satu halaman list klaim<br>2. Cari klaim yang memiliki score = 0<br>3. Verifikasi kolom Claim Score menampilkan "0" | Kolom Claim Score menampilkan "0" (bukan "-"), karena 0 adalah nilai valid | | | Medium | `@NM-1447 @AC-5 @boundary` Scenario: TC22 - Score 0 ditampilkan sebagai angka bukan dash | Automated | |
| 23 | Verify score dengan nilai tinggi tidak terpotong di kolom | User role: Admin, Klaim dengan claim_score tinggi (misal 999) | Terdapat klaim dengan score tinggi | TC23 - Score tinggi tidak truncated | Positive | 1. Navigasi ke salah satu halaman list klaim<br>2. Cari klaim yang memiliki score tinggi (3+ digit)<br>3. Verifikasi angka tidak terpotong dan layout tabel tidak pecah | Angka score tinggi ditampilkan lengkap, layout tabel tetap rapi | | | Low | `@NM-1447 @AC-5 @boundary` Scenario: TC23 - Score tinggi ditampilkan lengkap tanpa truncation | Automated | |
| 24 | Verify semua klaim null score menampilkan "-" secara konsisten di semua halaman | User role: Admin + Verifikator | Terdapat klaim tanpa score di semua 4 halaman | TC24 - Null handling konsisten di semua halaman | Positive | 1. Navigasi ke View List Reimburse → cek klaim tanpa score<br>2. Navigasi ke Pending Eclaim → cek klaim tanpa score<br>3. Navigasi ke Follow Up Pending → cek klaim tanpa score<br>4. Login Verifikator → Module Adjustment → cek klaim tanpa score | Semua halaman menampilkan "-" secara konsisten untuk klaim yang belum memiliki score | | | High | `@NM-1447 @AC-6 @consistency` Scenario: TC24 - Null handling konsisten menampilkan dash di semua halaman | Automated | |

### AC-7: Score bersifat read-only

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 25 | Verify kolom Claim Score tidak memiliki interaksi edit (read-only) | User role: Admin | User sudah berada di halaman List Reimbursement | TC25 - Claim Score bersifat read-only | Positive | 1. Navigasi ke halaman List Reimbursement<br>2. Klik pada sel Claim Score<br>3. Verifikasi tidak ada input field, dropdown, atau modal edit yang muncul<br>4. Verifikasi cursor tidak berubah menjadi cursor edit | Kolom Claim Score murni display-only, tidak ada interaksi edit apapun | | | Medium | `@NM-1447 @AC-7` Scenario: TC25 - Kolom Claim Score bersifat read-only tidak bisa diedit | Automated | |
| 26 | Verify tidak ada icon edit/pencil pada kolom Claim Score | User role: Admin + Verifikator | User sudah berada di halaman list klaim | TC26 - Tidak ada icon edit pada kolom Claim Score | Negative | 1. Navigasi ke semua 4 halaman yang menampilkan Claim Score<br>2. Verifikasi tidak ada icon edit (pencil), link, atau button di kolom Claim Score | Tidak ada element interaktif (icon, link, button) pada kolom Claim Score di semua halaman | | | Low | `@NM-1447 @AC-7 @negative` Scenario: TC26 - Tidak ada icon edit pada kolom Claim Score | Automated | |

### Edge Cases & Negative Scenarios

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 27 | Verify kolom Claim Score tetap tampil meskipun semua klaim null | User role: Admin, Semua klaim belum punya score | Semua data klaim di halaman memiliki claim_score = null | TC27 - Kolom tetap tampil saat semua klaim null | Positive | 1. Navigasi ke halaman dengan data klaim yang semuanya belum memiliki score<br>2. Verifikasi kolom "Claim Score" tetap tampil di header tabel<br>3. Verifikasi semua baris menampilkan "-" | Kolom "Claim Score" tetap muncul di header. Semua baris menampilkan "-" | | | Medium | `@NM-1447 @edge-case` Scenario: TC27 - Kolom Claim Score tetap tampil meskipun semua klaim belum memiliki score | Automated | |
| 28 | Verify pagination tidak mempengaruhi tampilan score | User role: Admin, Data klaim > 1 page | Data list klaim lebih dari 1 halaman | TC28 - Score tetap tampil di semua halaman pagination | Positive | 1. Navigasi ke halaman List Reimbursement<br>2. Verifikasi score di halaman 1<br>3. Navigasi ke halaman 2<br>4. Verifikasi score di halaman 2 tetap sesuai data | Score di setiap halaman pagination sesuai dengan data klaim masing-masing, tidak terjadi misalignment | | | Medium | `@NM-1447 @edge-case` Scenario: TC28 - Score konsisten saat berpindah halaman pagination | Automated | |
| 29 | Verify filter tidak mempengaruhi tampilan kolom score | User role: Admin | User menerapkan filter pada halaman list | TC29 - Filter tidak mempengaruhi kolom Claim Score | Positive | 1. Navigasi ke halaman list klaim<br>2. Terapkan filter (misal by claim status atau date range)<br>3. Verifikasi kolom "Claim Score" tetap tampil<br>4. Verifikasi nilai score pada hasil filter tetap benar | Kolom Claim Score tetap muncul setelah filter diterapkan, nilai score tetap akurat | | | Medium | `@NM-1447 @edge-case` Scenario: TC29 - Kolom Claim Score tetap tampil dan akurat setelah filter diterapkan | Automated | |
| 30 | Verify Module Adjustment — Claim Score tampil untuk klaim status 5003 (need receive first) | User role: Verifikator, Klaim status 5003 | Klaim dengan status 5003 tersedia | TC30 - Claim Score tampil pada klaim status 5003 | Positive | 1. Login sebagai Verifikator<br>2. Navigasi ke Claim > Claims > List<br>3. Filter Register dengan status 5003<br>4. Verifikasi kolom Claim Score tampil dan menunjukkan nilai | Kolom Claim Score tampil dengan nilai yang benar untuk klaim status 5003 | | | High | `@NM-1447 @AC-4 @edge-case` Scenario: TC30 - Claim Score tampil pada klaim status 5003 di Module Adjustment | Automated | |
| 31 | Verify Module Adjustment — Claim Score tampil untuk klaim status 5004 (direct edit) | User role: Verifikator, Klaim status 5004 | Klaim dengan status 5004 tersedia | TC31 - Claim Score tampil pada klaim status 5004 | Positive | 1. Login sebagai Verifikator<br>2. Navigasi ke Claim > Claims > List<br>3. Filter Register dengan status 5004<br>4. Verifikasi kolom Claim Score tampil dan menunjukkan nilai | Kolom Claim Score tampil dengan nilai yang benar untuk klaim status 5004 | | | High | `@NM-1447 @AC-4 @edge-case` Scenario: TC31 - Claim Score tampil pada klaim status 5004 di Module Adjustment | Automated | |
| 32 | Verify API response — claim_score null ketika claim_extend tidak ada record | API call ke endpoint, klaim tanpa record di claim_extend | Klaim tidak memiliki data di tabel transactions.claim_extend | TC32 - API return null ketika tidak ada claim_extend | Positive | 1. Identifikasi klaim yang tidak memiliki record di transactions.claim_extend<br>2. Hit API endpoint yang sesuai<br>3. Verifikasi field claim_score = null pada response | Field `claim_score` bernilai null (bukan 0, bukan error) untuk klaim tanpa record claim_extend | | | High | `@NM-1447 @AC-6 @api @edge-case` Scenario: TC32 - API return null saat tidak ada record claim_extend | Automated | |
| 33 | Verify response time API tidak terdegradasi signifikan setelah penambahan LEFT JOIN | API call ke 4 endpoint | Environment SIT/development | TC33 - Performance API setelah LEFT JOIN | Positive | 1. Hit API GET `/api/Reimbursement/V2/GetReimburse` (is3307=false)<br>2. Hit API GET `/api/Reimbursement/V2/GetReimburse` (is3307=true)<br>3. Hit API GET `/api/Claim/GetClaimByProvider`<br>4. Hit API GET `/api/Claim/V3/GetClaimByProvider`<br>5. Verifikasi response time < 3 detik untuk semua endpoint | Semua endpoint merespons dalam waktu < 3 detik meskipun ada LEFT JOIN tambahan | | | Medium | `@NM-1447 @performance @api` Scenario: TC33 - Response time API tetap acceptable setelah penambahan LEFT JOIN | Manual / API | |
| 34 | Verify kolom Claim Score TIDAK muncul di halaman yang tidak termasuk scope | User role: Admin, navigasi ke halaman claim lain (bukan 4 halaman scope) | User sudah login | TC34 - Claim Score tidak muncul di halaman non-scope | Negative | 1. Login sebagai Admin<br>2. Navigasi ke halaman claim list lain yang BUKAN termasuk scope (misal halaman claim main list)<br>3. Verifikasi kolom "Claim Score" TIDAK tampil | Kolom "Claim Score" tidak muncul di halaman yang bukan termasuk scope story ini | | | Medium | `@NM-1447 @negative` Scenario: TC34 - Claim Score tidak muncul di halaman yang tidak termasuk scope | Manual | |

---

## Gherkin Scenarios (Automation Ready)

```gherkin
@NM-1447 @claim-score @display
Feature: Menampilkan Score Claim
  As an Admin / Verifikator / SPV / Kanit Klaim / Staff HO / Kadep Klaim
  I want to see claim score on existing claim list pages
  So that I can know the claim weight being processed without opening another page

  # Reference:
  # Story: NM-1447
  # Test Cases: docs/test-cases/NM-1447-test-cases.md
  # Pages: src/pages/reimbursement/, src/pages/claim/
  # Steps: src/steps/claimScore.steps.ts

  # ============================================================
  # AC-1: Kolom Claim Score di View List Reimburse (Role Admin)
  # ============================================================

  @AC-1 @smoke
  Scenario: TC01 - Kolom Claim Score tampil di halaman View List Reimburse
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Reimbursement > List Reimbursement
    Then claim list table should be displayed
    And table header should contain column "Claim Score"

  @AC-1
  Scenario: TC02 - Posisi kolom Claim Score setelah Received Date di View List Reimburse
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Reimbursement > List Reimbursement
    Then column "Claim Score" should be positioned after column "Received Date"

  @AC-1 @AC-5
  Scenario: TC03 - Nilai Claim Score tampil sebagai angka integer di View List Reimburse
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Reimbursement > List Reimbursement
    Then claims with score should display integer value in "Claim Score" column
    And displayed score should not contain decimal or prefix or suffix

  @AC-1 @AC-6
  Scenario: TC04 - Klaim tanpa score menampilkan dash di View List Reimburse
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Reimbursement > List Reimbursement
    Then claims without score should display "-" in "Claim Score" column

  @AC-1 @api
  Scenario: TC05 - API response menyertakan field claim_score untuk View List Reimburse
    Given user has valid authentication token for "admin"
    When user sends GET request to "/api/Reimbursement/V2/GetReimburse" with params:
      | param       | value        |
      | page        | 1            |
      | size        | 10           |
      | rangeType   | receive_date |
      | claimStatus | 1199         |
      | productCode | IDM          |
      | isJetrules  | false        |
      | is3307      | false        |
    Then response status should be 200
    And response body items should contain field "claim_score"
    And field "claim_score" should be integer or null

  # ============================================================
  # AC-2: Kolom Claim Score di Pending Eclaim (Role Admin)
  # ============================================================

  @AC-2 @smoke
  Scenario: TC06 - Kolom Claim Score tampil di halaman Pending Eclaim
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Pending Eclaim page
    Then claim list table should be displayed
    And table header should contain column "Claim Score"

  @AC-2
  Scenario: TC07 - Posisi kolom Claim Score setelah Receive Date di Pending Eclaim
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Pending Eclaim page
    Then column "Claim Score" should be positioned after column "Receive Date"

  @AC-2 @AC-5 @AC-6
  Scenario: TC08 - Nilai Claim Score dan null handling di Pending Eclaim
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Pending Eclaim page
    Then claims with score should display integer value in "Claim Score" column
    And claims without score should display "-" in "Claim Score" column

  @AC-2 @api
  Scenario: TC09 - API response menyertakan field claim_score untuk Pending Eclaim
    Given user has valid authentication token for "admin"
    When user sends GET request to "/api/Reimbursement/V2/GetReimburse" with params:
      | param       | value |
      | page        | 1     |
      | size        | 10    |
      | claimStatus | 3307  |
      | is3307      | true  |
      | productCode | IDM   |
    Then response status should be 200
    And response body items should contain field "claim_score"
    And field "claim_score" should be integer or null

  # ============================================================
  # AC-3: Kolom Claim Score di Follow Up Pending Claim (Role Admin)
  # ============================================================

  @AC-3 @smoke
  Scenario: TC10 - Kolom Claim Score tampil di halaman Follow Up Pending Claim
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Follow Up Pending Claim page
    Then claim list table should be displayed
    And table header should contain column "Claim Score"

  @AC-3
  Scenario: TC11 - Posisi kolom Claim Score setelah Status di Follow Up Pending Claim
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Follow Up Pending Claim page
    Then column "Claim Score" should be positioned after column "Status"

  @AC-3 @AC-5 @AC-6
  Scenario: TC12 - Nilai Claim Score dan null handling di Follow Up Pending Claim
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Follow Up Pending Claim page
    Then claims with score should display integer value in "Claim Score" column
    And claims without score should display "-" in "Claim Score" column

  @AC-3 @api
  Scenario: TC13 - API response menyertakan field claim_score untuk Follow Up Pending Claim
    Given user has valid authentication token for "admin"
    When user sends GET request to "/api/Claim/GetClaimByProvider" with params:
      | param              | value |
      | page               | 1     |
      | size               | 10    |
      | status             | 2205  |
      | status             | 2206  |
      | branchCode         | 1101  |
      | isClaimMigration   | false |
      | useRemarkPending   | true  |
      | productCode        | IDM   |
    Then response status should be 200
    And response body items should contain field "claim_score"
    And field "claim_score" should be integer or null

  # ============================================================
  # AC-4: Kolom Claim Score di List Claim Module Adjustment
  # ============================================================

  @AC-4 @smoke
  Scenario: TC14 - Kolom Claim Score tampil di List Claim Module Adjustment (Verifikator)
    Given user is on login page
    When user logs in as "verifikator"
    And user navigates to Claim > Claims > List
    And user filters Register with status "5003" or "5004"
    Then claim list table should be displayed
    And table header should contain column "Claim Score"

  @AC-4
  Scenario: TC15 - Posisi kolom Claim Score sebelum Provider Name di Module Adjustment
    Given user is on login page
    When user logs in as "verifikator"
    And user navigates to Claim > Claims > List
    And user filters Register with status "5003" or "5004"
    Then column "Claim Score" should be positioned before column "Provider Name"

  @AC-4 @AC-5 @AC-6
  Scenario: TC16 - Nilai Claim Score dan null handling di Module Adjustment
    Given user is on login page
    When user logs in as "verifikator"
    And user navigates to Claim > Claims > List
    And user filters Register with status "5003" or "5004"
    Then claims with score should display integer value in "Claim Score" column
    And claims without score should display "-" in "Claim Score" column

  @AC-4
  Scenario: TC17 - Kolom Claim Score tampil untuk role SPV di Module Adjustment
    Given user is on login page
    When user logs in as "spv"
    And user navigates to Claim > Claims > List
    And user filters Register with status "5003" or "5004"
    Then table header should contain column "Claim Score"

  @AC-4
  Scenario: TC18 - Kolom Claim Score tampil untuk role Kanit Klaim di Module Adjustment
    Given user is on login page
    When user logs in as "kanit_klaim"
    And user navigates to Claim > Claims > List
    And user filters Register with status "5003" or "5004"
    Then table header should contain column "Claim Score"

  @AC-4
  Scenario: TC19 - Kolom Claim Score tampil untuk role Staff HO dan Kadep Klaim di Module Adjustment
    Given user is on login page
    When user logs in as "staff_ho"
    And user navigates to Claim > Claims > List
    And user filters Register with status "5003" or "5004"
    Then table header should contain column "Claim Score"

  @AC-4 @api
  Scenario: TC20 - API response menyertakan field claim_score untuk Module Adjustment
    Given user has valid authentication token for "verifikator"
    When user sends GET request to "/api/Claim/V3/GetClaimByProvider" with params:
      | param            | value            |
      | page             | 1                |
      | size             | 10               |
      | registerNo       | 1101R072600042   |
      | useRemarkPending | true             |
    Then response status should be 200
    And response body items should contain field "claim_score"
    And field "claim_score" should be integer or null

  # ============================================================
  # AC-5 & AC-6: Score display & null handling
  # ============================================================

  @AC-5
  Scenario: TC21 - Score ditampilkan sebagai angka final tanpa breakdown
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Reimbursement > List Reimbursement
    Then "Claim Score" column should display only a single integer value
    And "Claim Score" column should not display breakdown of TKP, Facility, or Transaction

  @AC-5 @boundary
  Scenario: TC22 - Score 0 ditampilkan sebagai angka bukan dash
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Reimbursement > List Reimbursement
    And there is a claim with claim_score equal to 0
    Then that claim should display "0" in "Claim Score" column
    And that claim should NOT display "-" in "Claim Score" column

  @AC-5 @boundary
  Scenario: TC23 - Score tinggi ditampilkan lengkap tanpa truncation
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Reimbursement > List Reimbursement
    And there is a claim with claim_score value of 3 or more digits
    Then the full score value should be displayed without truncation
    And table layout should remain intact

  @AC-6 @consistency
  Scenario: TC24 - Null handling konsisten menampilkan dash di semua halaman
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Reimbursement > List Reimbursement
    Then claims without score should display "-" in "Claim Score" column
    When user navigates to Pending Eclaim page
    Then claims without score should display "-" in "Claim Score" column
    When user navigates to Follow Up Pending Claim page
    Then claims without score should display "-" in "Claim Score" column
    When user logs out
    And user logs in as "verifikator"
    And user navigates to Claim > Claims > List
    And user filters Register with status "5003" or "5004"
    Then claims without score should display "-" in "Claim Score" column

  # ============================================================
  # AC-7: Score bersifat read-only
  # ============================================================

  @AC-7
  Scenario: TC25 - Kolom Claim Score bersifat read-only tidak bisa diedit
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Reimbursement > List Reimbursement
    And user clicks on a "Claim Score" cell
    Then no input field should appear
    And no dropdown should appear
    And no edit modal should appear
    And cursor should not change to text editing cursor

  @AC-7 @negative
  Scenario: TC26 - Tidak ada icon edit pada kolom Claim Score
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Reimbursement > List Reimbursement
    Then "Claim Score" column should not contain any edit icon
    And "Claim Score" column should not contain any clickable link
    And "Claim Score" column should not contain any action button

  # ============================================================
  # Edge Cases & Negative Scenarios
  # ============================================================

  @edge-case
  Scenario: TC27 - Kolom Claim Score tetap tampil meskipun semua klaim belum memiliki score
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Reimbursement > List Reimbursement
    And all claims on current page have null score
    Then table header should still contain column "Claim Score"
    And all rows should display "-" in "Claim Score" column

  @edge-case
  Scenario: TC28 - Score konsisten saat berpindah halaman pagination
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Reimbursement > List Reimbursement
    Then "Claim Score" column should display correct values on page 1
    When user navigates to page 2
    Then "Claim Score" column should display correct values on page 2
    And scores should correspond to their respective claims

  @edge-case
  Scenario: TC29 - Kolom Claim Score tetap tampil dan akurat setelah filter diterapkan
    Given user is on login page
    When user logs in as "admin"
    And user navigates to Reimbursement > List Reimbursement
    And user applies a filter on the claim list
    Then table header should still contain column "Claim Score"
    And "Claim Score" values should be accurate for filtered results

  @AC-4 @edge-case
  Scenario: TC30 - Claim Score tampil pada klaim status 5003 di Module Adjustment
    Given user is on login page
    When user logs in as "verifikator"
    And user navigates to Claim > Claims > List
    And user filters Register with status "5003"
    Then claim list table should be displayed
    And table header should contain column "Claim Score"
    And claims should display their respective score values

  @AC-4 @edge-case
  Scenario: TC31 - Claim Score tampil pada klaim status 5004 di Module Adjustment
    Given user is on login page
    When user logs in as "verifikator"
    And user navigates to Claim > Claims > List
    And user filters Register with status "5004"
    Then claim list table should be displayed
    And table header should contain column "Claim Score"
    And claims should display their respective score values

  @AC-6 @api @edge-case
  Scenario: TC32 - API return null saat tidak ada record claim_extend
    Given user has valid authentication token for "admin"
    And there is a claim without record in transactions.claim_extend
    When user sends GET request to corresponding endpoint
    Then response should contain that claim with claim_score as null
    And claim_score should not be 0 or empty string

  @performance @api
  Scenario: TC33 - Response time API tetap acceptable setelah penambahan LEFT JOIN
    Given user has valid authentication token for "admin"
    When user sends GET request to "/api/Reimbursement/V2/GetReimburse" with is3307=false
    Then response time should be less than 3000 milliseconds
    When user sends GET request to "/api/Reimbursement/V2/GetReimburse" with is3307=true
    Then response time should be less than 3000 milliseconds
    When user sends GET request to "/api/Claim/GetClaimByProvider"
    Then response time should be less than 3000 milliseconds
    When user sends GET request to "/api/Claim/V3/GetClaimByProvider"
    Then response time should be less than 3000 milliseconds

  @negative
  Scenario: TC34 - Claim Score tidak muncul di halaman yang tidak termasuk scope
    Given user is on login page
    When user logs in as "admin"
    And user navigates to a claim list page outside of scope
    Then table header should NOT contain column "Claim Score"
```

---

## Coverage Summary

| AC# | Description | Positive | Negative | Boundary | Total |
|-----|-------------|----------|----------|----------|-------|
| AC-1 | Claim Score di View List Reimburse | 4 | 0 | 0 | 4 |
| AC-2 | Claim Score di Pending Eclaim | 3 | 0 | 0 | 3 |
| AC-3 | Claim Score di Follow Up Pending Claim | 3 | 0 | 0 | 3 |
| AC-4 | Claim Score di Module Adjustment | 6 | 0 | 0 | 6 |
| AC-5 | Score sebagai angka final | 2 | 0 | 2 | 4 |
| AC-6 | Null handling (dash) | 1 | 0 | 0 | 1 |
| AC-7 | Read-only | 1 | 1 | 0 | 2 |
| Edge Cases | Pagination, filter, performance, boundary | 6 | 2 | 0 | 8 |
| API Tests | Validasi response body 4 endpoint | 4 (included above) | 0 | 0 | - |
| **Total** | | **26** | **3** | **2** | **34** |

> Note: Beberapa TC cover multiple AC (misal TC03 cover AC-1 + AC-5, TC04 cover AC-1 + AC-6)

---

## Feature File Mapping

| TC Range | Feature File | Scenario Tags |
|----------|-------------|---------------|
| TC01–TC05 | `src/features/claimScore/viewListReimburse.feature` | `@NM-1447 @AC-1` |
| TC06–TC09 | `src/features/claimScore/pendingEclaim.feature` | `@NM-1447 @AC-2` |
| TC10–TC13 | `src/features/claimScore/followUpPendingClaim.feature` | `@NM-1447 @AC-3` |
| TC14–TC20 | `src/features/claimScore/listClaimAdjustment.feature` | `@NM-1447 @AC-4` |
| TC21–TC24 | `src/features/claimScore/scoreDisplay.feature` | `@NM-1447 @AC-5 @AC-6` |
| TC25–TC26 | `src/features/claimScore/scoreReadOnly.feature` | `@NM-1447 @AC-7` |
| TC27–TC34 | `src/features/claimScore/edgeCases.feature` | `@NM-1447 @edge-case` |

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
| TC27 | | |
| TC28 | | |
| TC29 | | |
| TC30 | | |
| TC31 | | |
| TC32 | | |
| TC33 | | |
| TC34 | | |
