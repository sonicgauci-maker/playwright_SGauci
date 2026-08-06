# Test Cases: NM-1265 - Perpindahan Beban ke Achieved

## Test Case Information

| Field | Value |
|-------|-------|
| **Test Priority** | High |
| **Application Address** | https://development.inhealth.co.id/newmicare |
| **Description** | Validasi perpindahan klaim dari hitungan beban aktif ke achieved ketika status klaim dan batch memenuhi kondisi tertentu |
| **Test Design by** | |
| **Jira Reference** | NM-1265 |
| **Parent** | NM-1250 |
| **Sprint** | Claim Operation Sprint 25, Sprint 26 |
| **Version** | TC.2026.08 |

---

## Test Cases

### AC-1: Perpindahan beban ke achieved saat status klaim 4400 dan batch 5105 (bersamaan saat approve)

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Verify klaim berpindah ke achieved saat approve (status klaim=4400 dan batch=5105 bersamaan) | Klaim ID: CLM-001, Score: 5 | Klaim sudah distributed ke verifikator A, record `verificator_scored` hari ini ada (load=10, achieved=0) | TC01 - Perpindahan sukses (happy path) | Positive | 1. Klaim CLM-001 di-distributed ke verifikator A<br>2. Verifikator menyelesaikan verifikasi<br>3. KaKLY/Kanit approve → status klaim=4400 dan batch=5105 terjadi bersamaan<br>4. Cek record `verificator_scored` verifikator A | load TETAP=10 (tidak berkurang), achieved_score bertambah (0→5), score_gap di-recalculate | | | High | `@NM-1265 @AC-1 @smoke` Scenario: TC01 - Perpindahan beban ke achieved | Automated (API) | |
| 2 | Verify perpindahan dengan score klaim variable (score tinggi) | Klaim ID: CLM-002, Score: 15 | Record verifikator: load=20, achieved=0 | TC02 - Score tinggi | Positive | 1. Klaim CLM-002 (score=15) di-approve<br>2. Status klaim=4400 dan batch=5105 bersamaan<br>3. Cek record verifikator | load TETAP=20, achieved=0+15=15 | | | High | `@NM-1265 @AC-1` Scenario: TC02 - Score variable tinggi | Automated (API) | |
| 3 | Verify perpindahan dengan score klaim variable (score rendah) | Klaim ID: CLM-003, Score: 1 | Record verifikator: load=10, achieved=5 | TC03 - Score rendah | Positive | 1. Klaim CLM-003 (score=1) di-approve<br>2. Status klaim=4400 dan batch=5105 bersamaan<br>3. Cek record verifikator | load TETAP=10, achieved=5+1=6 | | | Medium | `@NM-1265 @AC-1` Scenario: TC03 - Score variable rendah | Automated (API) | |
| 4 | Verify TIDAK berpindah jika status klaim belum 4400 (belum di-approve) | Klaim ID: CLM-004, Status klaim: 2209 | Record verifikator: load=10, achieved=0 | TC04 - Belum di-approve | Negative | 1. Klaim sudah selesai verifikasi (status=2209)<br>2. Belum di-approve oleh KaKLY/Kanit<br>3. Cek record verifikator | achieved tetap=0. Klaim belum berpindah ke achieved karena belum di-approve | | | High | `@NM-1265 @AC-1 @negative` Scenario: TC04 - Belum approve | Automated (API) | |
| 5 | Verify batch 1-to-many: batch dengan multiple klaim, semua di-approve | Batch-001 berisi CLM-005 (score=3), CLM-006 (score=5) | Verifikator sama, load=15, achieved=0 | TC05 - Batch multi-klaim semua approved | Positive | 1. Semua klaim dalam batch di-approve<br>2. Status klaim=4400 dan batch=5105 bersamaan<br>3. Cek record verifikator | load TETAP=15, achieved=0+3+5=8 (kedua klaim di-achieved) | | | High | `@NM-1265 @AC-1` Scenario: TC05 - Batch multi-klaim | Automated (API) | |
| 6 | Verify batch 1-to-many: batch dengan multiple klaim, sebagian belum selesai verifikasi | Batch-002 berisi CLM-007 (selesai, score=3), CLM-008 (belum selesai, score=4) | Verifikator sama, load=15, achieved=0 | TC06 - Batch multi-klaim partial | Positive | 1. CLM-007 sudah selesai verifikasi dan di-approve (4400+5105)<br>2. CLM-008 masih dalam proses verifikasi<br>3. Cek record verifikator | Hanya CLM-007 yang achieved. load TETAP=15, achieved=0+3=3 | | | High | `@NM-1265 @AC-1` Scenario: TC06 - Batch partial approved | Automated (API) | |
| 7 | Verify batch 1-to-1: satu batch satu klaim | Batch-003 berisi CLM-009 (score=6) | Verifikator, load=10, achieved=0 | TC07 - Batch single klaim | Positive | 1. CLM-009 di-approve<br>2. Status klaim=4400 dan batch=5105 bersamaan<br>3. Cek record | load TETAP=10, achieved=0+6=6 | | | Medium | `@NM-1265 @AC-1` Scenario: TC07 - Batch single klaim | Automated (API) | |
| 8 | Verify load bertambah saat menerima klaim baru (bukan berkurang saat achieved) | CLM-010 (score=5) distributed, lalu CLM-011 (score=3) distributed | Verifikator, load awal=0, achieved=0 | TC08 - Load bertambah saat distribute | Positive | 1. CLM-010 di-distribute → load bertambah jadi 5<br>2. CLM-011 di-distribute → load bertambah jadi 8<br>3. CLM-010 di-approve (4400+5105)<br>4. Cek record | load TETAP=8 (tidak berkurang), achieved=0+5=5 | | | High | `@NM-1265 @AC-1` Scenario: TC08 - Load independen dari achieved | Automated (API) | |

### AC-2: Klaim di range status 2202–2209 tetap dihitung sebagai beban aktif

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 9 | Verify klaim status 2202 (Distributed) dihitung sebagai beban | Klaim CLM-012, score=4, status=2202 | Verifikator, load awal=5 | TC09 - Status 2202 = beban | Positive | 1. Klaim di-distribute ke verifikator (status=2202)<br>2. Cek record verifikator<br>3. Verifikasi load bertambah | load bertambah (5→9), klaim dihitung sebagai beban aktif | | | High | `@NM-1265 @AC-2 @smoke` Scenario: TC09 - Distributed sebagai beban | Automated (API) | |
| 10 | Verify klaim status 2209 (Selesai Verifikasi) masih dihitung sebagai beban | Klaim CLM-013, status=2209 | Klaim sudah selesai diverifikasi tapi belum di-approve | TC10 - Status 2209 = masih beban | Positive | 1. Klaim selesai verifikasi (status=2209)<br>2. Cek record verifikator<br>3. Verifikasi load | load TETAP (tidak berkurang). Klaim masih dihitung sebagai beban aktif | | | High | `@NM-1265 @AC-2 @smoke` Scenario: TC10 - Selesai verifikasi masih beban | Automated (API) | |
| 11 | Verify klaim di status antara 2202 dan 2209 tetap beban | Klaim CLM-014, status=2205 (in-progress) | Klaim sedang diverifikasi | TC11 - Status intermediate = beban | Positive | 1. Klaim di-proses verifikator (status antara 2202-2209)<br>2. Cek record verifikator | Klaim tetap dihitung sebagai beban aktif, load tidak berubah | | | Medium | `@NM-1265 @AC-2` Scenario: TC11 - Status intermediate beban | Automated (API) | |
| 12 | Verify klaim yang di-reject tetap dihitung sebagai beban | Klaim CLM-015, status=rejected (bukan 4400) | Klaim ditolak oleh KaKLY | TC12 - Reject tetap beban | Positive | 1. Klaim diverifikasi lalu di-reject<br>2. Status klaim bukan 4400<br>3. Cek record verifikator | Klaim TETAP dihitung sebagai beban (karena sudah diproses). Load tidak berubah | | | High | `@NM-1265 @AC-2` Scenario: TC12 - Reject tetap beban | Automated (API) | |
| 13 | Verify multiple klaim dalam berbagai status — hanya yang 4400+5105 yang achieved | Verifikator A: CLM-016(2202, score=4), CLM-017(2209, score=3), CLM-018(4400+5105, score=5) | load=12, achieved=0 | TC13 - Mixed status | Positive | 1. CLM-016 status 2202, CLM-017 status 2209<br>2. CLM-018 di-approve (4400+5105)<br>3. Cek record verifikator | Hanya CLM-018 achieved. load TETAP=12, achieved=0+5=5. CLM-016 & CLM-017 masih beban | | | High | `@NM-1265 @AC-2` Scenario: TC13 - Mixed status | Automated (API) | |

### AC-3: Perpindahan mempengaruhi score achieved pada dashboard (refresh)

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 14 | Verify dashboard menampilkan achieved terbaru setelah refresh | Verifikator A: CLM-019 (score=5) di-achieved | Dashboard terbuka, achieved sebelum=0 | TC14 - Dashboard refresh achieved | Positive | 1. Buka dashboard SPV<br>2. Catat achieved verifikator A (0)<br>3. Klaim CLM-019 di-approve (4400+5105)<br>4. Refresh dashboard<br>5. Cek achieved verifikator A | achieved_score bertambah (0→5) setelah refresh. Load TETAP | | | High | `@NM-1265 @AC-3 @smoke` Scenario: TC14 - Dashboard refresh | Automated (UI) | |
| 15 | Verify dashboard menampilkan load TETAP setelah achieved (tidak berkurang) | Verifikator A: load=10, CLM-020 (score=4) di-achieved | Dashboard terbuka | TC15 - Dashboard load tetap | Positive | 1. Buka dashboard, catat load verifikator A (10)<br>2. Klaim CLM-020 di-approve (4400+5105)<br>3. Refresh dashboard<br>4. Cek load verifikator A | load TETAP=10 (tidak berkurang setelah achieved) | | | High | `@NM-1265 @AC-3` Scenario: TC15 - Dashboard load tetap | Automated (UI) | |
| 16 | Verify score_gap di-recalculate dan tampil di dashboard | Verifikator A: score_max=20, achieved sebelum=5, CLM-021 (score=3) di-achieved | Dashboard terbuka | TC16 - Dashboard score_gap update | Positive | 1. Buka dashboard, catat score_gap (20-5=15)<br>2. Klaim CLM-021 di-approve (4400+5105)<br>3. Refresh dashboard<br>4. Cek score_gap | score_gap = 20 - (5+3) = 12 | | | High | `@NM-1265 @AC-3` Scenario: TC16 - Score gap recalculate | Automated (UI) | |
| 17 | Verify dashboard TIDAK auto-refresh (perlu manual refresh) | Klaim di-achieved saat dashboard terbuka | Dashboard terbuka tanpa refresh | TC17 - No auto-refresh | Negative | 1. Buka dashboard, catat data<br>2. Klaim di-approve di background<br>3. TANPA refresh, cek dashboard | Data dashboard TIDAK berubah (masih data lama) sampai user refresh manual | | | Medium | `@NM-1265 @AC-3 @negative` Scenario: TC17 - No auto-refresh | Automated (UI) | |
| 18 | Verify multiple klaim di-achieved berturutan — dashboard akumulatif | CLM-022 (score=3), CLM-023 (score=5) | Verifikator A: load=15, achieved=0 | TC18 - Multiple achieved akumulatif | Positive | 1. CLM-022 di-approve → achieved=3<br>2. CLM-023 di-approve → achieved=3+5=8<br>3. Refresh dashboard | load TETAP=15, achieved=8, data akumulatif benar | | | High | `@NM-1265 @AC-3` Scenario: TC18 - Multiple achieved | Automated (API) | |

### Edge Cases & Boundary Scenarios

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 19 | Verify score klaim = 0 | Klaim CLM-024, Score=0 | load=10, achieved=5 | TC19 - Score zero | Boundary | 1. Klaim (score=0) di-approve (4400+5105)<br>2. Cek record verifikator | Perpindahan terjadi tetapi achieved tetap=5 (score 0 tidak mengubah angka). load TETAP=10 | | | Medium | `@NM-1265 @edge-case @boundary` Scenario: TC19 - Score zero | Automated (API) | |
| 20 | Verify achieved melebihi score_max (over-perform) | Verifikator A: score_max=20, achieved=18, CLM-025 (score=5) | Achieved mendekati max | TC20 - Over-perform | Boundary | 1. Achieved=18, score_max=20<br>2. Klaim (score=5) di-approve<br>3. Cek score_gap | achieved=18+5=23 (melebihi max). score_gap=20-23=-3 (negatif, over-perform) | | | Medium | `@NM-1265 @edge-case @boundary` Scenario: TC20 - Over-perform | Automated (API) | |
| 21 | Verify cross-day: klaim di-distribute hari sebelumnya, approved hari ini | CLM-026 distributed kemarin, approved hari ini (score=6) | Record hari ini: load=6 (carry-over), achieved=0 | TC21 - Cross-day achieved | Positive | 1. Klaim distributed kemarin (masuk carry-over hari ini)<br>2. Klaim di-approve hari ini (4400+5105)<br>3. Cek record hari ini | load TETAP=6, achieved=0+6=6 (achieved di record HARI INI) | | | High | `@NM-1265 @edge-case` Scenario: TC21 - Cross-day | Automated (API) | |
| 22 | Verify concurrent: 2 klaim dari 1 verifikator di-achieved bersamaan | CLM-027 (score=3), CLM-028 (score=4) approved near-simultaneously | load=10, achieved=0 | TC22 - Concurrent approval | Negative | 1. Dua klaim di-approve hampir bersamaan<br>2. Cek record setelah keduanya selesai | Tidak ada race condition. Final: load TETAP=10, achieved=0+3+4=7 | | | High | `@NM-1265 @edge-case @negative` Scenario: TC22 - Concurrent | Automated (API) | |
| 23 | Verify record verificator_scored belum ada (job NM-1303 belum jalan) | CLM-029 (score=5), approved pukul 00:05 WIB | Record hari ini BELUM dibuat (job 00:10 belum jalan) | TC23 - Record belum ada | Negative | 1. Klaim di-approve sebelum 00:10<br>2. Record `verificator_scored` hari ini belum ada<br>3. Cek behavior | Achieved dihitung sebagai 0 (karena record belum ada). Tidak error | | | High | `@NM-1265 @edge-case @negative` Scenario: TC23 - Record belum ada | Automated (API) | |
| 24 | Verify klaim dari verifikator yang di-nonaktifkan hari ini | CLM-030 (score=3), verifikator di-nonaktifkan setelah klaim distributed | Record hari ini ada (dari job pagi) | TC24 - Verifikator nonaktif | Negative | 1. Verifikator di-nonaktifkan setelah record dibuat<br>2. Klaim yang sudah di-assign di-approve (4400+5105)<br>3. Cek record | Achieved tetap dihitung (klaim sudah diproses sebelum nonaktif) | | | Medium | `@NM-1265 @edge-case @negative` Scenario: TC24 - Verifikator nonaktif | Automated (API) | |
| 25 | Verify multiple verifikator — achieved hanya masuk ke verifikator yang handle | CLM-031 → Verifikator A (score=5), CLM-032 → Verifikator B (score=3) | A: load=10, achieved=0. B: load=8, achieved=0 | TC25 - Multi verifikator isolasi | Positive | 1. CLM-031 (assign ke A) di-approve<br>2. CLM-032 (assign ke B) di-approve<br>3. Cek record masing-masing | A: load TETAP=10, achieved=5. B: load TETAP=8, achieved=3. Tidak ada cross-contamination | | | High | `@NM-1265 @edge-case` Scenario: TC25 - Multi verifikator | Automated (API) | |
| 26 | Verify score variable — klaim dengan score besar (boundary high) | CLM-033, Score=100 | load=120, achieved=0 | TC26 - Score besar | Boundary | 1. Klaim dengan score sangat besar (100) di-approve<br>2. Cek record | load TETAP=120, achieved=0+100=100. Kalkulasi benar untuk angka besar | | | Medium | `@NM-1265 @edge-case @boundary` Scenario: TC26 - Score besar | Automated (API) | |
| 27 | Verify perpindahan di hari libur (jika approval terjadi) | CLM-034 (score=4), di-approve di hari libur | Hari libur — record `verificator_scored` mungkin TIDAK ada | TC27 - Achieved di hari libur | Negative | 1. Klaim di-approve di hari libur<br>2. Cek apakah record ada<br>3. Cek behavior | Jika record tidak ada (job skip di hari libur), achieved dihitung 0. Tidak error | | | Medium | `@NM-1265 @edge-case @negative` Scenario: TC27 - Hari libur | Manual | |
| 28 | Verify idempotent — perpindahan tidak terjadi 2x untuk klaim yang sama | CLM-035 (score=5), sudah pernah achieved | Klaim sudah pernah di-achieved | TC28 - Idempotent | Negative | 1. Klaim sudah achieved sebelumnya<br>2. Event perpindahan terpicu ulang (retry/duplicate event)<br>3. Cek record | Achieved TIDAK bertambah 2x. Idempotent — tidak ada double counting | | | High | `@NM-1265 @edge-case @negative` Scenario: TC28 - Idempotent | Automated (API) | |

### Rollback Scenarios (Rollback TIDAK mengurangi score/achieved)

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 29 | Verify rollback status klaim dari 4400 — achieved TIDAK berkurang | CLM-036 (score=5), status rollback dari 4400 | Klaim sudah achieved. Record: load=10, achieved=5 | TC29 - Rollback tidak kurangi achieved | Positive | 1. Klaim CLM-036 sudah achieved (achieved+5)<br>2. Status klaim di-rollback dari 4400<br>3. Cek record verifikator | achieved TETAP=5 (TIDAK dikurangi). load TETAP=10. Data append-only | | | High | `@NM-1265 @rollback @smoke` Scenario: TC29 - Rollback tidak kurangi achieved | Automated (API) | |
| 30 | Verify rollback — score_gap TIDAK berubah setelah rollback | Verifikator: score_max=20, achieved=10, CLM-037 (score=5) di-rollback | score_gap saat ini=10 | TC30 - Rollback score_gap tetap | Positive | 1. Achieved=10, score_gap=20-10=10<br>2. Klaim (score=5) yang sudah achieved di-rollback<br>3. Cek score_gap | score_gap TETAP=10 (tidak recalculate karena achieved tidak berubah) | | | High | `@NM-1265 @rollback` Scenario: TC30 - Rollback score_gap tetap | Automated (API) | |
| 31 | Verify rollback — load TIDAK berubah setelah rollback | CLM-038 (score=4) di-rollback | Record: load=12, achieved=8 | TC31 - Rollback load tetap | Positive | 1. Klaim yang sudah achieved di-rollback<br>2. Cek load verifikator | load TETAP=12 (tidak bertambah kembali). Load dan achieved independen | | | High | `@NM-1265 @rollback` Scenario: TC31 - Rollback load tetap | Automated (API) | |
| 32 | Verify rollback — dashboard tetap menampilkan achieved yang sama setelah refresh | CLM-039 (score=3) di-rollback | Dashboard terbuka, achieved=8 | TC32 - Rollback dashboard tetap | Positive | 1. Dashboard menampilkan achieved=8<br>2. Klaim (score=3) di-rollback<br>3. Refresh dashboard | achieved TETAP=8 di dashboard. Rollback tidak mengubah tampilan achieved | | | Medium | `@NM-1265 @rollback` Scenario: TC32 - Rollback dashboard | Automated (UI) | |

### Data Consistency & Carry-over

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 33 | Verify carry-over hari berikutnya memperhitungkan achieved hari ini | Hari ini: load=10, achieved=7 | Job NM-1303 akan jalan besok 00:10 | TC33 - Carry-over next day | Positive | 1. Hari ini: load=10, achieved=7<br>2. Trigger job NM-1303 untuk hari berikutnya<br>3. Cek record besok | Besok load = MAX(0, 10-7) = 3 (carry-over benar) | | | High | `@NM-1265 @integration` Scenario: TC33 - Carry-over | Automated (API) | |
| 34 | Verify achieved yang tinggi menghasilkan carry-over load rendah (distribusi lebih adil) | Verifikator A: load=10, achieved=9. Verifikator B: load=10, achieved=2 | Job NM-1303 besok | TC34 - Carry-over fairness | Positive | 1. A: load=10, achieved=9. B: load=10, achieved=2<br>2. Job NM-1303 besok<br>3. Cek carry-over masing-masing | A besok: load=MAX(0,10-9)=1. B besok: load=MAX(0,10-2)=8. A lebih ringan | | | High | `@NM-1265 @integration` Scenario: TC34 - Carry-over fairness | Automated (API) | |
| 35 | Verify konsistensi data: achieved = sum score klaim yang sudah 4400+5105 | Verifikator A: 3 klaim achieved (score 3+5+4=12) | Record achieved=12 | TC35 - Data consistency | Positive | 1. Hitung total score klaim yang sudah achieved (4400+5105)<br>2. Bandingkan dengan field achieved di `verificator_scored` | Total score klaim achieved = field achieved_score (konsisten) | | | High | `@NM-1265 @integration @dod` Scenario: TC35 - Data consistency | Automated (API) | |
| 36 | Verify E2E: distribute → verifikasi → approve → achieved → dashboard | Klaim baru CLM-040 (score=5) | Full flow dari awal | TC36 - End-to-end flow | Positive | 1. Klaim di-distribute (status 2202, load+5)<br>2. Verifikator verifikasi (status 2209, load tetap)<br>3. KaKLY approve → status 4400 + batch 5105 bersamaan<br>4. Refresh dashboard | load TETAP (bertambah saat distribute, tidak berkurang saat achieved). achieved+5. Dashboard ter-update setelah refresh | | | High | `@NM-1265 @integration @e2e @smoke` Scenario: TC36 - E2E flow | Manual | |
| 37 | Verify E2E: rollback setelah achieved — achieved tetap, carry-over tetap terhitung | CLM-041 (score=5) achieved lalu rollback | Full flow termasuk rollback | TC37 - E2E rollback flow | Positive | 1. Klaim achieved (achieved+5)<br>2. Rollback status klaim<br>3. Cek achieved → TETAP +5<br>4. EOD job besok → carry-over memperhitungkan achieved=5 | Rollback tidak mempengaruhi achieved. Carry-over besok: MAX(0, load-achieved) tetap memperhitungkan achieved=5 | | | High | `@NM-1265 @integration @e2e @rollback` Scenario: TC37 - E2E rollback | Manual | |

---

## Coverage Summary

| AC# | Description | Positive | Negative | Boundary | Total |
|-----|-------------|----------|----------|----------|-------|
| AC-1 | Perpindahan beban ke achieved (approve: 4400 + 5105 bersamaan) | 7 | 1 | 0 | 8 |
| AC-2 | Klaim di range 2202–2209 tetap beban | 5 | 0 | 0 | 5 |
| AC-3 | Score achieved pada dashboard (refresh) | 4 | 1 | 0 | 5 |
| Edge Cases | Boundary, concurrent, idempotent | 3 | 5 | 3 | 10* |
| Rollback | Rollback TIDAK mengurangi achieved/load | 4 | 0 | 0 | 4 |
| Integration | Carry-over, consistency, E2E | 5 | 0 | 0 | 5 |
| **Total** | | **28** | **7** | **3** | **37** |

---

## Feature File Mapping

| TC Range | Feature File | Tags |
|----------|-------------|------|
| TC01-TC08 | `src/features/scoring/perpindahanBebanKeAchieved.feature` | `@NM-1265 @AC-1` |
| TC09-TC13 | `src/features/scoring/bebanAktifVerifikator.feature` | `@NM-1265 @AC-2` |
| TC14-TC18 | `src/features/scoring/dashboardAchievedRefresh.feature` | `@NM-1265 @AC-3` |
| TC19-TC28 | `src/features/scoring/perpindahanBebanEdgeCases.feature` | `@NM-1265 @edge-case` |
| TC29-TC32 | `src/features/scoring/perpindahanBebanRollback.feature` | `@NM-1265 @rollback` |
| TC33-TC37 | `src/features/scoring/perpindahanBebanIntegration.feature` | `@NM-1265 @integration` |

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
| TC01-TC37 | | |
