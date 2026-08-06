# User Story: NM-1303 - Inisialisasi Data Harian Verifikator (EOD Job)

| Field | Value |
|-------|-------|
| **Jira ID** | NM-1303 |
| **Type** | Story |
| **Parent** | NM-1250 |
| **Project** | New MiCare - Claim |
| **Status** | TEST |
| **Priority** | Medium |
| **Sprint** | Claim Operation Sprint 25, Sprint 26 |
| **Story Points** | 5 |
| **Reporter** | pujiyanto255 |
| **Assignee** | Muhammad Taufiqul Rahman |
| **Created** | 18/Jun/2026 |
| **Updated** | 22/Jul/2026 |

---

## User Story

**Sebagai** SPV / Kepala Cabang  
**Saya ingin** data beban kerja dan pencapaian score verifikator otomatis ter-reset setiap awal hari kerja dengan sisa beban dari hari sebelumnya yang terbawa  
**Sehingga** saya dapat langsung memantau kinerja tim dari awal hari tanpa perlu setup manual dan tidak ada klaim tertinggal yang luput dari perhatian

---

## Acceptance Criteria

| AC# | Criteria |
|-----|----------|
| AC-1 | Scheduler berjalan setiap hari pukul 00:10 WIB |
| AC-2 | Sebelum membuat record, sistem mengecek apakah hari ini adalah hari kerja (bukan hari libur berdasarkan tabel referensi). Jika hari libur, job tidak membuat record apapun (skip) |
| AC-3 | Jika hari ini adalah hari kerja, sistem membuat record baru di `verificator_scored` untuk semua verifikator aktif |
| AC-4 | Setiap record baru diisi dengan: `achieved_score = 0`, `score_gap = 0`, `load = MAX(0, load_hari_kerja_sebelumnya - achieved_score_hari_kerja_sebelumnya)` |
| AC-5 | Referensi "hari kerja sebelumnya" adalah hari kerja terakhir (bukan literal kemarin). Contoh: jika hari ini Senin, maka referensinya adalah Jumat |
| AC-6 | Jika verifikator tidak memiliki record di hari kerja sebelumnya (misalnya verifikator baru), load default = 0 |
| AC-7 | Tidak ada pengecekan integrasi ke sistem HC — semua verifikator aktif dianggap masuk kerja |
| AC-8 | Job bersifat idempotent — jika record untuk hari ini sudah ada, tidak membuat duplikat |
| AC-9 | Jika job gagal, alert dikirim ke tim dan dapat di-trigger ulang secara manual |

---

## Definition of Done

- [ ] Semua Acceptance Criteria telah terpenuhi dan diverifikasi
- [ ] Sudah di-test oleh QA
- [ ] Fitur sudah di-review oleh PO dan disetujui
- [ ] Tidak ada bug kritikal yang belum terselesaikan
- [ ] Dokumentasi diperbarui jika ada perubahan alur atau rule bisnis

---

## Wireframe Description

> Story ini adalah **backend scheduler/job** dan tidak memiliki UI langsung.  
> Output dari job ini (record `verificator_scored`) kemungkinan ditampilkan di halaman monitoring/dashboard verifikator (story terpisah).

### Visualisasi Flow Job

```
┌────────────────────────────────────────────────────────────────────────────┐
│  EOD SCHEDULER - Inisialisasi Data Harian Verifikator                      │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌──────────────┐                                                          │
│  │ Trigger      │  Setiap hari pukul 00:10 WIB                             │
│  │ (Cron Job)   │                                                          │
│  └──────┬───────┘                                                          │
│         │                                                                  │
│         v                                                                  │
│  ┌──────────────────────┐                                                  │
│  │ Cek Hari Kerja?      │──── TIDAK (hari libur) ──── [SKIP / END]         │
│  │ (tabel referensi)    │                                                  │
│  └──────┬───────────────┘                                                  │
│         │ YA                                                               │
│         v                                                                  │
│  ┌──────────────────────┐                                                  │
│  │ Cek Record Hari Ini  │──── SUDAH ADA ──── [SKIP / END] (idempotent)     │
│  │ Sudah Ada?           │                                                  │
│  └──────┬───────────────┘                                                  │
│         │ BELUM ADA                                                        │
│         v                                                                  │
│  ┌──────────────────────┐                                                  │
│  │ Ambil Semua          │                                                  │
│  │ Verifikator Aktif    │                                                  │
│  └──────┬───────────────┘                                                  │
│         │                                                                  │
│         v                                                                  │
│  ┌──────────────────────────────────────────┐                              │
│  │ Untuk setiap verifikator:                │                              │
│  │                                          │                              │
│  │  1. Cari record hari kerja sebelumnya    │                              │
│  │  2. Hitung carry-over load:              │                              │
│  │     load = MAX(0, prev_load - prev_score)│                              │
│  │  3. Buat record baru:                    │                              │
│  │     - achieved_score = 0                 │                              │
│  │     - score_gap = 0                      │                              │
│  │     - load = carry-over (atau 0 default) │                              │
│  └──────┬───────────────────────────────────┘                              │
│         │                                                                  │
│         v                                                                  │
│  ┌──────────────┐                                                          │
│  │ SELESAI      │  Log sukses / kirim notifikasi                           │
│  └──────────────┘                                                          │
│                                                                            │
│  ┌──────────────┐                                                          │
│  │ GAGAL?       │ ──── Alert ke tim + retry manual available               │
│  └──────────────┘                                                          │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Technical Context

### Database Schema

**Table:** `verificator_scored` (existing / to be created)

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL / UUID | Primary key |
| verificator_id | VARCHAR / UUID | FK ke tabel verifikator |
| date | DATE | Tanggal hari kerja |
| achieved_score | INTEGER | Score yang dicapai hari ini (diisi 0 saat inisialisasi) |
| score_gap | INTEGER | Selisih target vs achieved (diisi 0 saat inisialisasi) |
| load | INTEGER | Beban kerja carry-over dari hari sebelumnya |
| created_at | TIMESTAMP | Timestamp pembuatan record |
| created_by | VARCHAR | System / Job identifier |

**Unique Constraint (idempotency):** `UNIQUE(verificator_id, date)`

### Tabel Referensi

**Table referensi hari libur** (existing / assumed):

| Column | Type | Description |
|--------|------|-------------|
| date | DATE | Tanggal libur |
| description | VARCHAR | Keterangan (misal: "Tahun Baru", "Idul Fitri") |
| is_active | BOOLEAN | Status aktif |

**Table verifikator** (existing / assumed):

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR | Nama verifikator |
| kops_code | VARCHAR | Kode KOPS |
| is_active | BOOLEAN | Status aktif |

### Scheduler Configuration

- **Cron Expression:** `10 0 * * *` (setiap hari 00:10 WIB / 17:10 UTC hari sebelumnya)
- **Timezone:** Asia/Jakarta (WIB)
- **Retry Policy:** Manual re-trigger jika gagal
- **Alert Channel:** Tim (Slack / monitoring tool)

### Business Logic (Pseudocode)

```
function initializeDailyVerificatorScore():
    today = getCurrentDate()
    
    // AC-2: Cek hari kerja
    if isHoliday(today):
        log("Hari libur, job di-skip")
        return SUCCESS
    
    // AC-8: Cek idempotency
    if recordsExistForDate(today):
        log("Record sudah ada untuk hari ini, skip")
        return SUCCESS
    
    // AC-3: Ambil semua verifikator aktif
    activeVerificators = getActiveVerificators()
    
    // AC-5: Cari hari kerja sebelumnya (skip holidays/weekends)
    previousWorkday = findPreviousWorkday(today)
    
    for each verificator in activeVerificators:
        // AC-4 & AC-6: Hitung carry-over load
        prevRecord = getRecord(verificator.id, previousWorkday)
        
        if prevRecord exists:
            carryOverLoad = MAX(0, prevRecord.load - prevRecord.achieved_score)
        else:
            carryOverLoad = 0  // verifikator baru
        
        // AC-3: Buat record baru
        createRecord(
            verificator_id = verificator.id,
            date = today,
            achieved_score = 0,
            score_gap = 0,
            load = carryOverLoad
        )
    
    return SUCCESS
```

### Issue Links

| Relationship | Key | Summary |
|---|---|---|
| Blocks | NM-1264 | (blocked story) |

### Sub-tasks

| Key | Summary |
|-----|---------|
| NM-1304 | Subtask 1 |
| NM-1305 | Subtask 2 |
| NM-1306 | Subtask 3 |
| NM-1378 | Subtask 4 |

---

## Functional Requirements

| FR# | Requirement |
|-----|-------------|
| FR-01 | Sistem menjalankan scheduler job secara otomatis setiap hari pukul 00:10 WIB |
| FR-02 | Sistem mengecek hari kerja berdasarkan tabel referensi hari libur sebelum memproses data |
| FR-03 | Jika hari libur, job tidak membuat record dan dianggap sukses (silent skip) |
| FR-04 | Sistem mengambil daftar semua verifikator dengan status aktif |
| FR-05 | Sistem menentukan hari kerja sebelumnya dengan meng-skip hari libur dan weekend |
| FR-06 | Sistem menghitung carry-over load: `MAX(0, load_prev - achieved_score_prev)` |
| FR-07 | Jika tidak ada record di hari kerja sebelumnya, load default = 0 |
| FR-08 | Sistem membuat record baru di `verificator_scored` dengan achieved_score = 0, score_gap = 0, dan load = carry-over |
| FR-09 | Job bersifat idempotent — tidak membuat duplikat jika record sudah ada |
| FR-10 | Jika job gagal, sistem mengirim alert ke tim teknis |
| FR-11 | Job dapat di-trigger ulang secara manual oleh tim teknis |
| FR-12 | Tidak ada integrasi ke sistem HC untuk pengecekan kehadiran |

---

## Edge Cases

| # | Scenario | Expected Behavior |
|---|----------|-------------------|
| EC-01 | Job jalan di hari libur nasional (misal: 1 Januari) | Job skip, tidak membuat record apapun |
| EC-02 | Job jalan di hari Sabtu/Minggu | Tergantung definisi hari kerja di tabel referensi — jika Sabtu/Minggu tidak ada di tabel kerja, skip |
| EC-03 | Hari Senin setelah long weekend (misal: Jumat libur) | Referensi hari kerja sebelumnya = Kamis (bukan Jumat) |
| EC-04 | Cuti bersama berturut-turut (misal: Lebaran 5 hari) | Referensi = hari kerja terakhir sebelum periode cuti |
| EC-05 | Verifikator baru (belum pernah punya record) | Load default = 0, achieved_score = 0, score_gap = 0 |
| EC-06 | Verifikator di-nonaktifkan hari ini | Tidak dibuat record (karena filter hanya verifikator aktif) |
| EC-07 | Verifikator diaktifkan kembali setelah lama non-aktif | Load default = 0 (tidak ada record di hari kerja sebelumnya) |
| EC-08 | Job di-trigger ulang secara manual setelah berhasil | Idempotent — tidak membuat duplikat (unique constraint) |
| EC-09 | Job di-trigger ulang setelah gagal partial | Karena transactional (all-or-nothing), jika gagal seharusnya tidak ada record yang tersimpan. Re-trigger akan memproses ulang dari awal |
| EC-10 | Semua verifikator non-aktif | Job sukses tanpa membuat record (list kosong) |
| EC-11 | Tabel referensi hari libur kosong (tidak ada data) | Setiap hari dianggap hari kerja |
| EC-12 | Load hari sebelumnya = 100, achieved_score = 150 (melebihi load) | Carry-over = MAX(0, 100-150) = 0 (tidak negatif) |
| EC-13 | Load hari sebelumnya = 100, achieved_score = 0 (tidak kerja) | Carry-over = MAX(0, 100-0) = 100 (full carry-over) |
| EC-14 | Load hari sebelumnya = 0, achieved_score = 0 | Carry-over = 0 |
| EC-15 | Database connection timeout saat job berjalan | Job gagal, alert dikirim, bisa retry manual |
| EC-16 | Concurrent execution (job terpanggil 2x secara bersamaan) | Unique constraint mencegah duplikat; salah satu akan conflict → handled gracefully |
| EC-17 | Server timezone berubah / mismatch | Job harus berjalan di WIB (Asia/Jakarta) — perlu validasi konfigurasi timezone |
| EC-18 | Tahun kabisat — 29 Februari sebagai hari kerja | Harus di-handle normal jika bukan hari libur |
| EC-19 | Awal tahun (1 Januari) — hari kerja sebelumnya di tahun sebelumnya | Sistem harus bisa cross-year lookup |
| EC-20 | Jumlah verifikator aktif sangat banyak (1000+) | Job harus bisa handle batch processing tanpa timeout |

---

## Assumptions

| # | Assumption |
|---|---|
| A-01 | Tabel referensi hari libur sudah tersedia dan di-maintain oleh tim admin/HR |
| A-02 | Penentuan hari kerja vs bukan hari kerja (termasuk weekend) sepenuhnya berdasarkan tabel referensi hari libur |
| A-03 | "Verifikator aktif" ditentukan oleh field `is_active = true` pada tabel master verifikator |
| A-04 | Formula carry-over load menggunakan field `load` (bukan `target_score` dari KOPS Setting) |
| A-05 | Job ini merupakan prasyarat/blocker untuk NM-1264 (sesuai issue link) |
| A-06 | Alert mekanisme sudah tersedia (monitoring system / Slack webhook / email) |
| A-07 | Manual trigger dilakukan oleh tim teknis (DevOps/Backend) via endpoint atau command |
| A-08 | Timezone server sudah di-set ke Asia/Jakarta (WIB) |
| A-09 | `score_gap` diinisialisasi 0 dan akan dihitung/di-update oleh proses lain di siang hari |
| A-10 | Job ini tidak bertanggung jawab untuk mengisi `target_score` — target ditentukan dari kombinasi config KOPS score (NM-1286) dan score max masing-masing verifikator |
| A-11 | "Hari kerja sebelumnya" lookup menggunakan tabel referensi hari libur — hari yang tidak ada di tabel = hari kerja |
| A-12 | Idempotency di-handle secara transactional (all-or-nothing) — jika gagal di tengah, rollback semua |

---

## Missing Details / Open Questions

| # | Question | Status |
|---|----------|--------|
| MD-01 | Bagaimana definisi weekend? Apakah Sabtu-Minggu hardcoded atau ikut tabel referensi? | **Resolved** — Ada tabel referensi hari libur yang juga mencakup weekend/hari non-kerja |
| MD-02 | Apakah ada endpoint manual trigger? Jika ya, siapa yang punya akses dan bagaimana auth-nya? | Open |
| MD-03 | Alert dikirim ke mana? (Slack, email, monitoring dashboard?) | Open |
| MD-04 | Bagaimana handling jika job gagal partial (sebagian verifikator sudah di-create)? Rollback atau continue? | **To Be Discussed** |
| MD-05 | Apakah ada logging/audit trail untuk setiap eksekusi job? | Open |
| MD-06 | Apakah field `load` di `verificator_scored` ini sama dengan beban klaim yang harus diverifikasi? | Open |
| MD-07 | Relasi antara `load` di sini dengan `target_score` dari config KOPS scoring dan score max verifikator — bagaimana interaksinya? | **Resolved** — Score max verifikator sudah existing di sistem. Formula `score_gap = score_max_verifikator - achieved_score`. Job ini hanya inisialisasi ke 0, kalkulasi gap terjadi di proses lain saat hari berjalan |
| MD-08 | Apakah `score_gap` di-update oleh proses lain di hari yang sama? Jika ya, story mana? | Open |
| MD-09 | Batas waktu job harus selesai? (SLA execution time) | Open |
| MD-10 | Apakah perlu idempotency per-verifikator (partial success) atau all-or-nothing (transactional)? | **Resolved** — Per transactional (all-or-nothing) |
| MD-11 | Jika tabel referensi hari libur belum diisi untuk tanggal tertentu, apakah default = hari kerja? | Open |
| MD-12 | Apakah ada monitoring dashboard untuk melihat status eksekusi job harian? | Open |
| MD-13 | Bagaimana penanganan jika verifikator di-nonaktifkan di tengah hari setelah record dibuat? | Open |
| MD-14 | Apakah carry-over load ada batas maksimum (cap)? | Open |
| MD-15 | Format alert saat job gagal — informasi apa saja yang harus disertakan? | Open |

---

## Impact Analysis

| Area | Impact | Detail |
|------|--------|--------|
| NM-1264 (Blocked Story) | High | Story ini menjadi blocker — NM-1264 bergantung pada data yang dihasilkan job ini |
| NM-1286 (KOPS Score Setting) | Medium | Target score dari KOPS setting kemungkinan dibandingkan dengan `achieved_score` yang diinisialisasi di sini |
| Dashboard Monitoring | Medium | Halaman monitoring SPV/Kepala Cabang bergantung pada record `verificator_scored` |
| Tabel Referensi Hari Libur | Low | Job bergantung pada data di tabel ini — jika tidak diisi, behavior bisa unexpected |
| Master Data Verifikator | Medium | Perubahan status verifikator (aktif/non-aktif) langsung mempengaruhi output job |

---

## Risk Assessment

| # | Risk | Probability | Impact | Level | Mitigation |
|---|------|-------------|--------|-------|------------|
| R-01 | Job gagal tanpa terdeteksi → data harian tidak ada | Medium | High | **High** | Implementasi alert mechanism + monitoring |
| R-02 | Tabel hari libur tidak di-update → job jalan di hari libur | Medium | Low | **Low** | SOP maintenance tabel referensi |
| R-03 | Concurrent execution → data corrupt | Low | High | **Medium** | Unique constraint + idempotent logic |
| R-04 | Performance issue saat verifikator banyak | Low | Medium | **Low** | Batch processing + timeout handling |
| R-05 | Timezone mismatch → job jalan di waktu salah | Low | High | **Medium** | Validasi konfigurasi timezone di deployment |
| R-06 | Carry-over calculation salah → beban kerja tidak akurat | Medium | High | **High** | Unit test + integration test formula |
| R-07 | Referensi hari kerja sebelumnya salah (mis: skip hari yg seharusnya hari kerja) | Medium | Medium | **Medium** | Test dengan berbagai skenario kalender |

---

## References

- Test Cases: [NM-1303 Test Cases](../test-cases/NM-1303-test-cases.md) (TBD)
- Feature File: `src/features/scoring/inisialisasiDataHarianVerifikator.feature` (TBD)
- Traceability: [Traceability Matrix](../traceability.md)
- Related Stories:
  - [NM-1286 - Setting KOPS Scoring](./NM-1286-setting-kops-scoring.md)
  - NM-1264 (Blocked by this story)
  - NM-1250 (Parent Epic)
