# User Story: NM-1286 - Setting KOPS Scoring

| Field | Value |
|-------|-------|
| **Jira ID** | NM-1286 |
| **Type** | Story |
| **Parent** | NM-1250 |
| **Project** | New MiCare - Claim |
| **Status** | TEST |
| **Priority** | Medium |
| **Sprint** | Claim Operation Sprint 24 |
| **Story Points** | 3 |
| **Reporter** | pujiyanto255 |
| **Assignee** | imam.nugroho |
| **Created** | 17/Jun/2026 |
| **Updated** | 30/Jun/2026 |

---

## User Story

**Sebagai** User Staff Klaim HO (Kantor Pusat)  
**Saya ingin** mengatur dan menyimpan bobot untuk masing-masing KOPS dalam periode bulanan  
**Sehingga** setiap KOPS, KLY, dan verifikator akan memiliki target bobot yang harus dikerjakan setiap hari dalam 1 bulan berjalan sesuai setting yang telah ditentukan

---

## Acceptance Criteria

| AC# | Criteria |
|-----|----------|
| AC-1 | Dapat melakukan dan menyimpan setting bobot setiap KOPS dalam periode 1 bulan |
| AC-2 | Setting tersebut merupakan target harian yang harus diselesaikan oleh verifikator |
| AC-3 | Target setiap verifikator dalam 1 KOPS pasti akan selalu sama setiap harinya |
| AC-4 | Bobot antar KOPS bisa disetting berbeda tergantung kondisi pada KOPS tersebut |
| AC-5 | Setting hanya dapat dilakukan oleh Staff Klaim Kantor Pusat / Kepala Departemen Klaim |
| AC-6 | Score hanya mengakomodir rentang 0 sd 500 |
| AC-7 | Tidak boleh ada 2 setting score duplicate untuk KOPS yang sama dan periode yang sama |
| AC-8 | Setting score untuk bulan berjalan dan yang sudah berlalu tidak dapat diubah |
| AC-9 | Setting score harus selalu dimulai tanggal 1 dan tanggal terakhir pada bulan yang dipilih |

---

## Definition of Done

- [ ] Semua Acceptance Criteria telah terpenuhi dan diverifikasi
- [ ] Tidak ada bug terkait setting bobot case
- [ ] Sudah dilakukan testing oleh QA

---

## Wireframe Description

### 1. Navigasi - Sub Menu Baru

- Penambahan sub menu **"Setting Score Parameter"** dan **"KOPS Score"** di sidebar kiri
- Lokasi: di bawah menu "Manajemen Klaim", sejajar dengan "Cross Verification"

### 2. Halaman List - KOPS Score Setting

```
┌──────────────────────────────────────────────────────────────────────┐
│  KOPS SCORE SETTING                                                  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Filter Periode                                                      │
│  ┌─────────────────────┐                                             │
│  │ ▼ Januari 2026      │                                             │
│  └─────────────────────┘                                             │
│                                                                      │
│  [+ Tambah Setting]                                                  │
│                                                                      │
├──────────┬─────────────────────────────┬───────────────┬─────────────┬──────────────┤
│  Action  │ KOPS                        │ Start Periode │ End Periode  │ Target Score │
├──────────┼─────────────────────────────┼───────────────┼─────────────┼──────────────┤
│  [Edit]  │ (1101) – SEMARANG           │ 1 Januari 2026│ 31 Januari 2026│    200    │
│  [Edit]  │ (1102) – SURABAYA           │ 1 Januari 2026│ 31 Januari 2026│    180    │
│  [Edit]  │ (1103) – JAKARTA            │ 1 Januari 2026│ 31 Januari 2026│    250    │
│  [Edit]  │ (1104) – BANDUNG            │ 1 Januari 2026│ 31 Januari 2026│    150    │
│  [Edit]  │ (1105) – MEDAN              │ 1 Januari 2026│ 31 Januari 2026│    170    │
├──────────┴─────────────────────────────┴───────────────┴─────────────┴──────────────┤
│  Showing 1-5 of 5 entries                                                            │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### 3. Form Input - KOPS Score Setting

```
┌──────────────────────────────────────────────────────────────────────┐
│  FORM – KOPS SCORE SETTING                                           │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  KOPS                                                                │
│  ┌────────────────────────────────┐                                  │
│  │ ▼ Pilih KOPS                   │                                  │
│  └────────────────────────────────┘                                  │
│  ( (1101) – SEMARANG / (1102) – SURABAYA / ... )                     │
│                                                                      │
│  Periode                                                             │
│  ┌────────────────────────────────┐                                  │
│  │ ▼ Pilih Bulan & Tahun          │                                  │
│  └────────────────────────────────┘                                  │
│  ( Januari 2026 / Februari 2026 / ... )                              │
│                                                                      │
│  Start Periode                                                       │
│  ┌────────────────────────────────┐                                  │
│  │ 1 Januari 2026    [auto-fill]  │                                  │
│  └────────────────────────────────┘                                  │
│  * otomatis terisi tanggal 1 bulan yang dipilih                      │
│                                                                      │
│  End Periode                                                         │
│  ┌────────────────────────────────┐                                  │
│  │ 31 Januari 2026   [auto-fill]  │                                  │
│  └────────────────────────────────┘                                  │
│  * otomatis terisi tanggal akhir bulan yang dipilih                  │
│                                                                      │
│  Target Score                                                        │
│  ┌────────────────────────────────┐                                  │
│  │ [ number input ]               │                                  │
│  └────────────────────────────────┘                                  │
│  * angka only, free input, rentang 0-500                             │
│                                                                      │
│  ┌──────────┐  ┌──────────┐                                         │
│  │  Simpan  │  │  Batal   │                                         │
│  └──────────┘  └──────────┘                                         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Technical Context

### Database Schema (Proposed)

**Table:** `public.config_kops_score`

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL / UUID | Primary key |
| kops_code | VARCHAR | Kode KOPS (e.g., 1101, 1102, 1103) |
| kops_name | VARCHAR | Nama KOPS (e.g., SEMARANG, SURABAYA) |
| period_month | INTEGER | Bulan periode (1-12) |
| period_year | INTEGER | Tahun periode (e.g., 2026) |
| start_period | DATE | Tanggal awal periode (always 1st of month) |
| end_period | DATE | Tanggal akhir periode (always last day of month) |
| target_score | INTEGER | Target score harian (0-500) |
| created_at | TIMESTAMP | Timestamp pembuatan record |
| created_by | VARCHAR | User yang membuat record |
| modified_at | TIMESTAMP | Timestamp modifikasi terakhir (nullable) |
| modified_by | VARCHAR | User yang terakhir memodifikasi (nullable) |

**Unique Constraint:** `UNIQUE(kops_code, period_month, period_year)`

### Access Control

- **Allowed:** Staff Klaim Kantor Pusat (HO) / Kepala Departemen Klaim
- **Denied:** User cabang / non-HO / role lain

### Business Rules

1. Target score per KOPS per periode bersifat harian — semua verifikator dalam KOPS tersebut memiliki target yang sama setiap hari
2. Bobot antar KOPS bisa berbeda sesuai kondisi masing-masing KOPS
3. Setting untuk bulan berjalan dan yang sudah lewat tidak dapat diubah (immutable)
4. Setting hanya valid untuk bulan penuh (tanggal 1 s.d. tanggal terakhir)
5. Tidak boleh ada duplikasi: 1 KOPS hanya boleh punya 1 setting per periode bulan

---

## Sub-tasks

| Key | Summary | Status |
|-----|---------|--------|
| NM-1295 | Subtask 1 | - |
| NM-1296 | Subtask 2 | - |
| NM-1297 | Subtask 3 | - |
| NM-1298 | Subtask 4 | - |
| NM-1299 | Subtask 5 | - |
| NM-1332 | Subtask 6 | - |
| NM-1355 | Subtask 7 | - |
| NM-1361 | Subtask 8 | - |

---

## Functional Requirements

| FR# | Requirement |
|-----|-------------|
| FR-01 | Sistem menampilkan halaman "KOPS Score Setting" dengan tabel list berisi kolom: Action, KOPS, Start Periode, End Periode, Target Score |
| FR-02 | Terdapat filter periode (bulan & tahun) untuk memfilter data di tabel |
| FR-03 | Terdapat tombol [+ Tambah Setting] untuk menambah entry KOPS scoring baru |
| FR-04 | Form input berisi field: KOPS (dropdown), Periode (dropdown bulan & tahun), Start Periode (auto-fill, read-only), End Periode (auto-fill, read-only), Target Score (number input) |
| FR-05 | Start Periode otomatis terisi tanggal 1 bulan yang dipilih |
| FR-06 | End Periode otomatis terisi tanggal terakhir bulan yang dipilih |
| FR-07 | Target Score hanya menerima angka dalam rentang 0-500 |
| FR-08 | Form memiliki tombol Simpan dan Batal |
| FR-09 | Data yang disimpan langsung muncul di list KOPS Score Setting |
| FR-10 | Setiap baris memiliki tombol [Edit] untuk mengubah target score |
| FR-11 | Hanya Staff Klaim Kantor Pusat / Kepala Departemen Klaim yang dapat mengakses halaman ini |
| FR-12 | Sistem memvalidasi tidak boleh ada duplikasi KOPS + Periode yang sama |
| FR-13 | Setting untuk bulan berjalan dan bulan yang sudah berlalu tidak dapat diubah (tombol Edit disabled / hidden) |
| FR-14 | Tabel menampilkan pagination |
| FR-15 | Penambahan sub menu "KOPS Score" di sidebar navigasi di bawah Manajemen Klaim |

---

## Edge Cases

| # | Scenario | Expected Behavior |
|---|----------|-------------------|
| EC-01 | Score = 0 | Diterima (rentang 0-500 sesuai AC-6) |
| EC-02 | Score > 500 | Validasi error, input ditolak |
| EC-03 | Score negatif | Validasi error, input ditolak |
| EC-04 | Score desimal (e.g., 150.5) | TBD — asumsi hanya integer yang valid |
| EC-05 | Input non-numerik di field Target Score | Input ditolak / tidak diterima |
| EC-06 | Duplikat KOPS + Periode yang sama | Error, tidak boleh duplikat (AC-7) |
| EC-07 | Edit setting bulan berjalan (Juli 2026 saat ini Juli 2026) | Ditolak — tidak dapat diubah (AC-8) |
| EC-08 | Edit setting bulan lampau (Januari 2026 saat ini Juli 2026) | Ditolak — tidak dapat diubah (AC-8) |
| EC-09 | Buat setting untuk bulan yang sudah lewat | TBD — perlu klarifikasi apakah create juga ditolak |
| EC-10 | Bulan Februari tahun kabisat | End Periode harus 29, bukan 28 |
| EC-11 | User non-HO akses via direct URL | Redirect ke unauthorized / access denied |
| EC-12 | Submit form dengan field kosong | Validasi mandatory field error |
| EC-13 | Concurrent edit oleh 2 user | TBD — perlu klarifikasi handling |
| EC-14 | Score = 500 (boundary atas) | Diterima |
| EC-15 | KOPS dropdown kosong (tidak ada data master) | Form tidak bisa disubmit |
| EC-16 | Filter periode tanpa data | Tampilkan tabel kosong / pesan informasi |

---

## Assumptions

| # | Assumption |
|---|---|
| A-01 | Data master KOPS sudah tersedia dan dikelola di modul terpisah |
| A-02 | Target score bersifat per KOPS per bulan, berlaku seragam untuk semua verifikator dalam KOPS tersebut |
| A-03 | "Bulan berjalan" ditentukan berdasarkan server time, bukan client time |
| A-04 | Setting hanya bisa dibuat untuk bulan di masa depan (bulan depan dan seterusnya) |
| A-05 | Field Start Periode selalu tanggal 1 dan End Periode selalu tanggal terakhir bulan — tidak bisa custom range |
| A-06 | Role "Staff Klaim Kantor Pusat" dan "Kepala Departemen Klaim" sudah terdefinisi di sistem RBAC |
| A-07 | Score berupa bilangan bulat (integer), bukan desimal |
| A-08 | Pagination menggunakan standar yang sudah ada di aplikasi (server-side pagination) |
| A-09 | Tidak ada fitur Delete — hanya Add dan Edit |
| A-10 | Target score harian — verifikator harus menyelesaikan klaim sebanyak target score per hari kerja |
| A-11 | Fitur ini terintegrasi ke sidebar menu "Manajemen Klaim" di aplikasi Claim Verification |

---

## Missing Details / Open Questions

| # | Question | Status |
|---|----------|--------|
| MD-01 | Apakah score harus integer atau boleh desimal? | Open |
| MD-02 | Apakah ada fitur delete setting? | Assumed: No |
| MD-03 | Apakah user bisa membuat setting untuk bulan berjalan jika belum pernah dibuat? | Open |
| MD-04 | Validasi duplikat dilakukan saat klik Simpan atau real-time? | Open |
| MD-05 | Error message spesifik untuk setiap validasi? | Open |
| MD-06 | Apakah ada audit trail / history perubahan setting? | Open |
| MD-07 | Bagaimana behavior tombol Edit jika periode sudah lewat? (hidden/disabled/error saat klik) | Open |
| MD-08 | Apakah ada konfirmasi dialog sebelum Simpan? | Open |
| MD-09 | Bagaimana menangani KOPS baru yang ditambahkan di tengah bulan? | Open |
| MD-10 | Sorting pada tabel list — default sort apa? | Open |
| MD-11 | Berapa max KOPS yang ada di sistem? | Open |
| MD-12 | Relasi dengan fitur Setting Klasifikasi Scoring (NM-1267)? | Open |
| MD-13 | Seberapa jauh ke depan user bisa setting periode? | Open |
| MD-14 | Apakah ada export/import data setting? | Open |
| MD-15 | Apakah ada notifikasi jika bulan depan belum di-setting? | Open |
| MD-16 | Role apa saja yang termasuk "Staff Klaim Kantor Pusat"? | Open |

---

## References

- Test Cases: [NM-1286 Test Cases](../test-cases/NM-1286-test-cases.md)
- Feature File: `src/features/scoring/settingKopsScoring.feature` (TBD)
- Traceability: [Traceability Matrix](../traceability.md)
- Related Story: [NM-1267 - Setting Klasifikasi Scoring Klaim](./NM-1267-setting-klasifikasi-scoring-klaim.md)
