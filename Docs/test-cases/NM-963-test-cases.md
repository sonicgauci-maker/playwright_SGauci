# Test Cases: NM-963 - Integration Balance BU Poolfund Plan

## Test Case Information

| Field | Value |
|-------|-------|
| **Application** | New MiCare - Claim |
| **Menu** | Discharge Process (Klaim, Provider Portal, HCCM) |
| **Jira Reference** | NM-963 |
| **Parent Epic** | NM-961 |
| **Test Design by** | QA Team |
| **Test Priority** | High |
| **Application Address** | https://development.inhealth.co.id/newmicare |
| **Version** | TC.2026.07 |
| **Sprint** | Claim Operation Sprint 26 |

---

## Test Scope

| Scope Item | Detail |
|------------|--------|
| **In-Scope** | Integrasi balance poolfund dari Klaim, Provider Portal, HCCM via service EXSO |
| **In-Scope** | Validasi konsistensi balance setelah transaksi multi-app |
| **In-Scope** | Validasi error handling saat anomali balance |
| **In-Scope** | Validasi setting poolfund plan (YES/NO) |
| **Out-of-Scope** | Logic perhitungan detail level (sudah di-cover NM-960) |
| **Out-of-Scope** | Pembuatan API service EXSO (scope dev, bukan QA functional) |
| **Out-of-Scope** | Performance/load testing concurrent transactions |

---

## Test Cases

### AC-1: Transaksi Poolfund Mengurangi Balance di Level BU Secara Konsisten

> Validasi: Setiap transaksi yang mengandung poolfund dari aplikasi manapun (Klaim, Provider Portal, HCCM) harus mengurangi balance poolfund di level BU secara konsisten.

#### SC-1: Discharge dari Aplikasi Klaim — Balance Poolfund Berkurang

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Priority |
|----|---|---|---|---|---|---|---|---|
| 1 | Verify discharge claim dengan poolfund mengurangi balance BU | BU: BU-TEST-001, Plan: PLAN-A, Balance Poolfund awal: 50.000.000, Total Amount Approved: 5.000.000 | BU memiliki setting poolfund = YES di AKTUW. Member aktif dengan plan yang memiliki poolfund | TC01 - Klaim discharge mengurangi balance poolfund | Positive | 1. Login ke aplikasi Klaim<br>2. Cek balance poolfund awal BU (50jt)<br>3. Proses discharge claim dengan total approved = 5.000.000<br>4. Verify proses discharge berhasil<br>5. Cek balance poolfund BU setelah discharge | Balance poolfund BU = 45.000.000 (50jt - 5jt). Poolfund amount pada claim = 5.000.000 | High |
| 2 | Verify multiple discharge claim sequential mengurangi balance ongoing | BU: BU-TEST-001, Balance awal: 50.000.000, Claim A: approved 5jt, Claim B: approved 3jt, Claim C: approved 7jt | BU poolfund = YES. Balance penuh | TC02 - Multiple klaim sequential balance ongoing | Positive | 1. Discharge Claim A (approved 5jt) → cek balance<br>2. Discharge Claim B (approved 3jt) → cek balance<br>3. Discharge Claim C (approved 7jt) → cek balance | Setelah A: balance = 45jt. Setelah B: balance = 42jt. Setelah C: balance = 35jt. Balance konsisten berkurang sequential | High |
| 3 | Verify balance poolfund level Plan juga berkurang sesuai | BU: BU-TEST-001, Plan: PLAN-A, Balance Poolfund Plan: 20.000.000, Approved: 4.000.000 | Setting poolfund di level Plan | TC03 - Balance Plan berkurang konsisten | Positive | 1. Cek balance poolfund level Plan (20jt)<br>2. Discharge claim dari Plan tersebut, approved = 4jt<br>3. Cek balance poolfund level Plan setelah discharge | Balance Plan = 16.000.000. Balance BU juga berkurang 4jt | High |

---

#### SC-2: Discharge dari Provider Portal — Balance Poolfund Berkurang

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Priority |
|----|---|---|---|---|---|---|---|---|
| 4 | Verify discharge dari Provider Portal mengurangi balance poolfund BU | BU: BU-TEST-001, Balance Poolfund awal: 45.000.000, Total Amount Approved (Provider): 6.000.000 | BU poolfund = YES. Provider Portal sudah terintegrasi service EXSO. Member aktif | TC04 - Provider discharge mengurangi balance poolfund | Positive | 1. Login ke Provider Portal<br>2. Cek balance poolfund awal BU (45jt)<br>3. Proses discharge dari Provider Portal, approved = 6jt<br>4. Verify discharge berhasil<br>5. Cek balance poolfund BU | Balance poolfund BU = 39.000.000 (45jt - 6jt). Poolfund tercatat dari source = Provider Portal | High |
| 5 | Verify balance poolfund konsisten antara view di Klaim dan Provider Portal | BU: BU-TEST-001, Balance setelah Provider discharge: 39.000.000 | Discharge dari Provider Portal sudah berhasil | TC05 - Konsistensi balance antar aplikasi (Provider → Klaim) | Positive | 1. Setelah discharge di Provider Portal<br>2. Login ke aplikasi Klaim<br>3. Cek balance poolfund BU yang sama | Balance poolfund di Klaim = 39.000.000 (sama dengan setelah Provider discharge). Tidak ada selisih | High |

---

#### SC-3: Discharge dari HCCM — Balance Poolfund Berkurang

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Priority |
|----|---|---|---|---|---|---|---|---|
| 6 | Verify transaksi dari HCCM mengurangi balance poolfund BU | BU: BU-TEST-001, Balance Poolfund awal: 39.000.000, Total Amount Approved (HCCM): 4.500.000 | BU poolfund = YES. HCCM sudah terintegrasi service EXSO | TC06 - HCCM transaksi mengurangi balance poolfund | Positive | 1. Login ke HCCM<br>2. Cek balance poolfund awal BU (39jt)<br>3. Proses transaksi yang mengandung poolfund, approved = 4.5jt<br>4. Verify transaksi berhasil<br>5. Cek balance poolfund BU | Balance poolfund BU = 34.500.000 (39jt - 4.5jt) | High |
| 7 | Verify balance poolfund konsisten setelah transaksi HCCM dilihat dari Klaim dan Provider | BU: BU-TEST-001, Balance setelah HCCM: 34.500.000 | Transaksi HCCM sudah berhasil | TC07 - Konsistensi balance antar 3 aplikasi | Positive | 1. Setelah transaksi di HCCM<br>2. Login ke Klaim → cek balance BU<br>3. Login ke Provider Portal → cek balance BU | Balance di semua aplikasi = 34.500.000. Konsisten di semua channel | High |

---

#### SC-4: Cross-Application Sequential — Balance Konsisten Antar Aplikasi

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Priority |
|----|---|---|---|---|---|---|---|---|
| 8 | Verify balance ongoing: Klaim → Provider → HCCM sequential | BU: BU-TEST-001, Balance awal: 50.000.000. Klaim: 5jt, Provider: 6jt, HCCM: 4.5jt | BU poolfund = YES. Semua app terintegrasi | TC08 - E2E sequential cross-app balance | Positive | 1. Balance awal = 50jt<br>2. Discharge di Klaim (5jt) → balance = 45jt<br>3. Discharge di Provider (6jt) → balance = 39jt<br>4. Transaksi di HCCM (4.5jt) → balance = 34.5jt<br>5. Verify balance final di semua app | Balance final = 34.500.000 di semua aplikasi. Total terpotong = 15.5jt. Tidak ada selisih | High |
| 9 | Verify balance ongoing antar member berbeda dalam 1 BU | BU: BU-TEST-001, Balance: 50jt. Member A (Klaim): 10jt, Member B (Provider): 8jt | Shared poolfund per BU | TC09 - Shared poolfund antar member | Positive | 1. Member A discharge via Klaim (10jt) → balance = 40jt<br>2. Member B discharge via Provider (8jt) → balance = 32jt<br>3. Verify balance | Balance = 32.000.000. Poolfund shared: member A dan B dari pool yang sama | High |
| 10 | Verify balance partial saat poolfund tidak cukup setelah cross-app transactions | BU: BU-TEST-001, Balance: 10jt. Klaim: 7jt, Provider: 5jt | Balance < total semua claim | TC10 - Poolfund partial cross-app | Positive | 1. Discharge Klaim (approved 7jt, poolfund = 7jt) → sisa = 3jt<br>2. Discharge Provider (approved 5jt, poolfund available = 3jt)<br>3. Verify | Klaim: poolfund = 7jt, sisa = 3jt. Provider: poolfund = 3jt (partial), sisa 2jt ke Deposit/Excess. Balance final = 0 | High |

---

#### SC-5: Setting Poolfund Plan — Konfigurasi AKTUW

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Priority |
|----|---|---|---|---|---|---|---|---|
| 11 | Verify BU dengan setting poolfund = YES — proses poolfund berjalan | BU: BU-POOL-YES, Setting AKTUW: is_poolfund = YES, Balance: 30.000.000, Approved: 5jt | Konfigurasi di AKTUW sudah di-set | TC11 - Setting poolfund YES → proses berjalan | Positive | 1. Verify setting BU di AKTUW (is_poolfund = YES)<br>2. Discharge claim dengan approved 5jt<br>3. Cek poolfund amount dan balance | Poolfund amount = 5jt. Balance berkurang jadi 25jt. Proses berjalan normal | High |
| 12 | Verify BU dengan setting poolfund = NO — skip perhitungan poolfund | BU: BU-POOL-NO, Setting AKTUW: is_poolfund = NO, Approved: 5jt | BU tanpa poolfund | TC12 - Setting poolfund NO → skip proses | Positive | 1. Verify setting BU di AKTUW (is_poolfund = NO)<br>2. Discharge claim dengan approved 5jt<br>3. Cek hasil perhitungan | Poolfund amount = 0. Tidak ada pengurangan balance poolfund. Claim diproses dengan plafon biasa (non-poolfund flow) | High |
| 13 | Verify setting poolfund NO di Provider Portal — transaksi tetap berhasil tanpa poolfund | BU: BU-POOL-NO, Approved (Provider): 3jt | BU tanpa poolfund, Provider Portal | TC13 - Provider: setting NO → skip poolfund | Positive | 1. Login Provider Portal<br>2. Discharge untuk BU yang is_poolfund = NO<br>3. Verify hasil | Discharge berhasil. Poolfund = 0. Balance poolfund tidak terpengaruh. Pembayaran dari plafon biasa | High |
| 14 | Verify setting poolfund NO di HCCM — transaksi tanpa perhitungan poolfund | BU: BU-POOL-NO, Approved (HCCM): 4jt | BU tanpa poolfund, HCCM | TC14 - HCCM: setting NO → skip poolfund | Positive | 1. Login HCCM<br>2. Proses transaksi untuk BU is_poolfund = NO<br>3. Verify | Transaksi berhasil tanpa poolfund. Balance poolfund tidak berubah | High |

---

### AC-2: Validasi Anomali Balance — Error Handling & Proteksi Deposit

> Validasi: Sistem menampilkan error dan tidak memotong deposit jika terjadi ketidaksesuaian antara jumlah transaksional dengan saldo poolfund.

#### SC-6: Deteksi Anomali dan Error Handling

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Priority |
|----|---|---|---|---|---|---|---|---|
| 15 | Verify error ditampilkan saat terjadi ketidaksesuaian balance | BU: BU-TEST-001, Skenario: balance di DB tidak match dengan kalkulasi service | Simulasi data anomali (balance manual di-adjust untuk mismatch) | TC15 - Error saat anomali balance terdeteksi | Negative | 1. Setup: create kondisi dimana balance poolfund tidak sinkron<br>2. Proses discharge claim<br>3. Observe behavior sistem | Sistem menampilkan pesan error. Transaksi tidak diproses/ditolak. User diberi informasi ketidaksesuaian | High |
| 16 | Verify deposit TIDAK terpotong saat anomali terdeteksi | BU: BU-TEST-001, Deposit awal: 80.000.000, Anomali balance terdeteksi | Kondisi anomali balance aktif | TC16 - Deposit tidak terpotong saat anomali | Negative | 1. Catat balance deposit awal (80jt)<br>2. Trigger transaksi yang menyebabkan deteksi anomali<br>3. Cek balance deposit setelah error | Deposit tetap = 80.000.000. Tidak ada pengurangan deposit. Error ditampilkan | High |
| 17 | Verify transaksi ditolak (tidak diproses) saat anomali | BU: BU-TEST-001, Amount claim: 5jt, Anomali balance | Anomali terdeteksi | TC17 - Transaksi ditolak saat anomali | Negative | 1. Trigger discharge saat kondisi anomali<br>2. Observe response sistem<br>3. Cek status claim | Claim tidak ter-discharge. Status claim tidak berubah. Error message ditampilkan ke user | High |
| 18 | Verify anomali di Provider Portal — error dan deposit aman | BU: BU-TEST-001, Deposit: 80jt, Provider discharge saat anomali | Anomali balance, via Provider Portal | TC18 - Provider: error saat anomali, deposit aman | Negative | 1. Login Provider Portal<br>2. Discharge saat kondisi anomali balance<br>3. Cek error dan deposit | Error ditampilkan. Deposit = 80jt (tidak berubah). Transaksi ditolak | High |
| 19 | Verify anomali di HCCM — error dan deposit aman | BU: BU-TEST-001, Deposit: 80jt, HCCM transaksi saat anomali | Anomali balance, via HCCM | TC19 - HCCM: error saat anomali, deposit aman | Negative | 1. Login HCCM<br>2. Proses transaksi saat kondisi anomali<br>3. Cek error dan deposit | Error ditampilkan. Deposit = 80jt (tidak berubah). Transaksi ditolak | High |

---

#### SC-7: Balance Poolfund = 0 — Behavior Saat Habis

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Priority |
|----|---|---|---|---|---|---|---|---|
| 20 | Verify discharge saat poolfund = 0 — seluruh amount jadi excess (Klaim) | BU: BU-TEST-001, Balance Poolfund: 0, Amount Approved: 5jt | Poolfund sudah habis dari transaksi sebelumnya | TC20 - Klaim: poolfund = 0, full excess | Positive | 1. Verify balance poolfund = 0<br>2. Discharge claim (approved 5jt)<br>3. Cek distribusi pembayaran | Poolfund amount = 0. Seluruh 5jt ke Deposit (jika Allow Deposit = TRUE) atau Excess Member. Balance tetap 0 | High |
| 21 | Verify discharge saat poolfund = 0 dari Provider Portal | BU: BU-TEST-001, Balance Poolfund: 0, Amount Approved (Provider): 3jt | Poolfund habis | TC21 - Provider: poolfund = 0, full excess | Positive | 1. Login Provider Portal<br>2. Discharge (approved 3jt) saat poolfund = 0<br>3. Cek distribusi | Poolfund amount = 0. Amount didistribusikan ke Deposit/Excess sesuai logic NM-960. Balance tetap 0 | High |
| 22 | Verify discharge saat poolfund = 0 dari HCCM | BU: BU-TEST-001, Balance Poolfund: 0, Amount Approved (HCCM): 4jt | Poolfund habis | TC22 - HCCM: poolfund = 0, full excess | Positive | 1. Login HCCM<br>2. Transaksi (approved 4jt) saat poolfund = 0<br>3. Cek distribusi | Poolfund amount = 0. Amount ke Deposit/Excess. Balance tetap 0 | High |

---

#### SC-8: Poolfund Partial — Balance Kurang dari Amount Approved

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Priority |
|----|---|---|---|---|---|---|---|---|
| 23 | Verify poolfund partial dari Klaim — sisa ke Deposit/Excess | BU: BU-TEST-001, Balance Poolfund: 3.000.000, Amount Approved: 8.000.000, Deposit: 80jt | Balance < approved | TC23 - Klaim: poolfund partial | Positive | 1. Balance poolfund = 3jt<br>2. Discharge claim approved 8jt<br>3. Cek distribusi header | Poolfund = 3jt (habis), sisa 5jt ke Deposit (jika Allow Deposit = TRUE). Balance poolfund = 0 | High |
| 24 | Verify poolfund partial dari Provider — sisa ke Deposit/Excess | BU: BU-TEST-001, Balance Poolfund: 2.000.000, Amount Approved: 6.000.000, Deposit: 80jt | Balance < approved, Provider Portal | TC24 - Provider: poolfund partial | Positive | 1. Login Provider Portal<br>2. Balance poolfund = 2jt<br>3. Discharge approved 6jt<br>4. Cek distribusi | Poolfund = 2jt (habis), sisa 4jt ke Deposit. Balance = 0 | High |
| 25 | Verify poolfund partial dari HCCM — sisa ke Deposit/Excess | BU: BU-TEST-001, Balance Poolfund: 1.500.000, Amount Approved: 5.000.000, Deposit: 80jt | Balance < approved, HCCM | TC25 - HCCM: poolfund partial | Positive | 1. Login HCCM<br>2. Balance poolfund = 1.5jt<br>3. Transaksi approved 5jt<br>4. Cek distribusi | Poolfund = 1.5jt (habis), sisa 3.5jt ke Deposit. Balance = 0 | High |

---

### AC-3: Perubahan Hanya pada Integrasi Poolfund — Logic Existing Tidak Terpengaruh

> Validasi: Perubahan hanya pada integrasi dan perhitungan balance poolfund. Logic existing yang tidak terkait poolfund tidak terpengaruh.

#### SC-9: Regression — Transaksi Non-Poolfund Tidak Terdampak

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Priority |
|----|---|---|---|---|---|---|---|---|
| 26 | Verify discharge claim tanpa poolfund (BU non-poolfund) tetap berjalan normal | BU: BU-NO-POOL, is_poolfund = NO, Plafon: 10jt, Amount Claim: 3jt | BU tanpa poolfund | TC26 - Regression: non-poolfund claim normal | Positive | 1. Setup BU tanpa poolfund<br>2. Discharge claim (approved 3jt)<br>3. Verify hasil perhitungan | Claim diproses normal. Amount approved dari plafon biasa = 3jt. Tidak ada error. Tidak ada interaksi dengan service poolfund | High |
| 27 | Verify logic plafon dan sub-benefit tidak berubah setelah enhancement | BU: BU-TEST-001, Plafon RJ: 10jt, Sub Benefit RJ03: 4jt, Claim: 3jt | BU dengan poolfund, test logic plafon | TC27 - Regression: plafon & sub-benefit logic intact | Positive | 1. Discharge claim dengan detail sub benefit<br>2. Verify: Amount Approve = MIN(Claim, Limit Sub Benefit, Balance Plafon)<br>3. Cek running balance plafon | Logic MIN formula tetap berjalan sesuai NM-960. Plafon dan sub benefit tidak terpengaruh enhancement | High |
| 28 | Verify excess type (MEMBER/CORPORATE) tidak terpengaruh | BU: BU-TEST-001, Excess Type: MEMBER, Total Excess: 5jt | Poolfund aktif, excess terjadi | TC28 - Regression: excess type logic intact | Positive | 1. Discharge claim yang menghasilkan excess<br>2. Verify excess distribution<br>3. Cek excess type | Excess type tetap sesuai konfigurasi (MEMBER → tanggungan member, CORPORATE → AR corporate). Tidak berubah karena enhancement | Medium |
| 29 | Verify cost share/copay logic tidak terpengaruh | BU: BU-TEST-001, Cost share: 20%, Approved: 10jt | Poolfund aktif, cost share configured | TC29 - Regression: cost share logic intact | Positive | 1. Discharge claim dengan cost share<br>2. Verify cost share calculation<br>3. Verify sequence: poolfund allocation → cost share | Cost share tetap dihitung setelah alokasi poolfund. Logic tidak berubah | Medium |

---

#### SC-10: Regression — Void/Reversal dengan Integrasi Baru

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Priority |
|----|---|---|---|---|---|---|---|---|
| 30 | Verify void claim dari Klaim mengembalikan balance poolfund | BU: BU-TEST-001, Claim A: poolfund used = 5jt, Balance sebelum void: 45jt | Claim A sudah discharged via Klaim | TC30 - Void Klaim → restore balance poolfund | Positive | 1. Balance poolfund = 45jt (setelah Claim A)<br>2. Void Claim A di aplikasi Klaim<br>3. Cek balance poolfund | Balance poolfund = 50jt (45jt + 5jt restored). Konsisten di semua app | High |
| 31 | Verify void dari Provider mengembalikan balance poolfund | BU: BU-TEST-001, Claim (Provider): poolfund used = 6jt, Balance sebelum void: 39jt | Claim sudah discharged via Provider | TC31 - Void Provider → restore balance poolfund | Positive | 1. Balance poolfund = 39jt<br>2. Void transaksi di Provider Portal<br>3. Cek balance poolfund | Balance = 45jt (39jt + 6jt restored). Konsisten di Klaim dan HCCM | High |
| 32 | Verify setelah void di satu app, app lain bisa gunakan balance restored | BU: BU-TEST-001, Void dari Klaim restore 5jt (balance: 50jt). Provider discharge 8jt | Void sudah dilakukan | TC32 - Cross-app: void restore → app lain pakai balance | Positive | 1. Void di Klaim → balance = 50jt<br>2. Discharge di Provider (approved 8jt)<br>3. Cek balance | Balance = 42jt (50jt - 8jt). Provider berhasil menggunakan balance restored dari void Klaim | High |
| 33 | Verify void TIDAK mengembalikan deposit yang tidak terpotong (anomali scenario) | BU: BU-TEST-001, Deposit: 80jt, Void pada claim yang anomali | Claim gagal karena anomali → deposit tidak terpotong → void | TC33 - Void anomali: deposit tetap konsisten | Positive | 1. Claim gagal karena anomali (deposit tidak terpotong)<br>2. Void claim tersebut<br>3. Cek balance deposit | Deposit tetap = 80jt. Tidak ada double-effect karena deposit memang tidak terpotong saat anomali | Medium |

---

#### SC-11: Regression — Existing Klaim Flow (NM-960 Core Logic)

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Priority |
|----|---|---|---|---|---|---|---|---|
| 34 | Verify NM-960 SC-3 logic tetap berlaku: Poolfund → Deposit → Excess distribution | BU: BU-TEST-001, Poolfund: 3jt, Deposit: 2jt, Allow Deposit = TRUE, Total Approved: 8jt | Poolfund + Deposit < Approved | TC34 - Regression NM-960: distribution logic intact | Positive | 1. Discharge claim approved 8jt<br>2. Verify distribution: Poolfund → Deposit → Excess<br>3. Cek header | Poolfund = 3jt, Excess AR (Deposit) = 2jt, Excess Member tambahan = 3jt. Distribution logic sesuai NM-960 SC-3 | High |
| 35 | Verify NM-960 renewal reset tetap berfungsi setelah enhancement | BU: BU-TEST-001, Polis lama: sisa poolfund 5jt. Renewal dilakukan | Renewal polis | TC35 - Regression NM-960: renewal reset poolfund | Positive | 1. Catat sisa poolfund polis lama (5jt)<br>2. Proses renewal polis<br>3. Cek balance poolfund polis baru | Balance poolfund di-reset ke initial (misal 50jt). Renewal logic tidak terganggu oleh enhancement integrasi | High |

---

#### SC-12: Edge Cases & Boundary

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Priority |
|----|---|---|---|---|---|---|---|---|
| 36 | Verify discharge dengan amount approved = 0 tidak mempengaruhi balance | BU: BU-TEST-001, Balance: 50jt, Amount Approved = 0 | Claim dimana seluruh amount jadi excess di detail level | TC36 - Approved = 0, balance tidak berubah | Positive | 1. Discharge claim yang approved = 0 (semua excess)<br>2. Cek balance poolfund | Balance tetap = 50jt. Poolfund amount = 0. Tidak ada pengurangan | Medium |
| 37 | Verify balance tidak pernah negatif setelah discharge | BU: BU-TEST-001, Balance: 500, Amount Approved: 5.000.000 | Balance sangat kecil | TC37 - Guard clause: balance tidak negatif | Positive | 1. Balance = 500<br>2. Discharge approved 5jt<br>3. Cek balance dan distribusi | Poolfund = 500 (partial). Balance = 0 (bukan -4.999.500). Sisa 4.999.500 ke Deposit/Excess | High |
| 38 | Verify very large amount tidak cause overflow | BU: BU-TEST-001, Balance: 999.999.999, Amount Approved: 999.999.999 | Boundary max value | TC38 - Large amount boundary | Positive | 1. Balance = 999.999.999<br>2. Discharge approved = 999.999.999<br>3. Verify calculation | Poolfund = 999.999.999. Balance = 0. Tidak ada overflow atau truncation | Medium |
| 39 | Verify first-come-first-served antar aplikasi | BU: BU-TEST-001, Balance: 5jt. Klaim: 5jt (duluan). Provider: 3jt (setelahnya) | Sequential (non-concurrent) | TC39 - First come first served cross-app | Positive | 1. Klaim discharge 5jt → poolfund = 5jt, balance = 0<br>2. Provider discharge 3jt → poolfund available = 0<br>3. Verify Provider | Provider: poolfund = 0 (habis oleh Klaim). Seluruh 3jt ke Deposit/Excess. Balance = 0 | High |
| 40 | Verify BU dengan multiple Plan — balance terisolasi per Plan | BU: BU-MULTI, Plan-A balance: 20jt, Plan-B balance: 30jt. Discharge Plan-A: 5jt | Multi-plan BU | TC40 - Multi-plan: balance isolated | Positive | 1. Verify balance Plan-A = 20jt, Plan-B = 30jt<br>2. Discharge member Plan-A (approved 5jt)<br>3. Cek balance kedua Plan | Plan-A balance = 15jt. Plan-B balance = 30jt (tidak terpengaruh). Isolation per Plan terjaga | High |

---

#### SC-13: Service EXSO Error Handling

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Priority |
|----|---|---|---|---|---|---|---|---|
| 41 | Verify behavior saat service EXSO timeout/error dari Klaim | BU: BU-TEST-001, Service EXSO tidak merespons | Service down/timeout (jika bisa di-simulasi) | TC41 - Klaim: service error handling | Negative | 1. Simulasi service EXSO tidak available<br>2. Proses discharge di Klaim<br>3. Observe behavior | Sistem menampilkan error yang informatif. Discharge tidak diproses. Deposit tidak terpotong. Balance tidak berubah | High |
| 42 | Verify behavior saat service EXSO timeout/error dari Provider | BU: BU-TEST-001, Service EXSO error | Service issue, Provider Portal | TC42 - Provider: service error handling | Negative | 1. Simulasi service error<br>2. Discharge di Provider Portal<br>3. Observe | Error ditampilkan. Transaksi ditolak. Deposit dan balance aman | High |
| 43 | Verify behavior saat service EXSO timeout/error dari HCCM | BU: BU-TEST-001, Service EXSO error | Service issue, HCCM | TC43 - HCCM: service error handling | Negative | 1. Simulasi service error<br>2. Transaksi di HCCM<br>3. Observe | Error ditampilkan. Transaksi ditolak. Deposit dan balance aman | High |

---

### E2E Integration Scenarios (NM-1113)

> Validasi: End-to-end full lifecycle integrasi balance poolfund antar semua aplikasi.

#### SC-14: E2E Full Lifecycle — Multi-App Integration

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Priority |
|----|---|---|---|---|---|---|---|---|
| 44 | E2E: Full cycle Klaim → Provider → HCCM → verify balance → void → re-claim | BU: BU-E2E, Balance awal: 100jt. Klaim: 20jt, Provider: 15jt, HCCM: 10jt. Void Klaim. Re-claim Provider: 25jt | Semua app terintegrasi, BU poolfund = YES | TC44 - E2E full lifecycle cross-app | Positive | 1. Balance awal = 100jt<br>2. Klaim discharge 20jt → balance = 80jt<br>3. Provider discharge 15jt → balance = 65jt<br>4. HCCM transaksi 10jt → balance = 55jt<br>5. Void Klaim (20jt) → balance = 75jt<br>6. Provider re-claim 25jt → balance = 50jt<br>7. Verify di semua app | Balance final = 50jt di semua aplikasi. Void restore bekerja. Re-claim menggunakan restored balance. Konsistensi terjaga | High |
| 45 | E2E: Exhaust poolfund dari multi-app → full excess | BU: BU-E2E, Balance: 20jt. Klaim: 10jt, Provider: 7jt, HCCM: 5jt | Total transaksi > balance | TC45 - E2E exhaust poolfund cross-app | Positive | 1. Klaim 10jt → poolfund=10jt, balance=10jt<br>2. Provider 7jt → poolfund=7jt, balance=3jt<br>3. HCCM 5jt → poolfund=3jt (partial), sisa 2jt ke Deposit/Excess, balance=0<br>4. Verify semua | Transisi jelas: balance berkurang → partial → habis. HCCM mendapat partial. Balance final = 0 di semua app | High |
| 46 | E2E: BU tanpa poolfund — semua app skip, claim normal | BU: BU-NO-POOL, is_poolfund = NO. Klaim: 5jt, Provider: 3jt, HCCM: 4jt | BU tanpa poolfund | TC46 - E2E non-poolfund BU semua app | Positive | 1. Klaim discharge 5jt → no poolfund<br>2. Provider discharge 3jt → no poolfund<br>3. HCCM transaksi 4jt → no poolfund<br>4. Verify | Semua transaksi berhasil tanpa poolfund. Poolfund = 0 di semua claim. Pembayaran dari plafon biasa | High |
| 47 | E2E: Mixed BU — satu dengan poolfund, satu tanpa | BU-A: poolfund=YES (balance 50jt), BU-B: poolfund=NO. Claim BU-A dan BU-B | 2 BU berbeda | TC47 - E2E mixed BU setting | Positive | 1. Discharge BU-A (poolfund YES): approved 5jt → poolfund = 5jt<br>2. Discharge BU-B (poolfund NO): approved 5jt → poolfund = 0<br>3. Verify isolation | BU-A: balance berkurang. BU-B: tidak ada interaksi poolfund. Kedua BU independent | High |
| 48 | E2E: Anomali terdeteksi di tengah multi-app flow → recovery | BU: BU-E2E, Klaim berhasil, lalu anomali terdeteksi saat Provider discharge | Anomali balance saat cross-app | TC48 - E2E anomali mid-flow → error + deposit aman | Negative | 1. Klaim discharge berhasil (balance berkurang normal)<br>2. Kondisi anomali muncul<br>3. Provider discharge → error<br>4. Cek deposit dan balance | Provider ditolak. Deposit tidak terpotong. Balance Klaim yang sudah berhasil tetap valid. Sistem in consistent state | High |

---

## Coverage Summary

| AC# | Description | Total TC | Positive | Negative | Priority High | Priority Medium |
|-----|-------------|----------|----------|----------|---------------|----------------|
| AC-1 | Transaksi mengurangi balance konsisten | 25 | 25 | 0 | 23 | 2 |
| AC-2 | Validasi anomali, error, proteksi deposit | 14 | 8 | 6 | 13 | 1 |
| AC-3 | Logic existing tidak terpengaruh (regression) | 9 | 9 | 0 | 6 | 3 |
| **Total** | | **48** | **42** | **6** | **42** | **6** |

### Coverage by Application

| Application | TC Count | Scenarios |
|-------------|----------|-----------|
| Klaim | 15 | SC-1, SC-6, SC-7, SC-8, SC-9, SC-10, SC-11, SC-12, SC-13 |
| Provider Portal | 12 | SC-2, SC-4, SC-5, SC-7, SC-8, SC-10, SC-12, SC-13 |
| HCCM | 10 | SC-3, SC-4, SC-5, SC-7, SC-8, SC-12, SC-13 |
| Cross-App (E2E) | 11 | SC-4, SC-14 |

### Coverage by Test Technique

| Technique | Applied To |
|-----------|-----------|
| Equivalence Partitioning | Setting YES/NO, Poolfund cukup/partial/habis |
| Boundary Value Analysis | Balance = 0, Balance = 500, Very large amount |
| Decision Table | Setting × App × Balance condition |
| State Transition | Balance full → partial → 0, Void → restored |
| Error Guessing | Service timeout, anomali balance, concurrent access |

---

## Feature File Mapping

| TC Range | Feature Scenario | Tags |
|----------|-----------------|------|
| TC01–TC03 | Klaim discharge reduces poolfund balance | `@NM-963 @AC-1 @klaim @poolfund-balance` |
| TC04–TC05 | Provider discharge reduces poolfund balance | `@NM-963 @AC-1 @provider @poolfund-balance` |
| TC06–TC07 | HCCM transaction reduces poolfund balance | `@NM-963 @AC-1 @hccm @poolfund-balance` |
| TC08–TC10 | Cross-app sequential balance consistency | `@NM-963 @AC-1 @cross-app @e2e` |
| TC11–TC14 | Poolfund plan setting YES/NO | `@NM-963 @AC-1 @setting @smoke` |
| TC15–TC19 | Anomali detection and error handling | `@NM-963 @AC-2 @anomali @negative` |
| TC20–TC22 | Poolfund = 0 behavior per app | `@NM-963 @AC-2 @poolfund-zero` |
| TC23–TC25 | Poolfund partial per app | `@NM-963 @AC-2 @poolfund-partial` |
| TC26–TC29 | Regression non-poolfund logic | `@NM-963 @AC-3 @regression` |
| TC30–TC33 | Void/reversal with integration | `@NM-963 @AC-3 @void @regression` |
| TC34–TC35 | Regression NM-960 core logic | `@NM-963 @AC-3 @regression @NM-960` |
| TC36–TC40 | Edge cases & boundary | `@NM-963 @AC-3 @boundary @edge-case` |
| TC41–TC43 | Service error handling | `@NM-963 @AC-2 @error-handling @negative` |
| TC44–TC48 | E2E full lifecycle integration | `@NM-963 @e2e @NM-1113 @integration` |

---

## Automation Recommendation

| Category | TC Range | Recommendation | Reason |
|----------|----------|----------------|--------|
| Smoke | TC01, TC04, TC06, TC11, TC12 | Automate | Core flow, run setiap deployment |
| Regression | TC26–TC35 | Automate | Protect existing logic |
| E2E Cross-App | TC08, TC44, TC45 | Automate | Critical integration path |
| Anomali/Error | TC15–TC19, TC41–TC43 | Manual | Membutuhkan simulasi kondisi khusus |
| Boundary | TC36–TC40 | Automate | Repeatable, data-driven |

### Automation Priority Order

1. **Sprint ini**: TC01, TC04, TC06, TC11, TC12 (smoke — validate deployment)
2. **Sprint ini**: TC08, TC44, TC45 (E2E cross-app — validate integration)
3. **Next sprint**: TC26–TC35 (regression suite)
4. **Next sprint**: TC36–TC40 (boundary/edge cases)
5. **Manual only**: TC15–TC19, TC41–TC43 (anomali — requires env manipulation)

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| Tester | | | |
| Squad Lead | | | |
| BA/PO | | | |

---

## Attachment

| TC# | Evidence Type | Link |
|-----|---------------|------|
| TC01 | Screenshot | |
| TC02 | Screenshot | |
| TC03 | Screenshot | |
| ... | ... | ... |
| TC48 | Screenshot/Video | |

---

## Notes

- Test cases TC15–TC19 dan TC41–TC43 (anomali & service error) mungkin memerlukan koordinasi dengan tim DevOps untuk simulasi kondisi error
- Balance verification dilakukan melalui UI (sesuai testing approach yang disepakati)
- TC data yang digunakan (BU-TEST-001, BU-POOL-YES, dll) adalah placeholder — sesuaikan dengan test data aktual di environment SIT
- Regression test NM-960 (TC34–TC35) memvalidasi bahwa enhancement tidak merusak logic existing
- Untuk concurrent testing (race condition), direkomendasikan sebagai separate performance/stress test, bukan bagian dari functional test ini
