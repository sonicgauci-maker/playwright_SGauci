# User Story: NM-1265 - Perpindahan Beban ke Achieved

| Field | Value |
|-------|-------|
| **Jira ID** | NM-1265 |
| **Type** | Story |
| **Parent** | NM-1250 |
| **Project** | New MiCare - Claim |
| **Status** | TEST |
| **Priority** | Medium |
| **Sprint** | Claim Operation Sprint 25, Sprint 26 |
| **Story Points** | 3 |
| **Reporter** | pujiyanto255 |
| **Assignee** | Muhammad Taufiqul Rahman |
| **Created** | 05/Jun/2026 |
| **Updated** | 03/Aug/2026 |

---

## User Story

**Sebagai** SPV  
**Saya ingin** klaim yang sudah selesai diverifikasi dan disetujui KaKLY / Kanit Klaim otomatis berpindah dari beban aktif ke achieved  
**Sehingga** data beban verifikator selalu akurat dan menjadi dasar distribusi klaim berikutnya yang tepat

---

## Acceptance Criteria

| AC# | Criteria |
|-----|----------|
| AC-1 | Klaim/batch berpindah dari hitungan beban (load) ke achieved ketika status klaim berubah menjadi 4400 dan status batch berubah menjadi 5105 (Register Review) |
| AC-2 | Selama klaim masih berada di antara status distributed (2202) dan selesai verifikasi (2209), klaim tetap dihitung sebagai beban aktif verifikator |
| AC-3 | Perpindahan dari beban ke achieved mempengaruhi perhitungan score achieved verifikator pada dashboard (dapat di-refresh untuk melihat data uptodate) |

---

## Definition of Done

- [ ] Semua Acceptance Criteria telah terpenuhi dan diverifikasi
- [ ] Fitur sudah di-review oleh PO dan disetujui
- [ ] Tidak ada bug kritikal yang belum terselesaikan
- [ ] Dokumentasi diperbarui jika ada perubahan alur atau rule bisnis
- [ ] Fitur sudah di-deploy ke development

---

## Wireframe Description

> Story ini merupakan **backend logic / business rule** yang berjalan secara event-driven (triggered by status change).  
> Output dari proses ini mempengaruhi data di dashboard monitoring beban kerja verifikator (story terpisah).

### Visualisasi Flow Perpindahan Beban

```
┌────────────────────────────────────────────────────────────────────────────┐
│  PERPINDAHAN BEBAN KE ACHIEVED                                             │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌───────────────────────────────────────────────────────────────────┐     │
│  │ BEBAN AKTIF (Load)                                                │     │
│  │                                                                   │     │
│  │  Status Klaim: 2202 (Distributed) ──────────────── 2209 (Selesai  │     │
│  │                                                     Verifikasi)   │     │
│  │                                                                   │     │
│  │  ► Klaim dihitung sebagai beban aktif verifikator                 │     │
│  └────────────────────────────────────────┬──────────────────────────┘     │
│                                           │                                │
│                                           │ Status Klaim → 4400            │
│                                           │ Status Batch → 5105            │
│                                           │ (Register Review)              │
│                                           │                                │
│                                           v                                │
│  ┌───────────────────────────────────────────────────────────────────┐     │
│  │ ACHIEVED                                                          │     │
│  │                                                                   │     │
│  │  ► Klaim tercatat sebagai achieved                                │     │
│  │  ► Score achieved verifikator bertambah                           │     │
│  │  ► Load TIDAK berkurang (tetap tercatat)                          │     │
│  │  ► Dashboard ter-update (setelah refresh)                         │     │
│  └───────────────────────────────────────────────────────────────────┘     │
│                                                                            │
│  ┌───────────────────────────────────────────────────────────────────┐     │
│  │ DAMPAK KE DASHBOARD                                               │     │
│  │                                                                   │     │
│  │  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐     │     │
│  │  │ Load (Beban) │    │ Achieved     │    │ Score Gap        │     │     │
│  │  │ TETAP        │    │ BERTAMBAH    │    │ BERKURANG        │     │     │
│  │  └──────────────┘    └──────────────┘    └──────────────────┘     │     │
│  │                                                                   │     │
│  │  ► SPV refresh dashboard → data uptodate                         │     │
│  └───────────────────────────────────────────────────────────────────┘     │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### State Transition Diagram - Status Klaim

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│    2202      │ ──────> │  ... (proses │ ──────> │    2209      │
│ Distributed  │         │  verifikasi) │         │ Selesai      │
│              │         │              │         │ Verifikasi   │
└──────────────┘         └──────────────┘         └──────┬───────┘
                                                         │
      ▲ BEBAN AKTIF (Load dihitung)                      │
      │─────────────────────────────────────────────────>│
                                                         │
                                                         │ Approval KaKLY /
                                                         │ Kanit Klaim
                                                         v
                                                  ┌──────────────┐
                                                  │    4400      │
                                                  │ (Approved)   │
                                                  │              │
                                                  └──────┬───────┘
                                                         │
                                                         │ Batch → 5105
                                                         │ (Register Review)
                                                         v
                                                  ┌──────────────┐
                                                  │  ACHIEVED    │
                                                  │  (score +N)  │
                                                  │  (load tetap)│
                                                  └──────────────┘
```

---

## Technical Context

### Trigger Condition

Perpindahan beban ke achieved terjadi ketika **kedua kondisi** terpenuhi secara bersamaan:

| Condition | Value | Description |
|-----------|-------|-------------|
| Status Klaim | 4400 | Klaim sudah disetujui KaKLY / Kanit Klaim |
| Status Batch | 5105 | Register Review (batch selesai diproses) |

### Affected Table

**Table:** `verificator_scored` (existing — diinisialisasi oleh NM-1303)

| Column | Impact | Description |
|--------|--------|-------------|
| load | TETAP / INCREMENT | Tetap atau bertambah sesuai score klaim yang diterima (TIDAK berkurang saat achieved) |
| achieved_score | INCREMENT | Bertambah sesuai score klaim yang di-achieved |
| score_gap | RECALCULATE | Dihitung ulang berdasarkan formula: `score_max - achieved_score` |

### Status Reference

**Status Klaim (range beban aktif):**

| Status Code | Name | Beban Aktif? |
|-------------|------|:------------:|
| 2202 | Distributed | ✅ Ya |
| ... | (proses verifikasi) | ✅ Ya |
| 2209 | Selesai Verifikasi | ✅ Ya |
| 4400 | Approved (KaKLY/Kanit) | ❌ Tidak (pindah ke achieved) |

**Status Batch:**

| Status Code | Name | Description |
|-------------|------|-------------|
| 5105 | Register Review | Batch sudah masuk tahap review/register |

### Business Logic (Pseudocode)

```
// Event listener: triggered when claim is approved by KaKLY/Kanit

function onClaimApproved(claimId, batchId):
    // AC-1: Saat approve, status klaim → 4400 dan batch → 5105 BERSAMAAN
    
    // Get verifikator yang handle klaim ini
    verificator = getVerificatorByClaimId(claimId)
    
    // Get score klaim (variable per klaim)
    claimScore = getClaimScore(claimId)
    
    // Get record verificator_scored hari ini
    today = getCurrentDate()
    record = getVerificatorScored(verificator.id, today)
    
    if record exists:
        // Update: achieved bertambah, load TETAP (tidak dikurangi)
        record.achieved_score = record.achieved_score + claimScore  // tambah achieved
        record.score_gap = record.score_max - record.achieved_score  // recalculate gap
        // record.load TIDAK BERUBAH — load tetap sesuai jumlah klaim yang diterima
        
        saveRecord(record)
    else:
        // Record belum ada (misal job belum jalan) — dihitung 0
        log("Record belum ada, achieved dihitung 0")
    
    log("Klaim {claimId} achieved untuk verifikator {verificator.id}, score +{claimScore}")

// AC-2: Selama status masih di range 2202–2209, tetap dihitung sebagai beban
// Load BERTAMBAH saat klaim di-distribute, TIDAK berkurang saat achieved

// AC-3: Dashboard refresh
// Dashboard membaca data dari verificator_scored
// User melakukan manual refresh untuk melihat data terbaru

// ROLLBACK: Jika status klaim di-revert dari 4400
// achieved_score dan load TIDAK dikurangi — data bersifat append-only
```

### Related Stories & Dependencies

| Relationship | Key | Summary | Impact |
|---|---|---|---|
| Parent | NM-1250 | Parent Epic | Epic distribusi & scoring |
| Sibling | NM-1303 | Inisialisasi Data Harian Verifikator | Membuat record awal `verificator_scored` yang di-update oleh story ini |
| Sibling | NM-1286 | Setting KOPS Scoring | Menentukan score/bobot klaim |
| Causes (Outward) | ITQ-1250 | Incident/Problem | Issue yang terkait |

### Sub-tasks

| Key | Summary |
|-----|---------|
| NM-1307 | Subtask 1 |
| NM-1308 | Subtask 2 |
| NM-1412 | Subtask 3 |

---

## Functional Requirements

| FR# | Requirement |
|-----|-------------|
| FR-01 | Sistem memindahkan klaim dari hitungan beban (load) ke achieved ketika status klaim = 4400 DAN status batch = 5105 |
| FR-02 | Perpindahan bersifat event-driven — terjadi secara otomatis saat kedua status terpenuhi |
| FR-03 | Selama status klaim berada di range 2202–2209, klaim tetap dihitung sebagai beban aktif verifikator |
| FR-04 | Setelah perpindahan, field `load` pada `verificator_scored` TIDAK berkurang — load tetap atau bertambah sesuai klaim yang diterima |
| FR-05 | Setelah perpindahan, field `achieved_score` pada `verificator_scored` bertambah sesuai score klaim |
| FR-06 | Field `score_gap` di-recalculate setelah perpindahan (formula: `score_max - achieved_score`) |
| FR-07 | Perpindahan mempengaruhi perhitungan distribusi klaim berikutnya (verifikator dengan load lebih rendah diprioritaskan) |
| FR-08 | Dashboard menampilkan data uptodate setelah user melakukan refresh |
| FR-09 | Perpindahan terjadi saat approve — status klaim 4400 dan status batch 5105 berubah bersamaan |
| FR-10 | Rollback status klaim dari 4400 TIDAK mengurangi achieved_score dan load — data achieved bersifat append-only |

---

## Edge Cases

| # | Scenario | Expected Behavior |
|---|----------|-------------------|
| EC-01 | Status klaim belum 4400 (belum di-approve) | Klaim TIDAK berpindah ke achieved — harus di-approve dulu |
| EC-02 | Klaim sudah selesai verifikasi (2209) tapi belum di-approve | Klaim tetap di beban aktif — perpindahan hanya terjadi saat approve |
| EC-03 | Klaim disetujui di hari yang berbeda dari hari distribusi (cross-day) | Achieved dihitung di hari saat approval terjadi (hari ini), bukan hari distribusi |
| EC-04 | Klaim disetujui sebelum job inisialisasi harian jalan (sebelum 00:10) | Edge case timing — perlu klarifikasi apakah achieved masuk ke record hari sebelumnya atau hari ini |
| EC-05 | Multiple klaim dari satu verifikator disetujui secara bersamaan | Setiap klaim di-proses individual — load berkurang dan achieved bertambah per klaim |
| EC-06 | Score klaim = 0 (klaim tanpa score) | Perpindahan tetap terjadi tapi tidak mempengaruhi angka load/achieved |
| EC-07 | Verifikator tidak memiliki record `verificator_scored` hari ini | Achieved dihitung sebagai 0 (record belum ada). Sistem tidak error |
| EC-08 | Load verifikator sudah 0 saat klaim di-achieved | Load tetap 0 (tidak berubah), achieved tetap bertambah — karena load dan achieved independen |
| EC-09 | Status klaim berubah langsung dari < 2209 ke 4400 (skip status) | Selama kondisi 4400 + 5105 terpenuhi, perpindahan tetap terjadi |
| EC-10 | Klaim yang sudah di-achieved kemudian statusnya di-rollback | Achieved dan load TIDAK dikurangi — data bersifat append-only. Rollback tidak mempengaruhi score yang sudah tercatat |
| EC-11 | Dashboard di-refresh tapi data belum ter-update (eventual consistency) | Dashboard menampilkan data terakhir yang tersedia — user bisa refresh ulang |
| EC-12 | Klaim disetujui di hari libur (jika ada proses manual) | Perlu klarifikasi: apakah achieved dihitung di hari libur atau di hari kerja berikutnya? |
| EC-13 | Batch berisi multiple klaim — sebagian klaim sudah 4400, sebagian belum | Setiap klaim di-evaluate individual berdasarkan statusnya masing-masing |
| EC-14 | Network timeout saat update `verificator_scored` setelah status change | Perlu retry mechanism atau eventual consistency pattern |
| EC-15 | Concurrent status update pada klaim yang sama | Race condition — perlu locking mechanism atau optimistic concurrency |
| EC-16 | Achieved score melebihi score_max verifikator | score_gap menjadi negatif — perlu klarifikasi apakah ini valid |

---

## Assumptions

| # | Assumption |
|---|---|
| A-01 | Record `verificator_scored` untuk hari ini sudah tersedia (dibuat oleh job NM-1303 pada pukul 00:10 WIB) |
| A-02 | "Score klaim" yang dimaksud sudah terdefinisi dan tersedia dari scoring system (NM-1286 / NM-1447) |
| A-03 | Perpindahan terjadi secara real-time (event-driven) begitu kedua status terpenuhi, bukan batch processing |
| A-04 | Dashboard yang dimaksud di AC-3 adalah dashboard monitoring SPV yang menampilkan beban & achieved verifikator |
| A-05 | "Refresh" pada dashboard adalah manual action oleh user (bukan auto-refresh) |
| A-06 | Rollback status klaim dari 4400 TIDAK mengurangi achieved_score dan load — data achieved bersifat append-only |
| A-07 | Satu klaim hanya bisa di-assigned ke satu verifikator (tidak ada shared ownership) |
| A-08 | Perpindahan beban ke achieved tidak membedakan jenis klaim (semua tipe klaim diperlakukan sama) |
| A-09 | Formula score_gap = score_max - achieved_score (konsisten dengan NM-1303 yang menginisialisasi score_gap = 0 di awal hari) |
| A-10 | "Distribusi klaim berikutnya" yang dimaksud di value statement mengacu pada mekanisme auto-distribute yang memperhitungkan load verifikator |
| A-11 | Status klaim 4400 dan batch 5105 terjadi BERSAMAAN saat approve — bukan sequential |
| A-12 | Score klaim bersifat variable (berbeda-beda per klaim), bukan fixed value |
| A-13 | Load tidak berkurang saat achieved — load dan achieved adalah pencatatan independen. Load tetap atau bertambah sesuai klaim yang diterima |
| A-14 | Batch dan klaim memiliki relasi flexible: bisa 1-to-1 maupun 1-to-many |
| A-15 | Klaim yang di-reject tetap dihitung sebagai beban karena sudah diproses oleh verifikator |
| A-16 | Rollback status klaim TIDAK mempengaruhi score/achieved — bersifat append-only |

---

## Missing Details / Open Questions

| # | Question | Status |
|---|----------|--------|
| MD-01 | Apakah kedua kondisi (status klaim 4400 + batch 5105) selalu terjadi bersamaan atau bisa terjadi di waktu berbeda? Mana yang terjadi lebih dulu? | **Resolved** — Bersamaan. Status 4400 dan batch 5105 terjadi bersamaan saat approve dilakukan |
| MD-02 | Berapa "score" yang dipindahkan per klaim? Apakah score ini berasal dari scoring klaim (NM-1447) atau fixed value? | **Resolved** — Variable. Score per klaim berbeda-beda (bukan fixed value) |
| MD-03 | Jika klaim disetujui setelah jam 00:10 tapi sebelum EOD, achieved masuk ke record hari apa? | Open |
| MD-04 | Apakah ada mekanisme rollback/reverse jika status klaim di-revert dari 4400? | **Resolved** — Ada mekanisme rollback status, TAPI rollback TIDAK mengurangi achieved_score dan load. Data achieved bersifat append-only |
| MD-05 | Bagaimana handling jika record `verificator_scored` belum ada untuk hari ini (job belum jalan atau gagal)? | **Resolved** — Jika belum ada, dihitung 0 |
| MD-06 | Apakah load bisa menjadi negatif? Atau di-cap minimum 0? | **Resolved** — Tidak bisa negatif. Load di-cap minimum 0 menggunakan formula MAX(0, load - achieved) |
| MD-07 | Apakah ada notifikasi/event ke sistem lain setelah perpindahan terjadi? | Open |
| MD-08 | Status klaim apa saja yang termasuk dalam range 2202–2209? Apakah ada status di antaranya? | **Resolved** — Ada berbagai status di antaranya. Secara general, semua status di range 2202–2209 dianggap beban aktif |
| MD-09 | Apakah batch dan klaim memiliki relasi one-to-one atau one-to-many? | **Resolved** — Bisa keduanya: 1-to-1 dan 1-to-many (satu batch bisa berisi satu atau banyak klaim) |
| MD-10 | Bagaimana penanganan klaim yang di-reject (bukan 4400)? Apakah tetap di beban atau di-remove? | **Resolved** — Tetap dihitung sebagai beban karena sudah diproses oleh verifikator |
| MD-11 | Kapan tepatnya "distribusi klaim berikutnya" terjadi — real-time atau batch? | Open |
| MD-12 | Apakah perpindahan ini mempengaruhi carry-over load di hari berikutnya (terkait NM-1303)? | Open |
| MD-13 | Dashboard refresh — apakah perlu mekanisme cache invalidation atau direct DB read? | Open |

---

## Impact Analysis

| Area | Impact | Detail |
|------|--------|--------|
| NM-1303 (Inisialisasi Harian) | High | Story ini meng-update field yang diinisialisasi oleh NM-1303. Carry-over load di hari berikutnya dipengaruhi oleh achieved hari ini |
| NM-1286 (KOPS Score Setting) | Medium | Score/bobot klaim yang menentukan berapa angka yang dipindahkan dari load ke achieved |
| NM-1447 (Score Claim) | Medium | Score klaim individual yang menjadi basis perhitungan achieved |
| Dashboard Monitoring SPV | High | Data yang ditampilkan di dashboard langsung dipengaruhi oleh proses ini |
| Auto-Distribute Mechanism | High | Distribusi klaim baru memperhitungkan load verifikator — jika load tidak akurat, distribusi tidak adil |
| NM-1250 (Parent Epic) | Medium | Story ini bagian dari ecosystem scoring & distribusi klaim |
| ITQ-1250 (Problem/Incident) | Low | Issue terkait yang mungkin timbul dari behavior ini |

---

## Risk Assessment

| # | Risk | Probability | Impact | Level | Mitigation |
|---|------|-------------|--------|-------|------------|
| R-01 | Perpindahan tidak terjadi (missed event) → load verifikator tidak akurat → distribusi tidak adil | Medium | High | **High** | Event-driven dengan retry mechanism + monitoring |
| R-02 | Race condition saat multiple klaim disetujui bersamaan → data inconsistency | Medium | High | **High** | Optimistic locking / database transaction isolation |
| R-03 | Record `verificator_scored` belum ada saat perpindahan → error/data loss | Low | High | **Medium** | Defensive coding: create record if not exists, atau queue event |
| R-04 | Score calculation salah → achieved tidak akurat → distribusi bias | Medium | High | **High** | Unit test + integration test formula calculation |
| R-05 | Timing issue: klaim disetujui di perbatasan hari (sekitar 00:00–00:10) | Low | Medium | **Low** | Clear rule: achieved dihitung berdasarkan timestamp approval |
| R-06 | Dashboard tidak refresh otomatis → SPV melihat data stale → keputusan salah | Medium | Medium | **Medium** | Clear UX: indikator "last updated" + manual refresh button |
| R-07 | Status rollback setelah achieved → data inconsistency tanpa reverse mechanism | Low | High | **Medium** | Clarify business rule: apakah rollback dimungkinkan? |

---

## Relationship to Other Stories

```
┌─────────────────────────────────────────────────────────────────┐
│ NM-1250 (Parent Epic: Scoring & Distribusi)                     │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ NM-1303      │  │ NM-1265      │  │ NM-1286              │  │
│  │ Inisialisasi │──│ Perpindahan  │──│ Setting KOPS Scoring │  │
│  │ Data Harian  │  │ Beban ke     │  │                      │  │
│  │              │  │ Achieved     │  │                      │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────────────────┘  │
│         │                  │                                    │
│         │  Inisialisasi    │  Update                            │
│         │  record pagi     │  record siang                      │
│         v                  v                                    │
│  ┌─────────────────────────────────────┐                        │
│  │ verificator_scored                  │                        │
│  │ (load, achieved_score, score_gap)   │                        │
│  └─────────────────────────────────────┘                        │
│         │                                                       │
│         │  Dibaca oleh                                           │
│         v                                                       │
│  ┌──────────────────────┐                                       │
│  │ Dashboard Monitoring │                                       │
│  │ SPV / Kepala Cabang  │                                       │
│  └──────────────────────┘                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## References

- Test Cases: [NM-1265 Test Cases](../test-cases/NM-1265-test-cases.md) (TBD)
- Feature File: `src/features/scoring/perpindahanBebanKeAchieved.feature` (TBD)
- Traceability: [Traceability Matrix](../traceability.md)
- Related Stories:
  - [NM-1303 - Inisialisasi Data Harian Verifikator](./NM-1303-inisialisasi-data-harian-verifikator.md)
  - [NM-1286 - Setting KOPS Scoring](./NM-1286-setting-kops-scoring.md)
  - NM-1250 (Parent Epic)
  - ITQ-1250 (Problem/Incident - caused by this story)
