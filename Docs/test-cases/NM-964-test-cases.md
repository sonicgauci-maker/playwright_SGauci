# Test Cases: NM-964 - Integration Balance BU Deposit Excess New Category

## Test Case Information

| Field | Value |
|-------|-------|
| **Application** | New MiCare - Claim (EXSO) |
| **Menu** | Poolfund / Deposit Excess |
| **Jira Reference** | NM-964 |
| **Parent Epic** | NM-961 |
| **Test Design by** | Indra Kurniawan |
| **Test Priority** | High |
| **Application Address** | EXSO |
| **Version** | TC.2026.03 |

---

## Automation Scope

| Flagging | Name | Test Type | Reason |
|----------|------|-----------|--------|
| DE-NEW | Deposit Excess Kategori Baru (Code 12) | **Automated** | Discharge flow within EXSO, DB validation |
| DE-EXIST | Deposit Excess Kategori Existing | **Automated** | Regression, memastikan behavior tidak berubah |
| DE-SPLIT | Split Excess saat melewati limit | **Automated** | Perhitungan split, DB validation |
| DE-MON | Integrasi Monitoring | **Automated** | DB connection read, real-time validation |

### Systems Boundary

```
┌─────────────────────────────────────────────────────────────────────┐
│ AUTOMATED (this repo: inhealth-new-micare-claim-pw)                 │
│                                                                     │
│   EXSO (Claim Module)                                               │
│   ├── Discharge Process                                             │
│   ├── Deposit Excess Calculation (Code 12)                          │
│   ├── Balance BU Integration                                        │
│   ├── Split Mechanism (Excess AR vs Excess Member)                  │
│   └── DB Validation (excess_ar + excess_member fields)              │
│                                                                     │
│   MONITORING (DB Connection)                                        │
│   └── Deposit Ekses Monitoring Dashboard                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ EXTERNAL (separate apps)                                            │
│                                                                     │
│   PLAN SETTING                                                      │
│   ├── Corporate Plan Configuration                                  │
│   ├── Deposit Excess Category Setting                               │
│   └── Limit Setting                                                 │
│        ↓                                                            │
│   Read-only from Claim Module                                       │
│   (managed by other application)                                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Test Cases

### AC-1: Kategori Existing (Tetap Berlaku)

> Regression: Memastikan behavior existing tidak berubah setelah enhancement.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Status | Priority | Notes |
|----|---|---|---|---|---|---|---|---|---|---|
| 1 | Verify perhitungan Excess AR pada kategori existing tetap menggunakan selisih nilai penjaminan | Corporate plan: kategori existing (code != 12), Total Klaim: 5.000.000, Amount Approve: 3.000.000 | Corporate memiliki deposit ekses dengan kategori existing | TC01 - Excess AR kategori existing = selisih | Positive | 1. Setup data klaim dengan corporate plan kategori existing<br>2. Proses discharge klaim<br>3. Query DB: cek field `excess_ar` pada record deposit excess | `excess_ar` = 2.000.000 (Total Klaim - Amount Approve = 5.000.000 - 3.000.000) | | High | Automated, Regression |
| 2 | Verify field excess_member = 0 pada kategori existing | Corporate plan: kategori existing, Total Klaim: 5.000.000, Amount Approve: 3.000.000 | Corporate memiliki deposit ekses dengan kategori existing | TC02 - Excess Member = 0 pada kategori existing | Positive | 1. Setup data klaim dengan corporate plan kategori existing<br>2. Proses discharge klaim<br>3. Query DB: cek field `excess_member` | `excess_member` = 0 (kategori existing tidak menghasilkan excess member dari perhitungan ini) | | High | Automated, Regression |
| 3 | Verify data lama tidak terpengaruh oleh enhancement | Data transaksi historis sebelum enhancement | Terdapat data deposit excess lama di database | TC03 - Data historis tidak berubah | Positive | 1. Catat nilai excess_ar dan excess_member pada data lama sebelum deployment<br>2. Deploy enhancement<br>3. Query DB: bandingkan nilai data lama | Data historis tidak berubah, nilai excess_ar dan excess_member tetap sama | | High | Automated, Regression |

---

### AC-2: Kategori Baru (Code 12)

> Perhitungan: Excess AR = Amount Approve, Excess Peserta = Total Klaim − Amount Approve

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Status | Priority | Notes |
|----|---|---|---|---|---|---|---|---|---|---|
| 4 | Verify Excess AR = Amount Approve pada kategori baru (code 12) | Corporate plan: code 12, Total Klaim: 8.000.000, Amount Approve: 5.000.000 | Corporate memiliki plan deposit ekses dengan kategori = code 12, limit belum tercapai | TC04 - Excess AR = Amount Approve (code 12) | Positive | 1. Setup corporate plan dengan kategori ekses code 12<br>2. Buat klaim dengan Total Klaim 8.000.000 dan Amount Approve 5.000.000<br>3. Proses discharge<br>4. Query DB: cek field `excess_ar` | `excess_ar` = 5.000.000 (= Amount Approve) | | High | Automated |
| 5 | Verify Excess Peserta = Total Klaim − Amount Approve pada kategori baru | Corporate plan: code 12, Total Klaim: 8.000.000, Amount Approve: 5.000.000 | Corporate memiliki plan deposit ekses dengan kategori = code 12 | TC05 - Excess Peserta = selisih (code 12) | Positive | 1. Setup corporate plan dengan kategori ekses code 12<br>2. Buat klaim dengan Total Klaim 8.000.000 dan Amount Approve 5.000.000<br>3. Proses discharge<br>4. Query DB: cek field `excess_member` | `excess_member` = 3.000.000 (Total Klaim - Amount Approve = 8.000.000 - 5.000.000) | | High | Automated |
| 6 | Verify penanda code 12 tersimpan pada transaksi deposit excess | Corporate plan: code 12 | Corporate memiliki plan deposit ekses code 12 | TC06 - Penanda code 12 tersimpan | Positive | 1. Proses discharge klaim dengan corporate plan code 12<br>2. Query DB: cek kolom kategori/code pada record deposit excess | Record memiliki penanda kategori = 12 | | High | Automated |
| 7 | Verify kategori ditentukan otomatis berdasarkan plan corporate | Corporate A: plan code 12, Corporate B: plan existing | Kedua corporate sudah ter-setup di plan setting | TC07 - Auto-assign kategori dari plan | Positive | 1. Discharge klaim Corporate A<br>2. Discharge klaim Corporate B<br>3. Query DB kedua transaksi | Corporate A → code 12, Corporate B → code existing. Tidak ada input manual | | High | Automated |
| 8 | Verify Amount Approve = Total Klaim → Excess Peserta = 0 | Corporate plan: code 12, Total Klaim: 5.000.000, Amount Approve: 5.000.000 | Plan code 12 aktif, limit belum tercapai | TC08 - Excess Peserta = 0 saat approve = klaim | Positive | 1. Buat klaim: Total Klaim = Amount Approve = 5.000.000<br>2. Discharge<br>3. Query DB | `excess_ar` = 5.000.000, `excess_member` = 0 | | Medium | Automated |
| 9 | Verify Amount Approve = 0 → Excess AR = 0, Excess Peserta = Total Klaim | Corporate plan: code 12, Total Klaim: 3.000.000, Amount Approve: 0 | Plan code 12 aktif | TC09 - Amount Approve nol | Positive | 1. Buat klaim: Total Klaim = 3.000.000, Amount Approve = 0<br>2. Discharge<br>3. Query DB | `excess_ar` = 0, `excess_member` = 3.000.000 | | Medium | Automated |

---

### AC-3: Integrasi Balance BU

> Balance BU harus mengakomodasi kedua kategori tanpa double counting atau anomali saldo.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Status | Priority | Notes |
|----|---|---|---|---|---|---|---|---|---|---|
| 10 | Verify Balance BU terakumulasi benar untuk kategori baru | Corporate plan: code 12, 3 transaksi discharge berturut-turut | Plan code 12 aktif, balance awal = 0 | TC10 - Akumulasi Balance BU code 12 | Positive | 1. Discharge klaim-1: Amount Approve = 2.000.000<br>2. Discharge klaim-2: Amount Approve = 3.000.000<br>3. Discharge klaim-3: Amount Approve = 1.500.000<br>4. Query balance BU | Balance BU Excess AR = 6.500.000 (2jt + 3jt + 1.5jt). Tidak ada double counting | | High | Automated |
| 11 | Verify Balance BU konsisten untuk campuran kategori existing dan baru | Corporate A: code 12, Corporate B: existing, masing-masing 1 transaksi | Kedua corporate aktif dalam 1 BU | TC11 - Balance BU mixed category | Positive | 1. Discharge Corp A (code 12): Amount Approve = 4.000.000<br>2. Discharge Corp B (existing): Total 6jt, Approve 4jt → selisih 2jt<br>3. Query total balance BU | Balance BU = 4.000.000 (code 12 AR) + 2.000.000 (existing AR) = 6.000.000 total. Tanpa anomali | | High | Automated |
| 12 | Verify tidak ada double counting saat multiple discharge pada BU yang sama | 5 transaksi discharge pada 1 BU | BU dengan multiple corporate (mix category) | TC12 - No double counting | Positive | 1. Lakukan 5 discharge pada 1 BU (mix code 12 dan existing)<br>2. Hitung manual expected balance<br>3. Query actual balance BU<br>4. Bandingkan | Actual balance = expected balance (sum of excess_ar per transaksi). Tidak ada selisih | | High | Automated |

---

### AC-4: Split Mechanism (Melewati Limit)

> Jika transaksi membuat saldo melewati limit, di-split: sebagian Excess AR (sampai limit), sisanya Excess Member.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Status | Priority | Notes |
|----|---|---|---|---|---|---|---|---|---|---|
| 13 | Verify split saat transaksi melewati limit deposit | Corporate plan: code 12, Limit: 10.000.000, Saldo terpakai: 7.000.000, Amount Approve baru: 5.000.000 | Plan code 12, limit 10jt, saldo sudah 7jt | TC13 - Split excess saat melewati limit | Positive | 1. Setup: limit 10jt, saldo existing 7jt<br>2. Discharge klaim baru: Amount Approve = 5.000.000<br>3. Query DB record terbaru | `excess_ar` = 3.000.000 (sisa limit: 10jt - 7jt), `excess_member` += 2.000.000 (sisa amount: 5jt - 3jt) | | High | Automated |
| 14 | Verify seluruh amount jadi Excess Member saat limit sudah habis | Corporate plan: code 12, Limit: 10.000.000, Saldo terpakai: 10.000.000, Amount Approve baru: 4.000.000 | Plan code 12, limit sudah penuh (10jt/10jt) | TC14 - 100% Excess Member saat limit habis | Positive | 1. Setup: limit 10jt, saldo terpakai 10jt (penuh)<br>2. Discharge klaim: Amount Approve = 4.000.000<br>3. Query DB | `excess_ar` = 0, `excess_member` = Total Klaim (seluruhnya member) | | High | Automated |
| 15 | Verify transaksi tepat di limit (sisa limit = amount) | Corporate plan: code 12, Limit: 10.000.000, Saldo terpakai: 7.000.000, Amount Approve: 3.000.000 | Plan code 12, sisa limit = 3jt, amount = 3jt | TC15 - Tepat di limit, tidak split | Positive | 1. Setup: limit 10jt, saldo 7jt, sisa = 3jt<br>2. Discharge: Amount Approve = 3.000.000<br>3. Query DB | `excess_ar` = 3.000.000 (full amount masuk AR), `excess_member` = 0 (tidak split). Limit penuh setelahnya | | High | Automated |
| 16 | Verify transaksi berikutnya setelah limit penuh otomatis 100% member | Corporate plan: code 12, Limit: 10.000.000, Saldo: 10.000.000 (penuh), Amount Approve: 2.000.000 | Limit sudah penuh dari transaksi sebelumnya | TC16 - Auto Excess Member setelah limit penuh | Positive | 1. Pastikan limit sudah penuh (10jt/10jt)<br>2. Discharge klaim baru: Amount Approve = 2.000.000<br>3. Query DB | `excess_ar` = 0, seluruh excess menjadi member | | High | Automated |
| 17 | Verify limit = 0 dari awal → semua transaksi langsung Excess Member | Corporate plan: code 12, Limit: 0, Amount Approve: 5.000.000 | Plan code 12 dengan limit = 0 | TC17 - Limit nol dari awal | Positive | 1. Setup corporate plan: code 12, limit = 0<br>2. Discharge klaim: Amount Approve = 5.000.000<br>3. Query DB | `excess_ar` = 0, seluruh excess menjadi member sejak transaksi pertama | | Medium | Automated |
| 18 | Verify limit tidak pernah reset (lifetime) | Corporate plan: code 12, Limit: 10.000.000 | Sudah ada transaksi yang mengkonsumsi limit di periode sebelumnya | TC18 - Limit lifetime tidak reset | Positive | 1. Setup: transaksi lama sudah konsumsi 6jt dari limit 10jt<br>2. Masuk periode baru (bulan/tahun baru)<br>3. Discharge klaim baru: Amount Approve = 5.000.000<br>4. Query DB | Split terjadi: `excess_ar` = 4.000.000 (sisa limit), sisanya → member. Limit TIDAK di-reset walau ganti periode | | High | Automated |

---

### AC-5: Konsistensi Data

> Setiap transaksi harus memiliki penanda kategori dan perhitungan mengikuti kategori.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Status | Priority | Notes |
|----|---|---|---|---|---|---|---|---|---|---|
| 19 | Verify setiap record deposit excess memiliki penanda kategori | 5 transaksi campuran (code 12 dan existing) | Multiple discharge sudah dilakukan | TC19 - Penanda kategori wajib ada | Positive | 1. Lakukan 5 discharge (mix corporate)<br>2. Query DB: SELECT semua record deposit excess<br>3. Cek kolom kategori/code | Semua record memiliki penanda kategori (tidak ada NULL atau kosong) | | High | Automated |
| 20 | Verify perhitungan konsisten sesuai penanda kategori | Record code 12 dan record existing | Data sudah tersimpan di DB | TC20 - Konsistensi perhitungan vs penanda | Positive | 1. Query semua record code 12: verify excess_ar = amount_approve<br>2. Query semua record existing: verify excess_ar = selisih<br>3. Cross-check tidak ada inkonsistensi | Semua record code 12: excess_ar = amount_approve. Semua record existing: excess_ar = selisih. Tidak ada mismatch | | High | Automated |

---

### AC-6: Rollback & Error Handling

> Jika gagal baca plan setting, proses discharge di-rollback.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Status | Priority | Notes |
|----|---|---|---|---|---|---|---|---|---|---|
| 21 | Verify discharge rollback saat gagal membaca plan setting | Simulasi timeout/error pada API plan setting | Klaim siap discharge, plan setting service unreachable | TC21 - Rollback saat gagal baca plan | Negative | 1. Setup klaim siap discharge<br>2. Simulasi error pada service plan setting (timeout/down)<br>3. Trigger discharge<br>4. Query DB: cek apakah ada record deposit excess baru | Discharge di-rollback. Tidak ada record deposit excess baru. Klaim status tidak berubah ke discharged | | High | Automated |
| 22 | Verify tidak ada partial data saat rollback | Simulasi error di tengah proses discharge | Klaim siap discharge | TC22 - No partial data on rollback | Negative | 1. Setup klaim siap discharge<br>2. Simulasi error saat proses deposit excess calculation<br>3. Query DB | Tidak ada orphan record. Balance BU tidak berubah. Data konsisten | | High | Automated |

---

### AC-7: Integrasi Deposit Ekses Monitoring

> Data real-time tersedia di dashboard monitoring via DB connection.

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Status | Priority | Notes |
|----|---|---|---|---|---|---|---|---|---|---|
| 23 | Verify data deposit excess code 12 tersedia real-time di monitoring DB | Corporate plan: code 12, Discharge baru dilakukan | Dashboard monitoring terhubung ke DB yang sama | TC23 - Data real-time di monitoring | Positive | 1. Discharge klaim (code 12)<br>2. Langsung query monitoring DB/table<br>3. Cek data terbaru | Record deposit excess terbaru langsung tersedia (real-time) dengan field excess_ar dan excess_member yang benar | | High | Automated |
| 24 | Verify data split tampil terpisah di monitoring (excess_ar dan excess_member) | Transaksi yang di-split | Transaksi sudah di-split karena melewati limit | TC24 - Data split terpisah di monitoring | Positive | 1. Lakukan discharge yang menyebabkan split<br>2. Query monitoring DB<br>3. Cek kedua field | Record menampilkan `excess_ar` dan `excess_member` sebagai 2 field terpisah dengan nilai yang benar | | Medium | Automated |

---

### Edge Cases

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Status | Priority | Notes |
|----|---|---|---|---|---|---|---|---|---|---|
| 25 | Verify corporate tanpa setting deposit ekses → fallback ke existing | Corporate tanpa plan deposit ekses | Corporate plan tidak memiliki setting deposit excess | TC25 - Fallback tanpa setting deposit | Positive | 1. Setup corporate tanpa setting deposit ekses<br>2. Discharge klaim<br>3. Query DB | Transaksi mengikuti behavior existing (atau tidak membuat record deposit excess) | | Medium | Automated |
| 26 | Verify plan corporate berubah di tengah periode | Corporate: awalnya existing, lalu diubah ke code 12 | 2 transaksi: 1 sebelum perubahan, 1 sesudah | TC26 - Plan change mid-period | Positive | 1. Discharge klaim-1 (plan existing) → verify record existing<br>2. Ubah plan ke code 12<br>3. Discharge klaim-2 → verify record code 12<br>4. Cek klaim-1 tetap existing | Klaim-1 tetap existing, klaim-2 masuk code 12. Data lama tidak berubah | | Medium | Automated |
| 27 | Verify concurrent discharge pada BU yang sama tidak menyebabkan over-allocate limit | 2 klaim discharge bersamaan, sisa limit 5jt, masing-masing Amount Approve 4jt | Plan code 12, limit 10jt, saldo 5jt, sisa = 5jt | TC27 - Concurrent discharge race condition | Negative | 1. Setup: sisa limit = 5jt<br>2. Trigger 2 discharge bersamaan (masing-masing 4jt)<br>3. Query DB: total excess_ar kedua transaksi | Total excess_ar <= 5.000.000 (sisa limit). Tidak boleh over-allocate. Salah satu atau kedua transaksi harus di-split | | High | Automated |
| 28 | Verify void/reversal klaim setelah split → balance rollback benar | Klaim yang sudah di-split (excess_ar: 3jt, excess_member: 2jt) | Transaksi sudah tersimpan dan balance sudah terakumulasi | TC28 - Void setelah split | Positive | 1. Catat balance BU sebelum void<br>2. Void klaim yang sudah di-split<br>3. Query balance BU setelah void | Balance BU berkurang sesuai excess_ar yang di-void. Data konsisten | | Medium | Automated |
| 29 | Verify Amount Approve > Total Klaim di-handle dengan benar | Corporate plan: code 12, Total Klaim: 3.000.000, Amount Approve: 5.000.000 | Plan code 12 aktif | TC29 - Amount Approve > Total Klaim (invalid) | Negative | 1. Attempt discharge dengan Amount Approve > Total Klaim<br>2. Cek response/behavior sistem | Sistem reject atau handle gracefully (validasi error). Tidak menghasilkan excess_member negatif | | Medium | Automated |
| 30 | Verify transaksi dengan nilai sangat besar (boundary test) | Corporate plan: code 12, Total Klaim: 999.999.999.999, Amount Approve: 500.000.000.000 | Plan code 12 aktif | TC30 - Large value boundary | Positive | 1. Discharge dengan nilai sangat besar<br>2. Query DB<br>3. Verify perhitungan | Perhitungan tetap akurat tanpa overflow atau truncation | | Low | Automated |

---

## Coverage Summary

| Acceptance Criteria | TC Count | Type |
|-----|-----------|---------|
| AC-1: Kategori Existing (Regression) | 3 (TC01-TC03) | Positive |
| AC-2: Kategori Baru (Code 12) | 6 (TC04-TC09) | Positive |
| AC-3: Integrasi Balance BU | 3 (TC10-TC12) | Positive |
| AC-4: Split Mechanism (Limit) | 6 (TC13-TC18) | Positive |
| AC-5: Konsistensi Data | 2 (TC19-TC20) | Positive |
| AC-6: Rollback & Error Handling | 2 (TC21-TC22) | Negative |
| AC-7: Integrasi Monitoring | 2 (TC23-TC24) | Positive |
| Edge Cases | 6 (TC25-TC30) | Mixed |
| **Total** | **30** | |

---

## Feature File Mapping

| TC Range | Feature Scenario | Tag |
|----------|---|---|
| TC01-TC03 | Deposit Excess kategori existing (regression) | `@AC-1 @regression @deposit-excess` |
| TC04-TC09 | Deposit Excess kategori baru code 12 | `@AC-2 @code-12 @deposit-excess` |
| TC10-TC12 | Balance BU integration | `@AC-3 @balance-bu` |
| TC13-TC18 | Split mechanism saat melewati limit | `@AC-4 @split @limit` |
| TC19-TC20 | Konsistensi data dan penanda kategori | `@AC-5 @data-consistency` |
| TC21-TC22 | Rollback dan error handling | `@AC-6 @rollback @negative` |
| TC23-TC24 | Integrasi monitoring real-time | `@AC-7 @monitoring` |
| TC25-TC30 | Edge cases | `@edge-case` |

**Feature File:** `src/features/deposit-excess/integrationBalanceBUDepositExcess.feature`

---

## Sign-off

| Role | Name | Signature |
|------|------|-----------|
| Developer | | |
| Tester | Indra Kurniawan | |
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
