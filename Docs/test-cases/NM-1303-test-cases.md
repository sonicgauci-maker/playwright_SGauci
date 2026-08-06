# Test Cases: NM-1303 - Inisialisasi Data Harian Verifikator (EOD Job)

## Test Case Information

| Field | Value |
|-------|-------|
| **Test Priority** | High |
| **Application Address** | https://development.inhealth.co.id/newmicare |
| **Description** | Scheduler job harian — inisialisasi data scoring verifikator dengan carry-over beban hari kerja sebelumnya |
| **Test Design by** | |
| **Jira Reference** | NM-1303 |
| **Parent** | NM-1250 |
| **Sprint** | Claim Operation Sprint 25, Sprint 26 |
| **Version** | TC.2026.07 |

---

## Test Cases

### AC-1: Scheduler berjalan setiap hari pukul 00:10 WIB

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Verify scheduler terpicu pada 00:10 WIB | Cron: `10 0 * * *`, TZ: Asia/Jakarta | Scheduler aktif, server TZ=Asia/Jakarta | TC01 - Scheduler terpicu 00:10 WIB | Positive | 1. Pastikan scheduler aktif<br>2. Tunggu/mock 00:10 WIB<br>3. Cek execution log | Job ter-trigger pada 00:10 WIB, log entry tercatat | | | High | `@NM-1303 @AC-1 @smoke` Scenario: TC01 - Scheduler terpicu otomatis | Manual | |
| 2 | Verify scheduler tidak terpicu di waktu lain | Cron: `10 0 * * *` | Scheduler aktif | TC02 - Tidak jalan di waktu lain | Negative | 1. Cek pada 00:09, 00:11, 12:00<br>2. Pastikan tidak ada trigger | Job tidak ter-trigger di luar 00:10 WIB | | | Medium | `@NM-1303 @AC-1 @negative` Scenario: TC02 - Tidak terpicu di waktu lain | Manual | |
| 3 | Verify timezone WIB bukan UTC | Server config | Scheduler terkonfigurasi | TC03 - Timezone WIB | Positive | 1. Cek config TZ=Asia/Jakarta<br>2. Verifikasi 00:10 WIB != 00:10 UTC | Eksekusi di 00:10 WIB (17:10 UTC hari sebelumnya) | | | High | `@NM-1303 @AC-1` Scenario: TC03 - Timezone WIB | Manual | |

### AC-2: Pengecekan hari kerja berdasarkan tabel referensi

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 4 | Verify job skip di hari libur nasional | Tanggal: 1 Jan 2027 | Tabel referensi berisi 1 Jan | TC04 - Skip hari libur | Positive | 1. Set tanggal=hari libur<br>2. Trigger job<br>3. Cek verificator_scored | 0 record dibuat, log skip | | | High | `@NM-1303 @AC-2 @smoke` Scenario: TC04 - Skip hari libur | Automated (API) | |
| 5 | Verify job skip di Sabtu | Tanggal: Sabtu | Sabtu di tabel referensi | TC05 - Skip Sabtu | Positive | 1. Set tanggal=Sabtu<br>2. Trigger job<br>3. Verifikasi 0 record | Job skip, 0 record | | | High | `@NM-1303 @AC-2` Scenario: TC05 - Skip Sabtu | Automated (API) | |
| 6 | Verify job skip di Minggu | Tanggal: Minggu | Minggu di tabel referensi | TC06 - Skip Minggu | Positive | 1. Set tanggal=Minggu<br>2. Trigger job | Job skip, 0 record | | | Medium | `@NM-1303 @AC-2` Scenario: TC06 - Skip Minggu | Automated (API) | |
| 7 | Verify job jalan di hari kerja | Tanggal: Selasa (bukan libur) | Tidak ada di tabel libur | TC07 - Jalan di hari kerja | Positive | 1. Set tanggal=hari kerja<br>2. Trigger job<br>3. Verifikasi record dibuat | Record dibuat untuk semua verifikator aktif | | | High | `@NM-1303 @AC-2 @smoke` Scenario: TC07 - Jalan di hari kerja | Automated (API) | |
| 8 | Verify job skip di cuti bersama | Tanggal: cuti bersama | Cuti bersama di tabel referensi | TC08 - Skip cuti bersama | Positive | 1. Set tanggal=cuti bersama<br>2. Trigger job | Job skip, 0 record | | | Medium | `@NM-1303 @AC-2` Scenario: TC08 - Skip cuti bersama | Automated (API) | |

### AC-3: Record dibuat untuk semua verifikator aktif

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 9 | Verify record untuk semua verifikator aktif | 5 verifikator aktif | Hari kerja, 5 aktif | TC09 - Semua verifikator aktif | Positive | 1. Setup 5 aktif<br>2. Trigger job<br>3. Count record today | Tepat 5 record dibuat | | | High | `@NM-1303 @AC-3 @smoke` Scenario: TC09 - Record semua aktif | Automated (API) | |
| 10 | Verify non-aktif tidak dapat record | 3 aktif, 2 non-aktif | Hari kerja | TC10 - Non-aktif excluded | Positive | 1. Setup 3 aktif + 2 non-aktif<br>2. Trigger job<br>3. Verifikasi hanya 3 record | Hanya 3 record, 0 untuk non-aktif | | | High | `@NM-1303 @AC-3` Scenario: TC10 - Non-aktif excluded | Automated (API) | |
| 11 | Verify job sukses jika 0 verifikator aktif | Semua non-aktif | Hari kerja | TC11 - Zero verifikator | Negative | 1. Set semua non-aktif<br>2. Trigger job | Job sukses, 0 record, no error | | | Medium | `@NM-1303 @AC-3 @negative` Scenario: TC11 - Zero verifikator | Automated (API) | |
| 12 | Verify date record = hari eksekusi | Tanggal: 2026-08-05 | Hari kerja | TC12 - Date correct | Positive | 1. Trigger job 2026-08-05<br>2. Cek field date | Semua record: date=2026-08-05 | | | High | `@NM-1303 @AC-3` Scenario: TC12 - Date sesuai eksekusi | Automated (API) | |

### AC-4: Inisialisasi nilai (achieved_score, score_gap, load)

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 13 | Verify achieved_score = 0 | Verifikator aktif | Hari kerja | TC13 - achieved_score=0 | Positive | 1. Trigger job<br>2. Cek achieved_score | Semua record: achieved_score=0 | | | High | `@NM-1303 @AC-4 @smoke` Scenario: TC13 - achieved_score 0 | Automated (API) | |
| 14 | Verify score_gap = 0 | Verifikator aktif | Hari kerja | TC14 - score_gap=0 | Positive | 1. Trigger job<br>2. Cek score_gap | Semua record: score_gap=0 | | | High | `@NM-1303 @AC-4 @smoke` Scenario: TC14 - score_gap 0 | Automated (API) | |
| 15 | Verify carry-over: load>achieved (sisa kerja) | Prev: load=100, achieved=60 | Record prev ada | TC15 - Carry-over positif | Positive | 1. Setup prev: load=100, achieved=60<br>2. Trigger job<br>3. Cek load baru | load=MAX(0,100-60)=40 | | | High | `@NM-1303 @AC-4 @smoke` Scenario: TC15 - Carry-over positif | Automated (API) | |
| 16 | Verify carry-over: achieved>=load | Prev: load=80, achieved=120 | Record prev ada | TC16 - Carry-over 0 | Positive | 1. Setup prev: load=80, achieved=120<br>2. Trigger job | load=MAX(0,80-120)=0 | | | High | `@NM-1303 @AC-4` Scenario: TC16 - Carry-over 0 | Automated (API) | |
| 17 | Verify carry-over: achieved=load (tepat) | Prev: load=100, achieved=100 | Record prev ada | TC17 - Tepat selesai | Positive | 1. Setup prev: load=100, achieved=100<br>2. Trigger job | load=MAX(0,100-100)=0 | | | Medium | `@NM-1303 @AC-4 @boundary` Scenario: TC17 - Tepat selesai | Automated (API) | |
| 18 | Verify carry-over: prev (0,0) | Prev: load=0, achieved=0 | Record prev ada | TC18 - From zero | Positive | 1. Setup prev: load=0, achieved=0<br>2. Trigger job | load=MAX(0,0-0)=0 | | | Medium | `@NM-1303 @AC-4 @boundary` Scenario: TC18 - From zero | Automated (API) | |
| 19 | Verify carry-over: full load not worked | Prev: load=500, achieved=0 | Record prev ada | TC19 - Full carry-over | Positive | 1. Setup prev: load=500, achieved=0<br>2. Trigger job | load=MAX(0,500-0)=500 | | | Medium | `@NM-1303 @AC-4 @boundary` Scenario: TC19 - Full carry-over | Automated (API) | |

### AC-5: Referensi hari kerja sebelumnya (bukan literal kemarin)

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 20 | Verify Senin referensi Jumat (skip weekend) | Hari ini: Senin, Prev Jumat: load=80, achieved=50 | Sabtu+Minggu di tabel libur | TC20 - Senin ke Jumat | Positive | 1. Setup record Jumat<br>2. Trigger Senin | load=MAX(0,80-50)=30. Ref=Jumat | | | High | `@NM-1303 @AC-5 @smoke` Scenario: TC20 - Senin ke Jumat | Automated (API) | |
| 21 | Verify Senin referensi Kamis (Jumat libur) | Hari ini: Senin, Jumat=libur, Prev Kamis: load=60, achieved=40 | Jumat+Sab+Min di tabel libur | TC21 - Long weekend | Positive | 1. Setup Jumat=libur<br>2. Setup record Kamis<br>3. Trigger Senin | load=MAX(0,60-40)=20. Ref=Kamis | | | High | `@NM-1303 @AC-5` Scenario: TC21 - Long weekend | Automated (API) | |
| 22 | Verify Selasa referensi Senin (berturutan) | Hari ini: Selasa, Prev Senin: load=70, achieved=70 | Senin=hari kerja | TC22 - Berturutan | Positive | 1. Setup record Senin<br>2. Trigger Selasa | load=MAX(0,70-70)=0. Ref=Senin | | | Medium | `@NM-1303 @AC-5` Scenario: TC22 - Berturutan | Automated (API) | |
| 23 | Verify skip cuti panjang (5 hari libur) | Hari ini: Senin, prev Senin lalu: load=90, achieved=30 | 5 hari libur berturut | TC23 - Cuti panjang | Positive | 1. Setup 5 hari libur<br>2. Setup record Senin lalu<br>3. Trigger Senin ini | load=MAX(0,90-30)=60. Ref=Senin lalu | | | High | `@NM-1303 @AC-5` Scenario: TC23 - Cuti panjang | Automated (API) | |
| 24 | Verify cross-year (2 Jan ke 31 Des) | Hari ini: 2 Jan 2027, 1 Jan=libur, Prev 31 Des: load=50, achieved=20 | 1 Jan di tabel libur | TC24 - Cross-year | Positive | 1. Setup 1 Jan=libur<br>2. Setup record 31 Des<br>3. Trigger 2 Jan | load=MAX(0,50-20)=30. Cross-year OK | | | Medium | `@NM-1303 @AC-5 @boundary` Scenario: TC24 - Cross-year | Automated (API) | |

### AC-6: Verifikator baru — load default = 0

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 25 | Verify verifikator baru load=0 | Verifikator baru, tanpa record | Hari kerja, baru aktif | TC25 - Baru load 0 | Positive | 1. Tambah verifikator baru<br>2. Trigger job<br>3. Cek record | achieved=0, score_gap=0, load=0 | | | High | `@NM-1303 @AC-6 @smoke` Scenario: TC25 - Verifikator baru | Automated (API) | |
| 26 | Verify reaktivasi tanpa record prev | Verifikator reaktivasi | Tidak ada record prev | TC26 - Reaktivasi | Positive | 1. Reaktivasi verifikator<br>2. Trigger job | load=0 (default) | | | Medium | `@NM-1303 @AC-6` Scenario: TC26 - Reaktivasi | Automated (API) | |
| 27 | Verify campuran lama + baru | 2 lama + 1 baru | Mix verifikator | TC27 - Campuran | Positive | 1. Setup 2 lama (prev ada) + 1 baru<br>2. Trigger job | Lama: load=carry-over, Baru: load=0 | | | High | `@NM-1303 @AC-6` Scenario: TC27 - Campuran lama baru | Automated (API) | |

### AC-7: Tidak ada pengecekan integrasi ke sistem HC

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 28 | Verify record dibuat tanpa cek HC | 5 verifikator aktif | Hari kerja | TC28 - Tanpa cek HC | Positive | 1. Trigger job<br>2. Verifikasi semua dapat record<br>3. Pastikan no call ke HC | Semua aktif dapat record, no HC integration | | | Medium | `@NM-1303 @AC-7` Scenario: TC28 - Tanpa cek HC | Automated (API) | |

### AC-8: Idempotency — tidak duplikat

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 29 | Verify tidak duplikat jika sudah ada | Record today sudah ada | Job pernah sukses | TC29 - Idempotent | Positive | 1. Trigger pertama (sukses)<br>2. Trigger kedua<br>3. Count record | Jumlah tetap, no duplikat | | | High | `@NM-1303 @AC-8 @smoke` Scenario: TC29 - Idempotent | Automated (API) | |
| 30 | Verify transactional all-or-nothing | 5 verifikator aktif | Hari kerja | TC30 - Transactional | Positive | 1. Trigger job normal<br>2. Verifikasi semua 5 ada | Semua dalam 1 transaksi | | | High | `@NM-1303 @AC-8` Scenario: TC30 - Transactional | Automated (API) | |
| 31 | Verify re-trigger tidak overwrite | Record achieved sudah diupdate=10 | Record dimodif proses lain | TC31 - No overwrite | Positive | 1. Job buat record<br>2. Update achieved=10<br>3. Trigger ulang | achieved tetap 10, tidak reset | | | High | `@NM-1303 @AC-8` Scenario: TC31 - No overwrite | Automated (API) | |

### AC-9: Alert saat gagal dan manual re-trigger

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 32 | Verify alert terkirim saat gagal | Simulasi DB error | Kondisi error | TC32 - Alert saat gagal | Positive | 1. Simulasi DB error<br>2. Trigger job<br>3. Cek alert | Alert terkirim ke tim | | | High | `@NM-1303 @AC-9 @smoke` Scenario: TC32 - Alert saat gagal | Manual | |
| 33 | Verify manual re-trigger setelah fix | Job gagal sebelumnya | Error sudah fix | TC33 - Re-trigger sukses | Positive | 1. Fix error<br>2. Trigger manual<br>3. Verifikasi record | Record berhasil dibuat | | | High | `@NM-1303 @AC-9` Scenario: TC33 - Re-trigger sukses | Automated (API) | |
| 34 | Verify re-trigger saat sudah sukses | Record sudah ada | Job sudah sukses | TC34 - Re-trigger idempotent | Positive | 1. Job sudah sukses<br>2. Trigger manual lagi | Sukses, no duplikat | | | Medium | `@NM-1303 @AC-9` Scenario: TC34 - Re-trigger idempotent | Automated (API) | |
| 35 | Verify rollback saat partial failure | 10 verifikator, error di ke-5 | Simulasi partial fail | TC35 - Rollback | Negative | 1. Setup 10 verifikator<br>2. Simulasi error tengah<br>3. Cek record + alert | 0 record (rollback), alert terkirim | | | High | `@NM-1303 @AC-9 @negative` Scenario: TC35 - Rollback | Automated (API) | |

### Edge Cases & Negative Scenarios

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 36 | Verify over-perform (achieved >> load) | Prev: load=50, achieved=200 | Over-perform | TC36 - Over-perform | Positive | 1. Setup prev<br>2. Trigger job | load=MAX(0,50-200)=0 | | | Medium | `@NM-1303 @edge-case @boundary` Scenario: TC36 - Over-perform | Automated (API) | |
| 37 | Verify performance 100+ verifikator | 100+ aktif | Hari kerja | TC37 - Performance | Positive | 1. Setup 100+ aktif<br>2. Trigger job<br>3. Cek waktu + record | Semua record dibuat tanpa timeout | | | Medium | `@NM-1303 @edge-case @performance` Scenario: TC37 - Performance | Manual | |
| 38 | Verify 29 Februari (kabisat) | 29 Feb 2028, bukan libur | 29 Feb tidak di tabel libur | TC38 - Kabisat | Positive | 1. Setup prev 28 Feb<br>2. Trigger 29 Feb | Record dibuat normal | | | Low | `@NM-1303 @edge-case @boundary` Scenario: TC38 - Kabisat | Automated (API) | |
| 39 | Verify tabel libur kosong | Tabel referensi empty | Tabel kosong | TC39 - Tabel kosong | Negative | 1. Kosongkan tabel<br>2. Trigger di Sabtu | Hari dianggap kerja, record dibuat | | | Medium | `@NM-1303 @edge-case @negative` Scenario: TC39 - Tabel kosong | Manual | |
| 40 | Verify concurrent execution | 2 trigger bersamaan | Race condition | TC40 - Concurrent | Negative | 1. Trigger 2x bersamaan<br>2. Cek duplikat | No duplikat, unique constraint | | | Medium | `@NM-1303 @edge-case @negative` Scenario: TC40 - Concurrent | Manual | |
| 41 | Verify nonaktif setelah job jalan | A aktif lalu nonaktif siang | Record today sudah ada | TC41 - Nonaktif kemudian | Positive | 1. Job buat record A<br>2. Nonaktifkan A<br>3. Record tetap | Record tetap, besok tidak dibuat | | | Low | `@NM-1303 @edge-case` Scenario: TC41 - Nonaktif kemudian | Automated (API) | |
| 42 | Verify execution logging | Job normal | Scheduler aktif | TC42 - Logging | Positive | 1. Trigger job<br>2. Cek log detail | Log: start, count, end, status | | | Medium | `@NM-1303 @edge-case` Scenario: TC42 - Logging | Manual | |

---

## Coverage Summary

| AC# | Description | Positive | Negative | Boundary | Total |
|-----|-------------|----------|----------|----------|-------|
| AC-1 | Scheduler 00:10 WIB | 2 | 1 | 0 | 3 |
| AC-2 | Pengecekan hari kerja | 5 | 0 | 0 | 5 |
| AC-3 | Record verifikator aktif | 3 | 1 | 0 | 4 |
| AC-4 | Inisialisasi nilai | 5 | 0 | 2 | 7 |
| AC-5 | Referensi hari kerja sebelumnya | 4 | 0 | 1 | 5 |
| AC-6 | Verifikator baru load=0 | 3 | 0 | 0 | 3 |
| AC-7 | Tidak cek HC | 1 | 0 | 0 | 1 |
| AC-8 | Idempotency | 3 | 0 | 0 | 3 |
| AC-9 | Alert dan re-trigger | 3 | 1 | 0 | 4 |
| Edge | Performance, boundary, concurrent | 4 | 3 | 0 | 7 |
| **Total** | | **33** | **6** | **3** | **42** |

---

## Feature File Mapping

| TC Range | Feature File | Tags |
|----------|-------------|------|
| TC01-TC03 | Manual verification | `@NM-1303 @AC-1` |
| TC04-TC08 | `src/features/scoring/eodJobHariKerja.feature` | `@NM-1303 @AC-2` |
| TC09-TC12 | `src/features/scoring/eodJobVerifikatorAktif.feature` | `@NM-1303 @AC-3` |
| TC13-TC19 | `src/features/scoring/eodJobInisialisasiNilai.feature` | `@NM-1303 @AC-4` |
| TC20-TC24 | `src/features/scoring/eodJobReferensiHariKerja.feature` | `@NM-1303 @AC-5` |
| TC25-TC27 | `src/features/scoring/eodJobVerifikatorBaru.feature` | `@NM-1303 @AC-6` |
| TC28 | `src/features/scoring/eodJobNoHC.feature` | `@NM-1303 @AC-7` |
| TC29-TC31 | `src/features/scoring/eodJobIdempotency.feature` | `@NM-1303 @AC-8` |
| TC32-TC35 | `src/features/scoring/eodJobAlertRetrigger.feature` | `@NM-1303 @AC-9` |
| TC36-TC42 | `src/features/scoring/eodJobEdgeCases.feature` | `@NM-1303 @edge-case` |

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
| TC01-TC42 | | |
